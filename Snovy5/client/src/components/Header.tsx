import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  Search,
  X,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import SearchResults from "./SearchResults";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container-custom flex items-center justify-between py-4">
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex-1 md:flex-initial text-center md:text-left">
          <Link to="/" className="font-serif text-2xl font-medium">
            Snoovy
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/shop" className="hover:text-primary/80 transition">
            Shop
          </Link>
          <Link to="/categories" className="hover:text-primary/80 transition">
            Categories
          </Link>
          <Link to="/about" className="hover:text-primary/80 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary/80 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={toggleSearch} className="p-2" aria-label="Search">
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link
            to="/wishlist"
            className="p-2 hidden sm:block"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>

          {/* Account dropdown with authentication state */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hidden sm:block" aria-label="Account">
                <User size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1.5 text-sm">
                    Welcome, {user?.firstName || "User"}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full cursor-pointer">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account/orders"
                      className="w-full cursor-pointer"
                    >
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full cursor-pointer">
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account?register=true"
                      className="w-full cursor-pointer"
                    >
                      Create Account
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/cart" className="p-2 relative" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
          <div className="container-custom py-4 flex justify-between items-center">
            <Link to="/" className="font-serif text-2xl font-medium">
              Snoovy
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="container-custom flex flex-col space-y-6 pt-10">
            <Link
              to="/shop"
              className="text-2xl font-medium"
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-2xl font-medium"
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-2xl font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-2xl font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="pt-6 flex space-x-6">
              <Link
                to="/account"
                className="flex items-center"
                onClick={toggleMenu}
              >
                <User size={18} className="mr-2" />
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center"
                onClick={toggleMenu}
              >
                <Heart size={18} className="mr-2" /> Wishlist
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="flex items-center"
                >
                  <LogOut size={18} className="mr-2" /> Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
          <div className="container-custom py-4 flex justify-between items-center">
            <span className="font-medium">Search products</span>
            <button
              onClick={toggleSearch}
              className="p-2"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>
          <div className="container-custom">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full py-6 px-4 text-lg border-b rounded-none focus-visible:ring-0"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
            </div>
            <SearchResults query={searchQuery} onClose={toggleSearch} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
