/**
 * Analytics Hook
 * 
 * Provides event tracking functionality for Google Analytics 4
 * 
 * Usage:
 * const { trackEvent } = useAnalytics();
 * trackEvent('signup', { method: 'email' });
 */

export interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    } else {
      console.log('Analytics event (GA4 not loaded):', eventName, params);
    }
  };

  const trackPageView = (path: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title,
      });
    }
  };

  const trackSignup = (method: 'email' | 'google') => {
    trackEvent('signup', { method });
  };

  const trackSubscription = (planName: string, price: number) => {
    trackEvent('subscription_start', {
      plan: planName,
      value: price,
      currency: 'USD',
    });
  };

  const trackToolUsage = (toolName: string) => {
    trackEvent('tool_used', { tool_name: toolName });
  };

  const trackPLRUpload = (fileCount: number) => {
    trackEvent('plr_upload', { file_count: fileCount });
  };

  const trackUpgradeClick = (from: string, to: string) => {
    trackEvent('upgrade_clicked', {
      from_plan: from,
      to_plan: to,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackSignup,
    trackSubscription,
    trackToolUsage,
    trackPLRUpload,
    trackUpgradeClick,
  };
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
