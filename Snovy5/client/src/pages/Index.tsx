import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import FeaturedCollections from "@/components/FeaturedCollections";
import Testimonials from "@/components/Testimonials";
import Values from "@/components/Values";
import WhyChooseUs from "@/components/WhyChooseUs";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { products, categories } from "@/data/products";

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const featuredRef = useScrollAnimation({ y: 100 });
  const arrivalsRef = useScrollAnimation({ y: 80 });
  const categoryRef = useScrollAnimation({ y: 80 });
  const styleRef = useScrollAnimation({ y: 80 });
  const testimonialRef = useScrollAnimation({ opacity: 0 });
  const newsletterRef = useScrollAnimation({ y: 60 });
  const valuesRef = useScrollAnimation({ y: 50 });
  const whyRef = useScrollAnimation({ y: 50 });

  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  // HERO GSAP ANIMATION
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const h1 = hero.querySelector("h1");
    const p = hero.querySelector("p");
    const btns = hero.querySelectorAll("button");
    const img = hero.querySelector("img");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(img, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3 })
      .fromTo(h1, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .fromTo(p, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7")
      .fromTo(btns, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2 }, "-=0.6");
  }, []);

  // AUTO SCROLLING TESTIMONIALS
  useEffect(() => {
    const slider = document.querySelector("#testimonial-slider");

    if (slider) {
      gsap.to(slider, {
        x: "-50%",
        duration: 18,
        ease: "linear",
        repeat: -1,
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">

        {/* HERO SECTION */}
        <section ref={heroRef} className="relative h-[90vh] overflow-hidden bg-neutral-100">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1500"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

          <div className="relative container-custom h-full flex flex-col justify-center">
            <h1 className="text-white text-6xl md:text-7xl font-serif max-w-2xl mb-6">
              Define Your Style with Timeless Pieces
            </h1>

            <p className="text-white/90 text-xl md:text-2xl max-w-xl mb-8">
              Discover modern classics crafted for the fashion-forward.
            </p>

            <div className="flex gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/shop">Explore Collection</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-white border-white/40 bg-white/10 hover:bg-white/20"
                asChild
              >
                <Link to="/about">Our Philosophy</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FEATURED COLLECTION */}
        <div ref={featuredRef}>
          <FeaturedCollections />
        </div>

        {/* NEW ARRIVALS */}
        <section ref={arrivalsRef} className="py-20">
          <div className="container-custom">
            <div className="flex justify-between mb-10">
              <h2 className="text-4xl font-serif">New Arrivals</h2>
              <Link className="flex items-center text-muted-foreground hover:text-foreground" to="/shop">
                View All <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section ref={categoryRef} className="py-20">
          <div className="container-custom">
            <div className="flex justify-between mb-10">
              <h2 className="text-4xl font-serif">Shop by Category</h2>
              <Link to="/categories" className="flex items-center text-muted-foreground hover:text-foreground">
                View All Categories <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {categories.slice(0, 3).map((cat) => (
                <Link key={cat.id} to="/shop" className="relative rounded-lg overflow-hidden group">
                  <img
                    src={cat.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-serif">{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SHOP BY STYLE */}
        <section ref={styleRef} className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-4xl font-serif mb-10">Shop by Style</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOMER SAY - AUTO SCROLL MARQUEE */}
        <section ref={testimonialRef} className="py-20 overflow-hidden">
          <h2 className="text-center text-4xl font-serif mb-10">Customer Say</h2>

          <div className="w-full overflow-hidden">
            <div id="testimonial-slider" className="flex w-max gap-6">
              <Testimonials />
              <Testimonials />
            </div>
          </div>
        </section>

        {/* STAY UPDATED */}
        <div ref={newsletterRef}>
          <Newsletter />
        </div>

        {/* OUR COMMITMENT */}
        <div ref={valuesRef}>
          <Values />
        </div>

        {/* WHY CHOOSE US */}
        <div ref={whyRef}>
          <WhyChooseUs />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
