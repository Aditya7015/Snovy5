// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Minus,
//   Plus,
//   ArrowLeft,
//   Star,
//   ShoppingBag,
//   Heart,
//   ShieldCheck,
//   Truck,
//   RefreshCw,
//   Package,
//   Tag,
// } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useCart } from "@/context/CartContext";
// import ProductCard from "@/components/ProductCard";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { fetchProductById, fetchProducts } from "@/api/productApi";

// const SIZES = ["S", "M", "L", "XL"];

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } =
//     useCart();

//   const [product, setProduct] = useState<any | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetchProductById(productId!);
//         setProduct(res);

//         const all = await fetchProducts(1, 100);
//         const related = all.data.filter(
//           (p: any) => p.category === res.category && p._id !== res._id
//         );
//         setRelatedProducts(related.slice(0, 8));
//       } catch (err) {
//         console.error("Product load error", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (productId) load();
//   }, [productId]);

//   if (loading) return <div className="text-center py-20">Loading...</div>;

//   if (!product) {
//     return (
//       <div className="min-h-screen">
//         <Header />
//         <div className="container-custom py-20 text-center">
//           <Button variant="ghost" onClick={() => navigate(-1)}>
//             <ArrowLeft className="mr-2" /> Back
//           </Button>
//           <h2 className="text-2xl mt-6">Product Not Found</h2>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const gallery = product.images?.length > 0 ? product.images : ["/placeholder.png"];
//   const inWishlist = isInWishlist(product._id);

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error("Please select a size");
//       return;
//     }

//     addToCart(
//       {
//         ...product,
//         id: product._id,
//         image: gallery[0],
//         size: selectedSize,
//       },
//       quantity
//     );
//     toast.success(`${product.name} added to cart`);
//   };

//   const handleWishlistToggle = () => {
//     if (inWishlist) {
//       removeFromWishlist(product._id);
//       toast.success("Removed from wishlist");
//     } else {
//       addToWishlist({
//         ...product,
//         id: product._id,
//         image: gallery[0],
//       });
//       toast.success("Added to wishlist");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <div className="container-custom py-10">
//           {/* Back */}
//           <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
//             <ArrowLeft className="mr-2" size={18} /> Back
//           </Button>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">

//             {/* Left Images */}
//             <div className="space-y-4">
//               {/* Zoomable Image */}
// <div
//   className="relative w-full aspect-square overflow-hidden rounded-lg border dark:border-gray-800 cursor-zoom-in"
//   onMouseMove={(e) => {
//     const container = e.currentTarget;
//     const rect = container.getBoundingClientRect();
//     const img = container.querySelector("img") as HTMLImageElement;

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const xPercent = (x / rect.width) * 100;
//     const yPercent = (y / rect.height) * 100;

//     img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
//   }}
//   onMouseEnter={(e) => {
//     const img = e.currentTarget.querySelector("img") as HTMLImageElement;
//     img.style.transition = "transform 0.3s ease-out";
//     img.style.transform = "scale(2)"; // zoom level
//   }}
//   onMouseLeave={(e) => {
//     const img = e.currentTarget.querySelector("img") as HTMLImageElement;
//     img.style.transition = "transform 0.3s ease-out";
//     img.style.transform = "scale(1)";
//   }}
// >
//   <img
//     src={gallery[selectedImage]}
//     className="absolute top-0 left-0 w-full h-full object-cover"
//   />
// </div>


//               <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
//                 {gallery.map((img: string, i: number) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedImage(i)}
//                     className={`border rounded-md overflow-hidden ${
//                       selectedImage === i
//                         ? "border-primary"
//                         : "border-gray-300 dark:border-gray-700"
//                     }`}
//                   >
//                     <img src={img} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>

//               {/* Assurances */}
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><ShieldCheck size={16} className="text-green-500" /> 7 Days Return</div>
//                 <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><Truck size={16} className="text-blue-500" /> Free Delivery</div>
//                 <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><RefreshCw size={16} className="text-purple-500" /> Easy Exchange</div>
//                 <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><Package size={16} className="text-amber-500" /> Secure Packaging</div>
//               </div>
//             </div>

//             {/* Right Content */}
//             <div className="space-y-4">

//               <h1 className="text-3xl font-serif font-bold">{product.name}</h1>

//               <div className="flex items-center gap-3">
//                 <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-flex items-center">
//                   4.7 <Star size={12} className="ml-1" />
//                 </span>
//               </div>

//               {/* Size Selection */}
//               <div className="space-y-2">
//                 <p className="font-medium">Select Size</p>
//                 <div className="flex gap-3">
//                   {SIZES.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`w-12 h-12 rounded-md border flex items-center justify-center 
//                       ${
//                         selectedSize === size
//                           ? "border-primary bg-primary text-white"
//                           : "border-gray-400 dark:border-gray-700"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div>
//                 <p className="font-medium mb-2">Quantity</p>
//                 <div className="flex border rounded w-fit">
//                   <button className="px-3 py-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
//                   <span className="px-4 py-2">{quantity}</span>
//                   <button className="px-3 py-2" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
//                 </div>
//               </div>

