import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import FeaturedCollections from "@/components/FeaturedCollections";
import Values from "@/components/Values";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { products, categories } from "@/data/products";

const HomePage = () => {
  const featuredProducts = products.slice(0, 6);
  const newArrivals = products.slice(2, 8);

  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useScrollAnimation({ y: 100 });
  const featuredRef = useScrollAnimation({ delay: 0.2 });
  const newArrivalsRef = useScrollAnimation({ y: 50, delay: 0.3 });
  const aboutRef = useScrollAnimation({ scale: 0.9, delay: 0.2 });
  const whyChooseUsRef = useScrollAnimation({ y: 100 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const heading = hero.querySelector("h1");
    const paragraph = hero.querySelector("p");
    const buttons = hero.querySelectorAll("button");
    const image = hero.querySelector("img");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      image,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "sine.inOut" }
    )
      .fromTo(
        heading,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        paragraph,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.7"
      )
      .fromTo(
        buttons,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        "-=0.6"
      );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[90vh] bg-neutral-100 overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1500"
              alt="Stylish woman posing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>

          <div className="relative container-custom h-full flex flex-col justify-center">
            <h1 className="hero-text text-5xl md:text-7xl text-white font-serif mb-6 max-w-2xl">
              Define Your Style with Timeless Pieces
            </h1>
            <p className="hero-text text-white/90 text-xl md:text-2xl mb-8 max-w-xl">
              Discover our collection of modern classics, designed for the
              fashion-forward individual.
            </p>
            <div className="hero-text flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/shop">Explore Collection</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
                asChild
              >
                <Link to="/about">Our Philosophy</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        {/* <Values /> */}

        {/* Why Choose Us Section */}
        {/* <WhyChooseUs /> */}

        {/* Featured Collections */}
        <div ref={useScrollAnimation({ y: 100, delay: 0.2 })}>
          <FeaturedCollections />
        </div>

        {/* Categories Section */}
        <section ref={categoriesRef} className="py-20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <h2 className="text-3xl md:text-4xl font-serif">
                Shop by Category
              </h2>
              <Link
                to="/categories"
                className="flex items-center group text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0"
              >
                View All Categories
                <ArrowRight
                  size={16}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 sm:gap-8">
              {categories.slice(0, 9).map((category) => (
                <Link
                  to="/shop"
                  key={category.id}
                  className="group relative overflow-hidden aspect-square rounded-lg"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 sm:p-6">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-serif text-center">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div> */}
            <div className="relative h-[200%] max-h-[calc(2*theme(spacing.64))] overflow-y-scroll scrollbar-hide">
  <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 sm:gap-8">
    {categories.slice(0, 9).map((category) => (
      <Link
        to="/shop"
        key={category.id}
        className="group relative overflow-hidden aspect-square rounded-lg"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 sm:p-6">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-serif text-center">
            {category.name}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</div>

          </div>
        </section>

        {/* Featured Products */}
        <section ref={featuredRef} className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <h2 className="text-3xl md:text-4xl font-serif">
                Featured Products
              </h2>
              <Link
                to="/shop"
                className="flex items-center group text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0"
              >
                View All Products
                <ArrowRight
                  size={16}
                  className="ml-2. transform group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div> */}

            <div className="featured-container">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {featuredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>
          </div>
        </section>

       

        {/* New Arrivals */}
        <section ref={newArrivalsRef} className="py-20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <h2 className="text-3xl md:text-4xl font-serif">New Arrivals</h2>
              <Link
                to="/shop"
                className="flex items-center group text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0"
              >
                View All New Arrivals
                <ArrowRight
                  size={16}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* <div className="Arrivals grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div> */}

              <div className="arrival-wrapper">
  <div className="Arrivals grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {newArrivals.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>


          </div>
        </section>

        {/* Newsletter Section */}
        {/* <div ref={useScrollAnimation({ y: 50, delay: 0.3 })}>
          <Newsletter />
        </div> */}

         {/* Testimonials Section */}
        <div ref={useScrollAnimation({ scale: 0.9, delay: 0.2 })}>
          <Testimonials />
        </div>

        {/* About Section */}
        {/* <section ref={aboutRef} className="py-20 bg-neutral-100">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">
                  Quality Craftsmanship. Modern Aesthetic.
                </h2>
                <p className="text-muted-foreground mb-8">
                  At Snoovy, we believe in creating clothing that lasts. Our
                  pieces are designed with a focus on quality materials, expert
                  craftsmanship, and a timeless, modern aesthetic that you'll
                  wear for years to come.
                </p>
                <Button asChild>
                  <Link to="/about">Our Philosophy</Link>
                </Button>
              </div>
              <div className="relative aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1552668693-2be72c866be4?q=80&w=800"
                  alt="Fashion design sketches"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* Instagram Section */}
        {/* <section
          className="py-20"
          ref={useScrollAnimation({ opacity: 0, delay: 0.2 })}
        >
          <div className="container-custom text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Follow Our Style
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join our community and share how you wear our pieces. Tag us for a
              chance to be featured.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-0">
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1574201635302-388dd78a4664?q=80&w=300"
                alt="Instagram post 1"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1550928434-4a0b59b3433d?q=80&w=300"
                alt="Instagram post 2"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1588117269543-847c555354c0?q=80&w=300"
                alt="Instagram post 3"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=300"
                alt="Instagram post 4"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1552668693-2be72c866be4?q=80&w=300"
                alt="Instagram post 5"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300"
                alt="Instagram post 6"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1552668693-2be72c866be4?q=80&w=300"
                alt="Instagram post 7"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=300"
                alt="Instagram post 8"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1588117269543-847c555354c0?q=80&w=300"
                alt="Instagram post 9"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1550928434-4a0b59b3433d?q=80&w=300"
                alt="Instagram post 10"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1574201635302-388dd78a4664?q=80&w=300"
                alt="Instagram post 11"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
            <a
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300"
                alt="Instagram post 12"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">@Snoovy</span>
              </div>
            </a>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
