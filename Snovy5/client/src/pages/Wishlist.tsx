import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist } = useCart();
  const contentRef = useScrollAnimation({ y: 30, duration: 0.8 });
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Handle selecting individual item
  const toggleSelectItem = (productId: string) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle selecting all items
  const toggleSelectAll = () => {
    if (selectedItems.length === wishlist.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist.map(item => item.id));
    }
  };

  // Handle adding selected items to cart
  const addSelectedToCart = () => {
    const selectedProducts = wishlist.filter(item => selectedItems.includes(item.id));
    selectedProducts.forEach(product => {
      addToCart(product);
    });
    toast.success(`${selectedProducts.length} items added to cart`, {
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart")
      }
    });
    setSelectedItems([]);
  };

  // Handle removing selected items from wishlist
  const removeSelected = () => {
    selectedItems.forEach(id => {
      removeFromWishlist(id);
    });
    toast.success(`${selectedItems.length} items removed from wishlist`);
    setSelectedItems([]);
  };

  // Handle adding individual item to cart
  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart")
      }
    });
  };

  // Handle removing individual item from wishlist
  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id);
    toast.success(`${name} removed from wishlist`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="bg-secondary py-16">
          <div className="container-custom animate-fade-in">
            <h1 className="text-4xl font-serif mb-4">Your Wishlist</h1>
            <p className="text-muted-foreground max-w-2xl">
              Keep track of all your favorite items in one place.
            </p>
          </div>
        </section>

        <section ref={contentRef} className="py-12">
          <div className="container-custom">
            {wishlist.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="selectAll"
                      checked={selectedItems.length === wishlist.length && wishlist.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                    <label
                      htmlFor="selectAll"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {selectedItems.length === wishlist.length && wishlist.length > 0
                        ? "Deselect all"
                        : "Select all"}
                    </label>
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{selectedItems.length} items selected</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addSelectedToCart}
                        className="flex items-center"
                      >
                        <ShoppingBag className="mr-2" size={16} />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeSelected}
                        className="flex items-center text-destructive hover:text-destructive"
                      >
                        <Trash2 className="mr-2" size={16} />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlist.map(item => (
                    <Card key={item.id} className="relative overflow-hidden group">
                      <div className="absolute top-2 left-2 z-10">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleSelectItem(item.id)}
                          className="bg-white/90 border-gray-300"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-1 hover:bg-gray-100 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <X size={16} />
                      </button>

                      <Link to={`/product/${item.id}`} className="block">
                        <div className="aspect-[3/4] relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      </Link>

                      <CardContent className="pt-4">
                        <Link to={`/product/${item.id}`} className="block group">
                          <h3 className="font-medium group-hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-muted-foreground mt-1">${item.price.toFixed(2)}</p>
                        </Link>
                      </CardContent>

                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingBag size={16} className="mr-2" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Heart size={48} className="mx-auto mb-4 text-muted-foreground animate-pulse" />
                <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Browse our collections and save your favorite items
                </p>
                <Button asChild className="hover:scale-105 transition-transform">
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
