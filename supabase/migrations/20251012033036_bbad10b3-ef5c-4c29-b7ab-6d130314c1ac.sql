-- Migration 1: Full-Text Search Support for PLR Items

-- Add search vector column to plr_items
ALTER TABLE plr_items ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS plr_items_search_idx ON plr_items USING gin(search_vector);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION update_plr_search_vector() 
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.niche, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.sub_niche, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.tags, ' '), '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.notes, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-update search vector
DROP TRIGGER IF EXISTS plr_items_search_vector_update ON plr_items;
CREATE TRIGGER plr_items_search_vector_update
BEFORE INSERT OR UPDATE ON plr_items
FOR EACH ROW EXECUTE FUNCTION update_plr_search_vector();

-- Populate existing records
UPDATE plr_items SET updated_at = updated_at;

-- Migration 2: Saved Searches Table
CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- RLS policies
DROP POLICY IF EXISTS "Users can manage own saved searches" ON saved_searches;
CREATE POLICY "Users can manage own saved searches"
ON saved_searches FOR ALL
USING (auth.uid() = user_id);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS saved_searches_updated_at ON saved_searches;
CREATE TRIGGER saved_searches_updated_at
BEFORE UPDATE ON saved_searches
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Migration 3: Add View Preferences to Profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS dashboard_view_mode TEXT DEFAULT 'grid' CHECK (dashboard_view_mode IN ('grid', 'table', 'list'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS items_per_page INTEGER DEFAULT 50;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS default_sort_by TEXT DEFAULT 'created_at';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS default_sort_order TEXT DEFAULT 'desc' CHECK (default_sort_order IN ('asc', 'desc'));