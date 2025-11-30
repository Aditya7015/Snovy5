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
import { fetchProducts } from "@/api/productApi";

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useScrollAnimation({ delay: 0.2 });
  const newArrivalsRef = useScrollAnimation({ y: 50, delay: 0.3 });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchProducts({ page: 1, limit: 20 });
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
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1500"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container-custom h-full flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 max-w-2xl">
              Define Your Style with Timeless Pieces
            </h1>
            <p className="text-white/80 text-xl md:text-2xl mb-8 max-w-xl">
              Premium fashion designed for a modern lifestyle.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/shop">Explore Collection</Link>
            </Button>
          </div>
        </section>

        <FeaturedCollections />

        {/* Featured Products */}
        {products.length > 0 && (
          <section ref={featuredRef} className="py-20 bg-secondary">
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
            </div>
          </section>
        )}

        {/* New Arrivals */}
        {products.length > 0 && (
          <section ref={newArrivalsRef} className="py-20">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-serif mb-10">New Arrivals</h2>

              <div className="marquee reverse">
                <div className="marquee-content">
                  {loopedProducts.slice(0, 10).map((product, i) => (
                    <div key={product._id + "new" + i} className="product-slide">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
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
          .marquee { overflow: hidden; white-space: nowrap; }
          .marquee-content { display: inline-flex; animation: scroll-left 25s linear infinite; }
          .marquee.reverse .marquee-content { animation: scroll-right 25s linear infinite; }
          .product-slide { min-width: 260px; margin-right: 24px; }
          @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        `}
      </style>
    </div>
  );
};

export default HomePage;
