// import { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCard";
// import Testimonials from "@/components/Testimonials";
// import FeaturedCollections from "@/components/FeaturedCollections";
// import Values from "@/components/Values";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import { Button } from "@/components/ui/button";
// import { useScrollAnimation } from "@/hooks/useScrollAnimation";
// // import { fetchProducts } from "@/api/productApi";
// import { fetchProducts } from "../api/productApi";

// import { motion, AnimatePresence } from "framer-motion";

// const heroImages = [
//   "https://img.freepik.com/premium-photo/display-t-sh…moon-sign-that-says-moon_974629-463546.jpg?w=1060",
//   "https://img.freepik.com/premium-photo/shirt-that-h…-shirt-that-says-t-shirt_1086760-81334.jpg?w=1060",
//   "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1500",
//   "https://img.freepik.com/premium-photo/shirts-new-season-are-displayed-this-image_1213494-12327.jpg?w=1060",
//   "https://img.freepik.com/premium-photo/black-shirt-…hat-it-that-says-t-shirt_1086760-85066.jpg?w=1060",
// ];


// function HeroSlider() {
//   const [index, setIndex] = useState(0);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     timeoutRef.current = setTimeout(() => {
//       setIndex((prev) => (prev + 1) % heroImages.length);
//     }, 5000);

//     return () => timeoutRef.current && clearTimeout(timeoutRef.current);
//   }, [index]);

//   return (
//     <section className="relative h-[90vh] overflow-hidden">
      
//       {/* SLIDE IMAGE */}
//       <AnimatePresence mode="wait">
//         <motion.img
//           key={index}
//           src={heroImages[index]}
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -80 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="absolute w-full h-full object-cover"
//         />
//       </AnimatePresence>

//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/40" />

//       {/* CONTENT */}
//       <div className="relative container-custom h-full flex flex-col justify-center">
//         <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 max-w-2xl">
//           Define Your Style with Timeless Pieces
//         </h1>
//         <p className="text-white/80 text-xl md:text-2xl mb-8 max-w-xl">
//           Premium fashion designed for a modern lifestyle.
//         </p>
//         <Button size="lg" className="text-lg px-8 max-w-40 mt-10 " asChild>
//           <Link to="/shop">Explore Collection</Link>
//         </Button>
//       </div>

//       {/* DOTS NAVIGATION */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
//         {heroImages.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 
//               ${index === i ? "bg-white scale-125" : "bg-white/40"}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// const HomePage = () => {

//   const [shopclick , setshopclick] = useState(0);
//   const [products, setProducts] = useState<any[]>([]);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const featuredRef = useScrollAnimation({ delay: 0.2 });
//   const newArrivalsRef = useScrollAnimation({ y: 50, delay: 0.3 });

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetchProducts();
        
// setProducts(res.data || []);

//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }
//     load();
//   }, []);

//   const loopedProducts = [...products, ...products];

//   useEffect(() => {
//     const hero = heroRef.current;
//     if (!hero) return;

//     gsap.timeline({ defaults: { ease: "power3.out" } })
//       .fromTo(hero.querySelector("img"), { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 })
//       .fromTo(hero.querySelector("h1"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
//       .fromTo(hero.querySelector("p"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7");
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header/>

//       <main className="flex-grow">
        
//         {/* Hero Section */}
//         {/* <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1500"
//             className="absolute w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/40" />
//           <div className="relative container-custom h-full flex flex-col justify-center">
//             <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 max-w-2xl">
//               Define Your Style with Timeless Pieces
//             </h1>
//             <p className="text-white/80 text-xl md:text-2xl mb-8 max-w-xl">
//               Premium fashion designed for a modern lifestyle.
//             </p>
//             <Button size="lg" className="text-lg px-8" asChild>
//               <Link to="/shop">Explore Collection</Link>
//             </Button>
//           </div>
//         </section> */}

//         <HeroSlider></HeroSlider>

//         <FeaturedCollections />

//         {/* Featured Products */}
//         {products.length > 0 && (
//           <section ref={featuredRef} className="py-20 bg-transparent">
//             <div className="container-custom">
//               <h2 className="text-3xl md:text-4xl font-serif mb-10">Featured Products</h2>

//               <div className="marquee">
//                 <div className="marquee-content">
//                   {loopedProducts.slice(0, 10).map((product, i) => (
//                     <div key={product._id + i} className="product-slide">
//                       <ProductCard product={product} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* New Arrivals */}
//         {products.length > 0 && (
//             <section ref={newArrivalsRef} className="py-20">
//     <div className="container-custom">
//       <h2 className="text-3xl md:text-4xl font-serif mb-10">New Collections</h2>

