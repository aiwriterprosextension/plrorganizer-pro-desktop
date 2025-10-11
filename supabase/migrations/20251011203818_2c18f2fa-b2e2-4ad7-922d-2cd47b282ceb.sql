-- Create brand_kits table for storing user brand assets
CREATE TABLE public.brand_kits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#3B82F6',
  secondary_color text DEFAULT '#8B5CF6',
  font_heading text DEFAULT 'Inter',
  font_body text DEFAULT 'Inter',
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.brand_kits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for brand_kits
CREATE POLICY "Users can view own brand kits"
  ON public.brand_kits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own brand kits"
  ON public.brand_kits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brand kits"
  ON public.brand_kits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brand kits"
  ON public.brand_kits FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_brand_kits_updated_at
  BEFORE UPDATE ON public.brand_kits
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();