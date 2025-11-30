import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AdminProductProvider } from "@/context/AdminProductContext";

import { AdminProtectedRoute } from "@/components/AdminProtectedRoute";

// Page imports
import ParticlesComponent from "@/components/Particles";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Wishlist from "./pages/Wishlist";
import Services from "./pages/Services";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminOrders from "./pages/admin/AdminOrders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>

          {/* Admin Authentication */}
          <AuthProvider>
  <AdminAuthProvider>
    <AdminProductProvider>   {/* <-- MOVED HERE: wraps entire app */}
      <CartProvider>
        <OrderProvider>
          <ThemeProvider>

            <ParticlesComponent />
            <Toaster />
            <Sonner />

            <Routes>

              {/* USER ROUTES */}
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/category/:categoryId" element={<Shop />} />
              <Route path="/collection/:collectionId" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/account" element={<Account />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />

              {/* ADMIN LOGIN */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* ADMIN SECURED AREA */}
              <Route
                path="/admin/*"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="add-product" element={<AdminAddProduct />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

          </ThemeProvider>
        </OrderProvider>
      </CartProvider>
    </AdminProductProvider>
  </AdminAuthProvider>
</AuthProvider>

        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
