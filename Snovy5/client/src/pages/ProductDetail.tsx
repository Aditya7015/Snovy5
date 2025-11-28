import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ArrowLeft, Check, Star, ShoppingBag, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product
  const product = products.find(p => p.id === productId);

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // If product not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-20 flex-grow">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={18} />
            Back
          </Button>
          <div className="text-center py-10">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <p className="mb-6 text-muted-foreground">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productInWishlist = isInWishlist(product.id);

  // Create dummy image gallery
  const imageGallery = [
    product.image,
    product.image.replace('?q=80&w=700', '?q=80&w=700&sig=1'),
    product.image.replace('?q=80&w=700', '?q=80&w=700&sig=2'),
    product.image.replace('?q=80&w=700', '?q=80&w=700&sig=3'),
  ];

  // Handle quantity changes
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`, {
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart")
      }
    });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (productInWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`, {
        action: {
          label: "View Wishlist",
          onClick: () => navigate("/wishlist")
        }
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container-custom py-10">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={18} />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={imageGallery[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {imageGallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`aspect-square ${selectedImage === idx ? 'ring-2 ring-primary' : 'hover:opacity-80'}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
                <p className="text-2xl">${product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  4.9 (24 reviews)
                </span>
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex w-fit border rounded">
                    <button
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                      onClick={decreaseQuantity}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                      onClick={increaseQuantity}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="flex-1 sm:flex-none" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2" size={18} />
                  Add to Cart
                </Button>
                <Button
                  variant={productInWishlist ? "default" : "outline"}
                  className={`flex-1 sm:flex-none ${productInWishlist ? "bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary" : ""}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`mr-2 ${productInWishlist ? "fill-primary" : ""}`} size={18} />
                  {productInWishlist ? "Saved" : "Save to Wishlist"}
                </Button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <Check size={16} className="mr-2 mt-1 text-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="mr-2 mt-1 text-primary" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="mr-2 mt-1 text-primary" />
                  <span>Ethically sourced materials</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product tabs */}
          <Tabs defaultValue="details" className="mb-20">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Product Details</h3>
                <p>
                  {product.description} Our commitment to quality ensures that each piece is meticulously crafted to stand the test of time, both in durability and design.
                </p>
                <h3 className="font-medium pt-2">Materials</h3>
                <p>
                  Made from high-quality, sustainably sourced materials. We prioritize ethical production methods and environmentally friendly practices in all of our products.
                </p>
                <h3 className="font-medium pt-2">Dimensions</h3>
                <p>
                  Height: 10 inches<br />
                  Width: 8 inches<br />
                  Depth: 8 inches<br />
                  Weight: 2.5 lbs
                </p>
                <h3 className="font-medium pt-2">Care Instructions</h3>
                <p>
                  Hand wash with mild soap and warm water.<br />
                  Dry thoroughly after cleaning.<br />
                  Avoid direct sunlight for prolonged periods.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Shipping Information</h3>
                <p>
                  We offer free standard shipping on all orders over $50. For orders under $50, a flat shipping fee of $5.95 will be applied at checkout. Standard shipping typically takes 3-5 business days.
                </p>
                <p>
                  Expedited shipping is available for an additional fee. Orders are processed within 1-2 business days after payment confirmation.
                </p>
                <h3 className="font-medium pt-2">Return Policy</h3>
                <p>
                  We accept returns within 30 days of delivery. Items must be unused, in their original condition and packaging. Return shipping costs are the responsibility of the customer unless the return is due to a defect or error on our part.
                </p>
                <p>
                  To initiate a return, please contact our customer service team with your order number and reason for return.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">4.9 out of 5</span>
                  <span className="text-muted-foreground ml-2">Based on 24 reviews</span>
                </div>

                <div className="space-y-6">
                  {/* Sample reviews */}
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">John D.</h4>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star key={starIdx} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm">
                        Absolutely love this product! The quality is exceptional and it fits perfectly in my living room. Highly recommend.
                      </p>
                    </div>
                  ))}
                </div>

                <Button>Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
