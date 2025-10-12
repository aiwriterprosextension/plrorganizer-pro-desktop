-- Add DELETE policy for scan_sessions table
-- Allow users to delete their own scan sessions
CREATE POLICY "Users can delete own scan sessions"
ON scan_sessions
FOR DELETE
USING (auth.uid() = user_id);