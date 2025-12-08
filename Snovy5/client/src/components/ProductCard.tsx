import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { gsap } from "gsap";

interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  stock?: number;
}

interface ProductCardProps {
  product: BackendProduct;
  featuredSize?: boolean;
}

const ProductCard = ({ product, featuredSize = false }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Always use `_id`
  const productId = product?._id;
  const imageUrl =
    product?.images?.[0] ||
    "https://via.placeholder.com/400x600?text=No+Image";

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: imageUrl,
      category: product.category || "General",
      description: product.description || "",
    });

    toast.success("Added to Cart!");
  };

  const handleWishlist = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: imageUrl,
        category: product.category || "General",
        description: product.description || "",
      });
      toast.success("Added to wishlist");
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={(e) => {
        setIsHovered(true);
        gsap.to(e.currentTarget, { y: -10, duration: 0.3 });
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        gsap.to(e.currentTarget, { y: 0, duration: 0.3 });
      }}
    >
      <Link to={`/product/${productId}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-secondary/50">
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Action Buttons */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-2 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Button
              size="sm"
              variant={isInWishlist(productId) ? "default" : "secondary"}
              className="rounded-full w-10 h-10 flex items-center justify-center"
              onClick={handleWishlist}
            >
              <Heart className={isInWishlist(productId) ? "fill-current" : ""} />
            </Button>

            <Button
              size="sm"
              className="rounded-full bg-primary"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} className="mr-2" />
              Add
            </Button>
          </div>
        </div>

        <h3 className="font-medium mt-3">{product.name}</h3>
        <p className="text-muted-foreground">₹{product.price}</p>
      </Link>
    </div>
  );
};

export default React.memo(ProductCard);