//       <div className="marquee reverse">
//         <div className="marquee-content">

//           {loopedProducts
//   .slice(0, 11)
//   .map((product, i) => (
//     <div key={product._id + "new" + i} className="product-slide">
//       <ProductCard product={product} />
//     </div>
//   ))}


//         </div>
//       </div>
//     </div>
//   </section>
//         )}

//         <Values />
//         <WhyChooseUs />
//         <Testimonials />
//       </main>

//       <Footer />

//       <style>
//         {`
//           .marquee { overflow: hidden; white-space: nowrap; }
//           .marquee-content { display: inline-flex; animation: scroll-left 25s linear infinite; }
//           .marquee.reverse .marquee-content { animation: scroll-right 25s linear infinite; }
//           .product-slide { min-width: 260px; margin-right: 24px; }
//           @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
//           @keyframes scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
//         `}
//       </style>
//     </div>
//   );
// };

// export default HomePage;


import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import FeaturedCollections from "@/components/FeaturedCollections";
import Values from "@/components/Values";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchProducts } from "../api/productApi";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "https://img.freepik.com/premium-photo/display-t-sh…moon-sign-that-says-moon_974629-463546.jpg?w=1060",
  "https://img.freepik.com/premium-photo/shirt-that-h…-shirt-that-says-t-shirt_1086760-81334.jpg?w=1060",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1500",
  "https://img.freepik.com/premium-photo/shirts-new-season-are-displayed-this-image_1213494-12327.jpg?w=1060",
  "https://img.freepik.com/premium-photo/black-shirt-…hat-it-that-says-t-shirt_1086760-85066.jpg?w=1060",
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={heroImages[index]}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative container-custom h-full flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 max-w-2xl">
          Define Your Style with Timeless Pieces
        </h1>
        <p className="text-white/80 text-xl md:text-2xl mb-8 max-w-xl">
          Premium fashion designed for a modern lifestyle.
        </p>
        <Button size="lg" className="text-lg px-8 max-w-40 mt-10 " asChild>
          <Link to="/shop">Explore Collection</Link>
        </Button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === i ? "bg-white scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useScrollAnimation({ delay: 0.2 });
  const newArrivalsRef = useScrollAnimation({ y: 50, delay: 0.3 });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchProducts();
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    load();
  }, []);

  const loopedProducts = [...products, ...products];

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(hero.querySelector("img"), { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 })
      .fromTo(hero.querySelector("h1"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
      .fromTo(hero.querySelector("p"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSlider />

        <FeaturedCollections />

        {products.length > 0 && (
  <section ref={featuredRef} className="py-20 bg-transparent">
    <div className="container-custom">
      <h2 className="text-3xl md:text-4xl font-serif mb-10">Featured Products</h2>

      <div className="marquee">
        <div className="marquee-content">
          {loopedProducts.slice(0, 10).map((product, i) => (
            <div key={product._id + i} className="product-slide">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* VIEW ALL / SHOP NOW BUTTON */}
      <div className="flex justify-center mt-10">
        <Button size="lg" asChild className="px-10 text-lg">
          <Link to="/shop">Shop Now</Link>
        </Button>
      </div>

    </div>
  </section>
)}


        {/* New Collections */}
        {products.length > 0 && (
  <section ref={newArrivalsRef} className="py-20">
    <div className="container-custom">
      <h2 className="text-3xl md:text-4xl font-serif mb-10">New Collections</h2>

      <div className="marquee reverse">
        <div className="marquee-content">
          {loopedProducts.slice(0, 11).map((product, i) => (
            <div key={product._id + "new" + i} className="product-slide">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* VIEW ALL PRODUCTS BUTTON */}
      <div className="flex justify-center mt-10">
        <Button size="lg" asChild className="px-10 text-lg">
          <Link to="/shop">View All Products</Link>
        </Button>
      </div>

    </div>
  </section>
)}


        <Values />
        <WhyChooseUs />
        <Testimonials />
      </main>

      <Footer />

      <style>
        {`
          .marquee {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            position: relative;
            padding-bottom: 6px;
          }

          .marquee::-webkit-scrollbar {
            height: 6px;
          }
          .marquee::-webkit-scrollbar-thumb {
            border-radius: 9999px;
          }

          .marquee-content {
            display: inline-flex;
            animation: scroll-left 40s linear infinite;
          }

          .marquee.reverse .marquee-content {
            animation: scroll-right 40s linear infinite;
          }

          .marquee:hover .marquee-content {
            animation-play-state: paused;
            cursor: grab;
          }

          .product-slide {
            min-width: 260px;
            margin-right: 24px;
          }

          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
