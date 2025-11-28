
import { Link } from "react-router-dom";
import { useCart, Product } from "@/context/CartContext";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { gsap } from "gsap";

interface ProductCardProps {
  product: Product;
  featuredSize?: boolean;
}

const ProductCard = ({ product, featuredSize = false }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    gsap.to(e.currentTarget, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };
  
  return (
    <div
      className={`group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl ${
        featuredSize ? "col-span-2 row-span-2" : ""
      }`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div
            className={`absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-2 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Button
              size="sm"
              variant={isInWishlist(product.id) ? "default" : "secondary"}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={handleWishlist}
            >
              <Heart
                size={16}
                className={isInWishlist(product.id) ? "fill-current" : ""}
              />
            </Button>
            <Button
              size="sm"
              className="rounded-full flex-1 flex items-center justify-center bg-primary"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} className="mr-2" /> Add to Cart
            </Button>
          </div>
        </div>

        <div>
          <h3 className={`font-medium ${featuredSize ? "text-lg" : ""}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground mt-1">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
