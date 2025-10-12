-- Add Phase 3 fields to plr_items table
ALTER TABLE plr_items
ADD COLUMN IF NOT EXISTS target_folder TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS duplicate_of UUID REFERENCES plr_items(id),
ADD COLUMN IF NOT EXISTS scan_confidence INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_accessed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS access_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS estimated_value NUMERIC(10,2);

-- Create scan_sessions table to track scan operations
CREATE TABLE IF NOT EXISTS scan_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scan_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  total_files INTEGER DEFAULT 0,
  plr_detected INTEGER DEFAULT 0,
  status TEXT DEFAULT 'in_progress',
  scan_options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on scan_sessions
ALTER TABLE scan_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scan sessions"
ON scan_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scan sessions"
ON scan_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scan sessions"
ON scan_sessions FOR UPDATE
USING (auth.uid() = user_id);

-- Create scan_cache table for performance
CREATE TABLE IF NOT EXISTS scan_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path TEXT NOT NULL,
  file_hash TEXT NOT NULL,
  file_size BIGINT,
  last_modified TIMESTAMP WITH TIME ZONE,
  scan_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  plr_confidence INTEGER,
  detected_niche TEXT,
  license_type TEXT,
  metadata JSONB,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, file_hash)
);

-- Enable RLS on scan_cache
ALTER TABLE scan_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own scan cache"
ON scan_cache FOR ALL
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_scan_cache_hash ON scan_cache(file_hash);
CREATE INDEX IF NOT EXISTS idx_scan_cache_user ON scan_cache(user_id);
CREATE INDEX IF NOT EXISTS idx_plr_items_duplicate ON plr_items(duplicate_of) WHERE duplicate_of IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_plr_items_niche ON plr_items(niche);
CREATE INDEX IF NOT EXISTS idx_plr_items_confidence ON plr_items(scan_confidence);