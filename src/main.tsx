import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GoogleAnalytics from "./components/GoogleAnalytics";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleAnalytics />
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