//               {/* Delivery */}
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Truck size={16} className="text-blue-500" />
//                 Delivery by <span className="font-medium">3–5 Days</span>
//               </div>

//               {/* Offers */}
//               <div className="p-3 border rounded-lg bg-secondary/10 dark:border-gray-700">
//                 <div className="flex items-center gap-2 font-medium mb-2">
//                   <Tag size={16} className="text-orange-500" /> Offers
//                 </div>
//                 <ul className="text-sm space-y-1 text-muted-foreground">
//                   <li>• Buy 2 & get ₹100 OFF</li>
//                   <li>• Free shipping on prepaid orders</li>
//                 </ul>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-2">
//                 <Button className="flex-1" onClick={handleAddToCart}>
//                   <ShoppingBag className="mr-2" /> Add to Cart
//                 </Button>
//                 <Button
//                   variant={inWishlist ? "default" : "outline"}
//                   onClick={handleWishlistToggle}
//                   className="flex-1"
//                 >
//                   <Heart size={18} className={inWishlist ? "fill-primary" : ""} />
//                   {inWishlist ? "Saved" : "Wishlist"}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <Tabs defaultValue="overview" className="mb-16">
//             <TabsList>
//               <TabsTrigger value="overview">Product Info</TabsTrigger>
//               <TabsTrigger value="details">Specifications</TabsTrigger>
//               <TabsTrigger value="reviews">Reviews</TabsTrigger>
//             </TabsList>

//             {/* Overview */}
//             <TabsContent value="overview" className="pt-4">
//               <p className="text-sm text-muted-foreground">
//                 Premium cotton-blend tee crafted for both comfort and durability. Perfect for casual outings & everyday style.
//               </p>
//             </TabsContent>

//             {/* Specs */}
//             <TabsContent value="details" className="pt-4">
//               <table className="text-sm text-muted-foreground w-full">
//                 <tbody>
//                   <tr><td className="py-1">Fabric</td><td className="font-medium">100% Cotton</td></tr>
//                   <tr><td className="py-1">Fit</td><td className="font-medium">Regular Fit</td></tr>
//                   <tr><td className="py-1">Country</td><td className="font-medium">India 🇮🇳</td></tr>
//                 </tbody>
//               </table>
//             </TabsContent>

//             {/* Reviews */}
//             <TabsContent value="reviews" className="pt-4 space-y-4">
//               {["Best quality!", "Fast delivery!", "Perfect fitting", "Worth the price"].map(
//                 (review, i) => (
//                   <div key={i} className="border-b pb-2 dark:border-gray-700">
//                     <div className="flex items-center gap-2 text-yellow-500">
//                       {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="yellow" />)}
//                     </div>
//                     <p className="text-sm mt-1">{review}</p>
//                   </div>
//                 )
//               )}
//             </TabsContent>
//           </Tabs>

//           {/* Suggested */}
//           {relatedProducts.length > 0 && (
//             <div className="mb-20">
//               <h2 className="text-xl font-serif mb-4">You May Also Like</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//                 {relatedProducts.map((rel) => (
//                   <ProductCard key={rel._id} product={rel} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Sticky Bottom Bar - Mobile Only */}
//       <div className="lg:hidden fixed bottom-0 left-0 w-full bg-background border-t p-3 flex gap-3">
//         <Button className="flex-1" onClick={handleAddToCart}>
//           <ShoppingBag className="mr-2" /> Add to Cart
//         </Button>
//         <Button variant="outline" className="flex-1" onClick={handleWishlistToggle}>
//           <Heart size={18} className={inWishlist ? "fill-primary" : ""} />
//         </Button>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  ArrowLeft,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Package,
  Tag,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { fetchProductById, fetchProducts } from "@/api/productApi";

