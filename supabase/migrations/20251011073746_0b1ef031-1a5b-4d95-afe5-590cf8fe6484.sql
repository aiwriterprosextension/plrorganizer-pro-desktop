-- Create storage bucket for PLR files
INSERT INTO storage.buckets (id, name, public)
VALUES ('plr-files', 'plr-files', false);

-- Storage policies for PLR files
CREATE POLICY "Users can upload their own PLR files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'plr-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own PLR files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'plr-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own PLR files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'plr-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own PLR files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'plr-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);