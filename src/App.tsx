
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Customer Pages
import CustomerDashboard from "./pages/customers/CustomerDashboard";
import CustomerForm from "./pages/customers/CustomerForm";

// Product Pages
import ProductDashboard from "./pages/products/ProductDashboard";
import ProductTypeSelection from "./pages/products/ProductTypeSelection";

// Quotation Pages
import QuotationsDashboard from "./pages/quotations/QuotationsDashboard";
import CreateQuotation from "./pages/quotations/CreateQuotation";

// Procurement Pages
import ProcurementDashboard from "./pages/procurement/ProcurementDashboard";

// Design Pages
import DesignDashboard from "./pages/design/DesignDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          
          {/* Customer Routes */}
          <Route path="/customers" element={
            <DashboardLayout>
              <CustomerDashboard />
            </DashboardLayout>
          } />
          <Route path="/customers/new" element={
            <DashboardLayout>
              <CustomerForm />
            </DashboardLayout>
          } />
          
          {/* Product Routes */}
          <Route path="/products" element={
            <DashboardLayout>
              <ProductDashboard />
            </DashboardLayout>
          } />
          <Route path="/products/type" element={
            <DashboardLayout>
              <ProductTypeSelection />
            </DashboardLayout>
          } />
          
          {/* Quotation Routes */}
          <Route path="/quotations" element={
            <DashboardLayout>
              <QuotationsDashboard />
            </DashboardLayout>
          } />
          <Route path="/quotations/new" element={
            <DashboardLayout>
              <CreateQuotation />
            </DashboardLayout>
          } />
          
          {/* Procurement Routes */}
          <Route path="/procurement" element={
            <DashboardLayout>
              <ProcurementDashboard />
            </DashboardLayout>
          } />
          
          {/* Design Routes */}
          <Route path="/design" element={
            <DashboardLayout>
              <DesignDashboard />
            </DashboardLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
