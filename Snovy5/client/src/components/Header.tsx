// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart, Menu, Search, X, User, Heart, LogOut, Sun, Moon
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import SearchResults from "./SearchResults";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useSearch } from "@/context/SearchContext";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { query, setQuery, clear } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, setTheme } = useTheme();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    clear();
  };

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      {/* Navbar */}
      <div className="container-custom flex items-center justify-between py-4">
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={22} />
        </button>

        <Link to="/" className="font-serif text-2xl font-medium">Snoovy</Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="p-2" onClick={toggleSearch}><Search size={20} /></button>
          <button className="p-2" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link to="/wishlist" className="hidden sm:block p-2"><Heart size={20} /></Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hidden sm:block"><User size={20} /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1.5">Hi, {user?.firstName}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/account">My Account</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/account/orders">My Orders</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild><Link to="/account">Login</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/account?register=true">Register</Link></DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge-cart">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Search UI */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
          <div className="container-custom py-4 flex justify-between">
            <span>Search Products</span>
            <button onClick={toggleSearch}><X size={22} /></button>
          </div>
          <div className="container-custom">
            <div className="relative">
              <Input
                placeholder="Search for products..."
                className="py-6 px-4 text-lg border-b"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <SearchResults onClose={toggleSearch} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
