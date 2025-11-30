import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ArrowLeft, Check, Star, ShoppingBag, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchProductById, fetchProducts } from "@/api/productApi";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();

  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchProductById(productId!);
        setProduct(res);

        const all = await fetchProducts(1, 100);
        const related = all.data.filter(
          (p: any) => p.category === res.category && p._id !== res._id
        );
        setRelatedProducts(related.slice(0, 4));
      } catch (err) {
        console.error("Product load error", err);
      } finally {
        setLoading(false);
      }
    }
    if (productId) load();
  }, [productId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom py-20">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <h2 className="text-center text-2xl pt-10">Product Not Found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const imageGallery = product.images?.length > 0 ? product.images : ["/placeholder.png"];
  const productInWishlist = isInWishlist(product._id);

  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQuantity = () => setQuantity((q) => q + 1);

  // const handleAddToCart = () => {
  //   addToCart({ 
  //     id: product._id,
  //     name: product.name,
  //     price: product.price,
  //     image: imageGallery[0],
  //     category: product.category
  //   }, quantity);
  //   toast.success(`${product.name} added to cart`);
  // };
    const handleAddToCart = () => {
  addToCart(
    {
      ...product,
      id: product._id,
      image: imageGallery[0],
    },
    quantity
  );
  toast.success(`${product.name} added to cart`);
};


  // const handleWishlistToggle = () => {
  //   if (productInWishlist) {
  //     removeFromWishlist(product._id);
  //     toast.success(`${product.name} removed from wishlist`);
  //   } else {
  //     addToWishlist({
  //       id: product._id,
  //       name: product.name,
  //       price: product.price,
  //       image: imageGallery[0],
  //       category: product.category
  //     });
  //     toast.success(`${product.name} added to wishlist`);
  //   }
  // };

  const handleWishlistToggle = () => {
  if (productInWishlist) {
    removeFromWishlist(product._id);
    toast.success(`${product.name} removed from wishlist`);
  } else {
    addToWishlist({
      ...product,
      id: product._id,
      image: imageGallery[0],
    });
    toast.success(`${product.name} added to wishlist`);
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container-custom py-12">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" /> Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
            {/* LEFT - IMAGES */}
            <div>
              <img
                src={imageGallery[selectedImage]}
                className="w-full aspect-square object-cover rounded-lg"
              />

              {imageGallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {imageGallery.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      className={`aspect-square rounded-md overflow-hidden border ${
                        selectedImage === idx ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT - DETAILS */}
            <div>
              <h1 className="text-3xl font-serif mb-3">{product.name}</h1>
              <p className="text-2xl font-medium mb-4">₹{product.price}</p>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center w-fit border rounded mb-8">
                <button className="w-10 h-10 flex justify-center hover:bg-secondary" onClick={decreaseQuantity}>
                  <Minus size={16} />
                </button>
                <span className="w-12 h-10 flex justify-center items-center">{quantity}</span>
                <button className="w-10 h-10 flex justify-center hover:bg-secondary" onClick={increaseQuantity}>
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex gap-3 mb-10">
                <Button className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2" size={18} /> Add to Cart
                </Button>
                <Button
                  variant={productInWishlist ? "default" : "outline"}
                  className="flex-1"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={productInWishlist ? "fill-primary" : ""} size={18} />
                  {productInWishlist ? "Saved" : "Save"}
                </Button>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="mb-20">
              <h2 className="text-2xl font-serif mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel._id} product={rel} />
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
