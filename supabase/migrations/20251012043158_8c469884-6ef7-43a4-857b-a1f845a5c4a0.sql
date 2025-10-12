-- Fix RLS on plr_roi_analytics view
-- Drop and recreate the view with security_invoker to respect underlying table RLS
DROP VIEW IF EXISTS plr_roi_analytics;

CREATE VIEW plr_roi_analytics 
WITH (security_invoker = true)
AS
SELECT 
  p.id,
  p.user_id,  -- Include user_id for filtering
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
GROUP BY p.id, p.user_id, p.title, p.purchase_price, p.seller_name, p.niche, p.quality_rating;

-- Remove the blanket authenticated access grant
REVOKE SELECT ON plr_roi_analytics FROM authenticated;

-- Grant SELECT to authenticated users (RLS from underlying tables will apply)
GRANT SELECT ON plr_roi_analytics TO authenticated;