import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VehicleProvider } from "@/contexts/VehicleContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import RiskCenter from "./pages/RiskCenter";
import QuantumOptimizerPage from "./pages/QuantumOptimizerPage";
import EmergencyPage from "./pages/EmergencyPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VehicleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/risk-center" element={<RiskCenter />} />
              <Route path="/quantum-optimizer" element={<QuantumOptimizerPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </VehicleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
