-- Add watch_folders table for monitoring directories
CREATE TABLE IF NOT EXISTS watch_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  folder_path TEXT NOT NULL,
  auto_import BOOLEAN DEFAULT true,
  last_scan TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, folder_path)
);

-- Enable RLS
ALTER TABLE watch_folders ENABLE ROW LEVEL SECURITY;

-- RLS policies
DROP POLICY IF EXISTS "Users can manage own watch folders" ON watch_folders;
CREATE POLICY "Users can manage own watch folders"
ON watch_folders FOR ALL
USING (auth.uid() = user_id);