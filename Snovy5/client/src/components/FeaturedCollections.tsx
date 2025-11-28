import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const collections = [
  {
    id: 1,
    name: "Casual Edit",
    description: "Effortless everyday style",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d9340?q=80&w=1500",
  },
  {
    id: 2,
    name: "Modern Workwear",
    description: "Elevate your office look",
    image: "https://images.unsplash.com/photo-1591047139829-d91620643734?q=80&w=1500",
  },
  {
    id: 3,
    name: "Weekend Getaway",
    description: "Comfortable and chic",
    image: "https://images.unsplash.com/photo-1534349762230-e0887830159b?q=80&w=1500",
  },
];

const FeaturedCollections = () => {
  const containerRef = useScrollAnimation({ y: 30 });

  return (
    <section className="py-20 bg-secondary" ref={containerRef}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
          <h2 className="text-3xl md:text-4xl font-serif">Shop by Style</h2>
          <Link
            to="/shop"
            className="flex items-center group text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0"
          >
            Browse All Styles
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to="/shop"
              className="group relative overflow-hidden aspect-[4/5] rounded-lg"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3 sm:p-6 text-white">
                <h3 className="text-lg sm:text-2xl font-serif mb-1 sm:mb-2">{collection.name}</h3>
                <p className="text-white/80 text-sm sm:text-base mb-2 sm:mb-4">{collection.description}</p>
                <div className="flex items-center text-xs sm:text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Explore Style
                  <ArrowRight size={12} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;

