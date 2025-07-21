import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "./components/protected/protectedroute";

// User Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Medicine from "./pages/Medicines";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";
import Profile from "./pages/Profile";
import OrdersPage from "./pages/OrdersPage";
import FAQs from "./pages/FAQs";
import Contact from "./pages/ContactUs";
import Shipping from "./pages/Shipping";
import PlaceOrderAndPay from "./pages/PlaceOrderAndPay";
import PrescriptionPage from "./pages/PrescriptionPage";
import SymptomPage from "./pages/SymptomPage";
import EnterAddressPage from "./pages/EnterAddressPage";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import MedicineDashboard from "./pages/MedicineDashboard";
import UserDashboard from "./pages/UserDashborad";
import OrderDashboard from "./pages/OrderDashboard";
import PrescriptionDashboard from "./pages/UploadPrescriptionDashboard";

const queryClient = new QueryClient();

function Layout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const isAdmin = user?.role === "ADMIN";
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdmin && isAdminRoute) return <Outlet />;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth/:action" element={<Auth />} />
                  <Route path="/login" element={<Navigate to="/auth/login" replace />} />
                  <Route path="/register" element={<Navigate to="/auth/register" replace />} />
                  <Route path="/medicines" element={<Medicine />} />
                  <Route path="/upload-prescription" element={<PrescriptionPage />} />
                  <Route path="/upload-prescription/:medicineId" element={<PrescriptionPage />} />
                  <Route path="/symptom-checker" element={<SymptomPage />} />
                  <Route path="/faq" element={<FAQs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shipping" element={<Shipping />} />

                  <Route path="/cart" element={<ProtectedRoute allowedRoles={["USER"]}><CartPage /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute allowedRoles={["USER"]}><CheckoutPage /></ProtectedRoute>} />
                  <Route path="/enter-address" element={<ProtectedRoute allowedRoles={["USER"]}><EnterAddressPage /></ProtectedRoute>} />
                  <Route path="/place-and-pay" element={<ProtectedRoute allowedRoles={["USER"]}><PlaceOrderAndPay /></ProtectedRoute>} />
                  <Route path="/tracking" element={<ProtectedRoute allowedRoles={["USER"]}><TrackingPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute allowedRoles={["USER"]}><Profile /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute allowedRoles={["USER"]}><OrdersPage /></ProtectedRoute>} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin-medicines" element={<ProtectedRoute allowedRoles={["ADMIN"]}><MedicineDashboard /></ProtectedRoute>} />
                <Route path="/admin-users" element={<ProtectedRoute allowedRoles={["ADMIN"]}><UserDashboard /></ProtectedRoute>} />
                <Route path="/admin-orders" element={<ProtectedRoute allowedRoles={["ADMIN"]}><OrderDashboard /></ProtectedRoute>} />
                <Route path="/admin-prescriptions" element={<ProtectedRoute allowedRoles={["ADMIN"]}><PrescriptionDashboard /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
