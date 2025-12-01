// // src/components/Header.tsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ShoppingCart,
//   Menu,
//   Search,
//   X,
//   User,
//   Heart,
//   LogOut,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { Input } from "./ui/input";
// import SearchResults from "./SearchResults";
// import { useAuth } from "@/context/AuthContext";
// import { useCart } from "@/context/CartContext";
// import { useTheme } from "@/context/ThemeContext";
// import { useSearch } from "@/context/SearchContext";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const { query, setQuery, clear } = useSearch();
//   const { isAuthenticated, user, logout } = useAuth();
//   const { cartCount } = useCart();
//   const { theme, setTheme } = useTheme();

//   const toggleSearch = () => {
//     setIsSearchOpen(!isSearchOpen);
//     clear();
//   };

//   return (
//     <header className="border-b sticky top-0 bg-background z-50">
//       <div className="container-custom flex items-center justify-between py-4">
//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           <Menu size={22} />
//         </button>

//         {/* Logo */}
//         <Link to="/" className="flex-1 md:flex-initial font-serif text-2xl font-medium">
//           Snoovy
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-8">
//           <Link to="/shop" className="hover:text-primary transition">
//             Shop
//           </Link>
//           <Link to="/categories" className="hover:text-primary transition">
//             Categories
//           </Link>
//           <Link to="/about" className="hover:text-primary transition">
//             About
//           </Link>
//           <Link to="/contact" className="hover:text-primary transition">
//             Contact
//           </Link>
//         </nav>

//         {/* Right Icons */}
//         <div className="flex items-center space-x-4">
//           {/* Search Toggle */}
//           <button className="p-2" onClick={toggleSearch}>
//             <Search size={20} />
//           </button>

//           {/* Theme Toggle */}
//           <button
//             className="p-2"
//             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//           >
//             {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//           </button>

//           {/* Wishlist */}
//           <Link to="/wishlist" className="hidden sm:block p-2">
//             <Heart size={20} />
//           </Link>

//           {/* Account Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="p-2 hidden sm:block">
//                 <User size={20} />
//               </button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-40">
//               {isAuthenticated ? (
//                 <>
//                   <DropdownMenuItem className="text-xs opacity-70">
//                     Hello, {user?.firstName}
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link to="/account">My Account</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link to="/account/orders">My Orders</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={logout}>
//                     <LogOut size={16} className="mr-2" /> Logout
//                   </DropdownMenuItem>
//                 </>
//               ) : (
//                 <>
//                   <DropdownMenuItem asChild>
//                     <Link to="/account">Sign In</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link to="/account?register=true">Register</Link>
//                   </DropdownMenuItem>
//                 </>
//               )}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* Cart */}
//           <Link to="/cart" className="relative p-2">
//             <ShoppingCart size={20} />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Menu Drawer */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-background z-50 animate-fade-in px-6 py-6 space-y-6">
//           <button className="ml-auto p-2" onClick={() => setIsMenuOpen(false)}>
//             <X size={22} />
//           </button>
//           <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
//           <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
//           <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
//           <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
//         </div>
//       )}

//       {/* Search Overlay */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 bg-background z-50 animate-fade-in">
//           <div className="container-custom py-4 flex justify-between items-center">
//             <span className="font-medium">Search Products</span>
//             <button className="p-2" onClick={toggleSearch}>
//               <X size={22} />
//             </button>
//           </div>

//           <div className="container-custom">
//             <div className="relative">
//               <Input
//                 type="text"
//                 autoFocus
//                 placeholder="Search for products..."
//                 className="py-6 px-4 text-lg border-b rounded-none focus-visible:ring-0"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//               <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//             </div>

//             <SearchResults onClose={toggleSearch} />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



// src/components/Header.tsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  Search,
  X,
  User,
  Heart,
  LogOut,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react";
import { Input } from "./ui/input";
import SearchResults from "./SearchResults";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useSearch } from "@/context/SearchContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { query, setQuery, clear } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, setTheme } = useTheme();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    clear();
  };

  // 🚀 Hide Back Button on these routes
  const hideBackOn = ["/"]; // add more if needed
  const shouldShowBack = !hideBackOn.includes(location.pathname);

  return (
    <header className="border-b sticky top-0 bg-background z-[9999]">
      <div className="container-custom flex items-center justify-between py-4">

        {/* Back Button (Mobile Only & Only When Route Allows) */}
        {shouldShowBack && (
          <button
            className="p-2 "
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-1 md:flex-initial font-serif text-2xl font-medium">
          Snoovy
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2" onClick={toggleSearch}>
            <Search size={20} />
          </button>

          <button
            className="p-2"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link to="/wishlist" className="hidden sm:block p-2">
            <Heart size={20} />
          </Link>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2  sm:block">
                <User size={20} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 z-[99999]">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem className="text-xs opacity-70">
                    Hello, {user?.firstName}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/account">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account?register=true">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-[9998] px-6 py-6">
          <button className="p-2 mb-8" onClick={() => setIsMenuOpen(false)}>
            <X size={26} />
          </button>

          <nav className="flex flex-col space-y-6 text-xl font-medium">
            <Link className="block" to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link className="block" to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link className="block" to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link className="block" to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/wishlist" className=" sm:block p-2">
            <Heart size={20} />
          </Link>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background z-[99999]">
          <div className="container-custom py-4 flex justify-between items-center">
            <span className="font-medium">Search Products</span>
            <button className="p-2" onClick={toggleSearch}>
              <X size={26} />
            </button>
          </div>

          <div className="container-custom">
            <div className="relative">
              <Input
                type="text"
                autoFocus
                placeholder="Search for products..."
                className="py-6 px-4 text-lg border-b rounded-none focus-visible:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <SearchResults onClose={toggleSearch} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