const SIZES = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } =
    useCart();

  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    try {
      const res = await fetchProductById(productId!);
      setProduct(res);

      const all = await fetchProducts(1, 200); // fetch more to suggest more products

      const related = all.data.filter(
        (p: any) =>
          p.category &&
          res.category &&
          p.category.toLowerCase() === res.category.toLowerCase() &&
          p._id !== res._id
      );

      // If no products found in same category → fallback to random suggestions
      const suggestions =
        related.length > 0
          ? related.slice(0, 12)
          : all.data.filter((p: any) => p._id !== res._id).slice(0, 12);

      setRelatedProducts(suggestions);
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
        <div className="container-custom py-20 text-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <h2 className="text-2xl mt-6">Product Not Found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = product.images?.length > 0 ? product.images : ["/placeholder.png"];
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart(
      {
        ...product,
        id: product._id,
        image: gallery[0],
        size: selectedSize,
      },
      quantity
    );
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        ...product,
        id: product._id,
        image: gallery[0],
      });
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container-custom py-10">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={18} /> Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">

            {/* BIG IMAGE WITH AUTO ZOOM */}
            <div className="space-y-4">
              <div
                className="relative w-full aspect-square overflow-hidden rounded-lg border dark:border-gray-800 cursor-zoom-in"
                onMouseMove={(e) => {
                  const container = e.currentTarget;
                  const rect = container.getBoundingClientRect();
                  const img = container.querySelector("img") as HTMLImageElement;
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const xPercent = (x / rect.width) * 100;
                  const yPercent = (y / rect.height) * 100;
                  img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  img.style.transition = "transform 0.3s ease-out";
                  img.style.transform = "scale(2)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  img.style.transition = "transform 0.3s ease-out";
                  img.style.transform = "scale(1)";
                }}
              >
                <img src={gallery[selectedImage]} className="absolute top-0 left-0 w-full h-full object-cover" />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {gallery.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border rounded-md overflow-hidden ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Feature badges */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><ShieldCheck size={16} className="text-green-500" /> 7 Days Return</div>
                <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><Truck size={16} className="text-blue-500" /> Fast Delivery</div>
                <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><RefreshCw size={16} className="text-purple-500" /> Easy Exchange</div>
                <div className="flex items-center gap-2 border rounded p-2 dark:border-gray-700"><Package size={16} className="text-amber-500" /> Secure Packaging</div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold">{product.name}</h1>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-xs bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 px-2 py-1 rounded inline-flex items-center">
                  4.7 <Star size={12} className="ml-1" />
                </span>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <p className="font-medium">Select Size</p>
                <div className="flex gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-md border flex items-center justify-center 
                      ${
                        selectedSize === size
                          ? "border-primary bg-primary text-white"
                          : "border-gray-400 dark:border-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="font-medium mb-2">Quantity</p>
                <div className="flex border rounded w-fit">
                  <button className="px-3 py-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button className="px-3 py-2" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck size={16} className="text-blue-500" />
                Delivery by <span className="font-medium">3–5 Days</span>
              </div>

              {/* Offers */}
              <div className="p-3 border rounded-lg bg-secondary/10 dark:border-gray-700">
                <div className="flex items-center gap-2 font-medium mb-2">
                  <Tag size={16} className="text-orange-500" /> Offers
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Buy 2 & get ₹100 OFF</li>
                  <li>• Free shipping on prepaid orders</li>
                </ul>
              </div>

              {/* ACTiONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2" /> Add to Cart
                </Button>
                <Button
                  variant={inWishlist ? "default" : "outline"}
                  onClick={handleWishlistToggle}
                  className="flex-1"
                >
                  <Heart size={18} className={inWishlist ? "fill-primary" : ""} />
                  {inWishlist ? "Saved" : "Wishlist"}
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="mb-16">
            <TabsList>
              <TabsTrigger value="overview">Product Info</TabsTrigger>
              <TabsTrigger value="details">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <p className="text-sm text-muted-foreground">
                {product.description || "Premium cotton-blend tee crafted for everyday comfort and style."}
              </p>
            </TabsContent>

            <TabsContent value="details" className="pt-4">
              <table className="text-sm text-muted-foreground w-full">
                <tbody>
                  <tr><td className="py-1">Fabric</td><td className="font-medium">100% Cotton</td></tr>
                  <tr><td className="py-1">Fit</td><td className="font-medium">Regular Fit</td></tr>
                  <tr><td className="py-1">Country</td><td className="font-medium">India 🇮🇳</td></tr>
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="reviews" className="pt-4 space-y-4">
              {["Best quality!", "Fits perfectly!", "Very comfortable", "Worth the price"].map(
                (review, i) => (
                  <div key={i} className="border-b pb-2 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-yellow-500">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-yellow-500" />)}
                    </div>
                    <p className="text-sm mt-1">{review}</p>
                  </div>
                )
              )}
            </TabsContent>
          </Tabs>

          {/* Suggested Products */}
          {/* Suggested Products */}
{relatedProducts.length > 0 && (
  <div className="mb-20">
    <h2 className="text-xl font-serif font-semibold mb-5">
      You May Also Like
    </h2>

    {/* Horizontal Scroll Container */}
    <div className="relative group">
      {/* Scroll Buttons */}
      <button
        onClick={() =>
          document.getElementById("suggested-scroll")?.scrollBy({
            left: -300,
            behavior: "smooth",
          })
        }
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/20 dark:bg-white/20 text-white dark:text-black 
                  p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ‹
      </button>

      <button
        onClick={() =>
          document.getElementById("suggested-scroll")?.scrollBy({
            left: 300,
            behavior: "smooth",
          })
        }
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/20 dark:bg-white/20 text-white dark:text-black 
                  p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ›
      </button>

      {/* Scrollable Row */}
      <div
        id="suggested-scroll"
        className="flex gap-5 overflow-x-auto scroll-smooth hide-scrollbar py-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {relatedProducts.map((rel) => (
          <div key={rel._id} className="min-w-[200px] scroll-snap-align-start">
            <ProductCard product={rel} />
          </div>
        ))}
      </div>
    </div>
  </div>
)}

        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-background border-t p-3 flex gap-3">
        <Button className="flex-1" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleWishlistToggle}>
          <Heart size={18} className={inWishlist ? "fill-primary" : ""} />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
