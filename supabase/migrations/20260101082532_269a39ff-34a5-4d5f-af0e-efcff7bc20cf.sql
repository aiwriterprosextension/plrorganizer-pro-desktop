-- Create storage bucket for PLR files if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('plr-files', 'plr-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for plr-files bucket
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own files" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;
  DROP POLICY IF EXISTS "Users can view their own files" ON storage.objects;
END $$;

-- Create storage policies
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'plr-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'plr-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'plr-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'plr-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Insert default categories if they don't exist
INSERT INTO public.categories (name, description, icon) VALUES
  ('Articles', 'Written content including blog posts, articles, and reports', 'FileText'),
  ('eBooks', 'Digital books and comprehensive guides', 'Book'),
  ('Graphics', 'Images, templates, and visual assets', 'Image'),
  ('Templates', 'Ready-to-use document and design templates', 'Layout'),
  ('Videos', 'Video content and tutorials', 'Video'),
  ('Audio', 'Podcasts, music, and audio content', 'Music'),
  ('Software', 'Applications, plugins, and code', 'Code'),
  ('Other', 'Miscellaneous PLR content', 'Package')
ON CONFLICT (name) DO NOTHING;