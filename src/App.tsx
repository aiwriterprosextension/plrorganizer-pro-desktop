import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/DashboardEnhanced";
import SmartOrganization from "./pages/features/SmartOrganization";
import ContentEnhancement from "./pages/features/ContentEnhancement";
import LicenseTracking from "./pages/features/LicenseTracking";
import BatchProcessing from "./pages/features/BatchProcessing";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import BlogPost from "./pages/BlogPost";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import BrandKit from "./pages/tools/BrandKit";
import ContentSpinner from "./pages/tools/ContentSpinner";
import SEOAnalyzer from "./pages/tools/SEOAnalyzer";
import BatchEditor from "./pages/tools/BatchEditor";
import ContentSpinnerApp from "./pages/tools/ContentSpinnerApp";
import SEOAnalyzerApp from "./pages/tools/SEOAnalyzerApp";
import BrandKitApp from "./pages/tools/BrandKitApp";
import BatchEditorApp from "./pages/tools/BatchEditorApp";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

// Lazy load new resource pages and features
const Guides = lazy(() => import("./pages/resources/Guides"));
const Templates = lazy(() => import("./pages/resources/Templates"));
const FAQ = lazy(() => import("./pages/resources/FAQ"));
const Support = lazy(() => import("./pages/resources/Support"));
const LicenseTracker = lazy(() => import("./pages/LicenseTracker"));
const Analytics = lazy(() => import("./pages/Analytics"));
const WatchFolders = lazy(() => import("./pages/WatchFolders"));
const Settings = lazy(() => import("./pages/Settings"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/features/smart-organization" element={<SmartOrganization />} />
              <Route path="/features/content-enhancement" element={<ContentEnhancement />} />
              <Route path="/features/license-tracking" element={<LicenseTracking />} />
              <Route path="/features/batch-processing" element={<BatchProcessing />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/brand-kit" element={<BrandKit />} />
              <Route path="/tools/content-spinner" element={<ContentSpinner />} />
              <Route path="/tools/seo-analyzer" element={<SEOAnalyzer />} />
              <Route path="/tools/batch-editor" element={<BatchEditor />} />
              <Route path="/tools/content-spinner/app" element={<ContentSpinnerApp />} />
              <Route path="/tools/seo-analyzer/app" element={<SEOAnalyzerApp />} />
              <Route path="/tools/brand-kit/app" element={<BrandKitApp />} />
              <Route path="/tools/batch-editor/app" element={<BatchEditorApp />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/guides" element={<Guides />} />
              <Route path="/resources/templates" element={<Templates />} />
              <Route path="/resources/faq" element={<FAQ />} />
              <Route path="/resources/support" element={<Support />} />
              <Route path="/dashboard/license-tracker" element={<LicenseTracker />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/watch-folders" element={<WatchFolders />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:categorySlug" element={<BlogCategory />} />
              <Route path="/blog/:categorySlug/:postSlug" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
