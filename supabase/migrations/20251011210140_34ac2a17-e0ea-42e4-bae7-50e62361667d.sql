-- Add comprehensive license tracking fields to plr_items table
ALTER TABLE plr_items 
ADD COLUMN IF NOT EXISTS license_restrictions TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS attribution_required BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS license_expires_at DATE,
ADD COLUMN IF NOT EXISTS seller_name TEXT,
ADD COLUMN IF NOT EXISTS purchase_price NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS purchase_date DATE,
ADD COLUMN IF NOT EXISTS quality_rating TEXT CHECK (quality_rating IN ('A', 'B', 'C', 'D')),
ADD COLUMN IF NOT EXISTS niche TEXT,
ADD COLUMN IF NOT EXISTS sub_niche TEXT;

-- Add comment to explain license_restrictions usage
COMMENT ON COLUMN plr_items.license_restrictions IS 'Array of license restrictions (e.g., "No resell", "Attribution required", "Niche limited")';

-- Add comment for quality_rating
COMMENT ON COLUMN plr_items.quality_rating IS 'Quality grade: A (Premium), B (Good), C (Average), D (Needs work)';

-- Create index on license expiration for efficient queries
CREATE INDEX IF NOT EXISTS idx_plr_items_license_expires ON plr_items(license_expires_at) WHERE license_expires_at IS NOT NULL;

-- Create index on quality rating for filtering
CREATE INDEX IF NOT EXISTS idx_plr_items_quality ON plr_items(quality_rating) WHERE quality_rating IS NOT NULL;

-- Create index on niche for categorization
CREATE INDEX IF NOT EXISTS idx_plr_items_niche ON plr_items(niche) WHERE niche IS NOT NULL;