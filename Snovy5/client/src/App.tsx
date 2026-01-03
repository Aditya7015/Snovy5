// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";
// import { OrderProvider } from "@/context/OrderContext";
// import { ThemeProvider } from "@/context/ThemeContext";
// import { AdminAuthProvider } from "@/context/AdminAuthContext";
// import { AdminProductProvider } from "@/context/AdminProductContext";

// import { AdminProtectedRoute } from "@/components/AdminProtectedRoute";

// // Page imports
// import ParticlesComponent from "@/components/Particles";
// import Index from "./pages/Index";
// import Shop from "./pages/Shop";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderConfirmation from "./pages/OrderConfirmation";
// import Account from "./pages/Account";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
// import Categories from "./pages/Categories";
// import Wishlist from "./pages/Wishlist";
// import Services from "./pages/Services";

// // Admin pages
// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminProducts from "./pages/admin/AdminProducts";
// import AdminAddProduct from "./pages/admin/AdminAddProduct";
// import AdminOrders from "./pages/admin/AdminOrders";
// import AccountOrders from "./pages/AccountOrders";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <BrowserRouter>
//         <AuthProvider> {/* SINGLE WRAPPER ✔ */}
//           <AdminAuthProvider>
//             <AdminProductProvider>
//               <CartProvider>
//                 <OrderProvider>
//                   <ThemeProvider>

//                     {/* GLOBAL Animation */}
//                     <ParticlesComponent />

//                     <Toaster />
//                     <Sonner />

//                     <Routes>

//                       {/* USER ROUTES */}
//                       <Route path="/" element={<Index />} />
//                       <Route path="/shop" element={<Shop />} />
//                       <Route path="/categories" element={<Categories />} />
//                       <Route path="/wishlist" element={<Wishlist />} />
//                       <Route path="/product/:productId" element={<ProductDetail />} />
//                       <Route path="/category/:categoryId" element={<Shop />} />
//                       <Route path="/collection/:collectionId" element={<Shop />} />
//                       <Route path="/cart" element={<Cart />} />
//                       <Route path="/checkout" element={<Checkout />} />
//                       <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
//                       <Route path="/account" element={<Account />} />
//                       <Route path="/about" element={<About />} />
//                       <Route path="/contact" element={<Contact />} />
//                       <Route path="/services" element={<Services />} />
//                       <Route path="/account/orders" element={<AccountOrders />} />

//                       {/* ADMIN LOGIN */}
//                       <Route path="/admin/login" element={<AdminLogin />} />

//                       {/* SECURED ADMIN AREA */}
//                       <Route
//                         path="/admin/*"
//                         element={
//                           <AdminProtectedRoute>
//                             <AdminLayout />
//                           </AdminProtectedRoute>
//                         }
//                       >
//                         <Route index element={<AdminDashboard />} />
//                         <Route path="products" element={<AdminProducts />} />
//                         <Route path="add-product" element={<AdminAddProduct />} />
//                         <Route path="orders" element={<AdminOrders />} />
//                       </Route>

//                       {/* 404 */}
//                       <Route path="*" element={<NotFound />} />
//                     </Routes>

//                   </ThemeProvider>
//                 </OrderProvider>
//               </CartProvider>
//             </AdminProductProvider>
//           </AdminAuthProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



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
import AccountOrders from "./pages/AccountOrders";

const queryClient = new QueryClient();

/* 🔴 MAINTENANCE SWITCH */
const MAINTENANCE_MODE = true;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AdminAuthProvider>
            <AdminProductProvider>
              <CartProvider>
                <OrderProvider>
                  <ThemeProvider>

                    <ParticlesComponent />
                    <Toaster />
                    <Sonner />

                    {MAINTENANCE_MODE ? (
                      <div
                        style={{
                          height: "100vh",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
                          🚧 Website Temporarily Unavailable
                        </h1>
                        <p style={{ fontSize: "16px", color: "#666" }}>
                          We are performing scheduled maintenance.  
                          Please check back later.
                        </p>
                      </div>
                    ) : (
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
                        <Route path="/account/orders" element={<AccountOrders />} />

                        {/* ADMIN LOGIN */}
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* ADMIN PROTECTED ROUTES */}
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
                    )}

                  </ThemeProvider>
                </OrderProvider>
              </CartProvider>
            </AdminProductProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
