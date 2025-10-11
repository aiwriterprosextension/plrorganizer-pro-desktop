-- Phase 3: Create usage_history table for deployment tracking
CREATE TABLE IF NOT EXISTS usage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plr_item_id UUID REFERENCES plr_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  published_url TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  revenue_generated NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on usage_history
ALTER TABLE usage_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for usage_history
CREATE POLICY "Users can manage own usage history"
  ON usage_history FOR ALL
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_usage_history_plr_item ON usage_history(plr_item_id);
CREATE INDEX IF NOT EXISTS idx_usage_history_user ON usage_history(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_history_published ON usage_history(published_at);

-- Phase 5: Create view for ROI analytics
CREATE OR REPLACE VIEW plr_roi_analytics AS
SELECT 
  p.id,
  p.title,
  p.purchase_price,
  p.seller_name,
  p.niche,
  p.quality_rating,
  COUNT(u.id) as times_used,
  COALESCE(SUM(u.revenue_generated), 0) as total_revenue,
  CASE 
    WHEN p.purchase_price > 0 THEN (COALESCE(SUM(u.revenue_generated), 0) / p.purchase_price) 
    ELSE 0 
  END as roi_multiplier
FROM plr_items p
LEFT JOIN usage_history u ON p.id = u.plr_item_id
GROUP BY p.id, p.title, p.purchase_price, p.seller_name, p.niche, p.quality_rating;

-- Grant access to the view
GRANT SELECT ON plr_roi_analytics TO authenticated;