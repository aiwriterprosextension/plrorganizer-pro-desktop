-- Create license_keys table for JVZoo sales tracking
CREATE TABLE IF NOT EXISTS public.license_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'refunded', 'chargeback', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;

-- Users can view their own license keys
CREATE POLICY "Users can view their own license keys"
  ON public.license_keys
  FOR SELECT
  USING (auth.uid() = user_id);

-- Add stripe_customer_id to subscriptions if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'subscriptions' 
    AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE public.subscriptions
    ADD COLUMN stripe_customer_id TEXT UNIQUE;
  END IF;
END $$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_license_keys_user_id ON public.license_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_license_keys_transaction_id ON public.license_keys(transaction_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);
