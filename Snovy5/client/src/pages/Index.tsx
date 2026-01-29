import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  "https://static.vecteezy.com/system/resources/thumbnails/049/024/618/small_2x/free-new-colorful-t-shirts-mockup-with-copy-space-on-drak-color-background-free-photo.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/049/024/658/small_2x/free-new-colorful-t-shirts-mockup-with-copy-space-on-drak-color-background-free-photo.jpg",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1500",
  "https://t3.ftcdn.net/jpg/06/25/23/08/360_F_625230848_kR0nFlnGG8N9uTLsgRLxK4e3vV0n2Olm.jpg",
  "https://img.freepik.com/premium-photo/row-black-shirts-with-word-t-front_993259-11488.jpg",
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setIndex((prev) => (prev + 1) % heroImages.length),
      4500
    );
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={heroImages[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute w-full h-full object-cover"
          loading="lazy"
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
        <Button size="lg" className="text-lg px-8 max-w-40 mt-10" asChild>
          <Link to="/shop">Explore Collection</Link>
        </Button>
      </div>
    </section>
  );
}

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const featuredRef = useScrollAnimation({ delay: 0.2 });
  const newArrivalsRef = useScrollAnimation({ y: 50, delay: 0.3 });

  useEffect(() => {
    fetchProducts(1, 20).then((res) =>
      setProducts(res.data || [])
    );
  }, []);

  // ➤ Only 12 products → smooth animation
  const loopedProducts = products.slice(0, 12);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow will-change-transform">
        <HeroSlider />

        <FeaturedCollections />

        {products.length > 0 && (
          <section ref={featuredRef} className="py-20">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-serif mb-10">
                Featured Products
              </h2>

              <div className="marquee">
                <div className="marquee-content">
                  {loopedProducts.map((product, i) => (
                    <div key={product._id + i} className="product-slide">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <Button size="lg" className="px-10 text-lg" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {products.length > 0 && (
          <section ref={newArrivalsRef} className="py-20">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-serif mb-10">
                New Collections
              </h2>

              <div className="marquee reverse">
                <div className="marquee-content">
                  {loopedProducts.map((product, i) => (
                    <div key={product._id + "new" + i} className="product-slide">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <Button size="lg" className="px-10 text-lg" asChild>
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

      <style>{`
        .marquee {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        .marquee-content {
          display: inline-flex;
          gap: 24px;
          animation: smooth-scroll 25s linear infinite;
          will-change: transform;
        }
        .marquee.reverse .marquee-content {
          animation: smooth-scroll-reverse 25s linear infinite;
        }
        .product-slide {
          min-width: 260px;
        }
        @keyframes smooth-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes smooth-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
