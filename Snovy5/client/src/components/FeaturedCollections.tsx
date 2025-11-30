import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchCategoriesWithOneProduct } from "@/api/productApi";
import { useEffect, useState } from "react";

// const collections = [
//   {
//     id: 1,
//     name: "Casual Edit",
//     description: "Effortless everyday style",
//     image: "https://res.cloudinary.com/defv2u4ay/image/upload/v1764415895/9586804_otx0tp.jpg",
//   },
//   {
//     id: 2,
//     name: "Modern Workwear",
//     description: "Elevate your office look",
//     image: "https://res.cloudinary.com/defv2u4ay/image/upload/v1764415746/9549329_idyiyd.jpg",
//   },
//   {
//     id: 3,
//     name: "Weekend Getaway",
//     description: "Comfortable and chic",
//     image: "https://res.cloudinary.com/defv2u4ay/image/upload/v1764416072/9834242_sbpidz.jpg",
//   },
//   {
//     id: 4,
//     name: "Casual Edit",
//     description: "Effortless everyday style",
//     image: "https://res.cloudinary.com/defv2u4ay/image/upload/v1764416151/70262200_9704568_ak7egm.jpg",
//   },
//   {
//     id: 5,
//     name: "Modern Workwear",
//     description: "Elevate your office look",
//     image: "https://res.cloudinary.com/defv2u4ay/image/upload/v1764415935/9587100_vvz9cp.jpg",
//   },
//   {
//     id: 6,
//     name: "Weekend Getaway",
//     description: "Comfortable and chic",
//     image: "https://res.cloudinary.com/defv2u4ay/image/upload/v1764416119/10251693_awxu9p.jpg",
//   },
// ];

const FeaturedCollections =() => {
  const [collections,setCollections]=useState([]);
  const containerRef = useScrollAnimation({ y: 30 });

  useEffect(() => {
  async function load() {
    try {
      const data = await fetchCategoriesWithOneProduct();
      setCollections(data || []);
    } catch (error) {
      console.error("Failed loading collections:", error);
    }
  }

  load();
}, []);

  return (
    <section className="py-20 bg-transparent" ref={containerRef}>
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
        <div
  className="
    /* Height to show exactly 2 rows */
    h-[600px] sm:h-[600px] md:h-[650px] lg:h-[700px]

    /* Enable vertical scrolling */
    overflow-y-auto
    overflow-x-hidden

    /* Hide scrollbar */
    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
  "
>
  <div
    className="
      grid
      grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5
      gap-4 sm:gap-8
    "
  >
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
          <h3 className="text-lg sm:text-2xl font-serif mb-1 sm:mb-2">
            {collection.name}
          </h3>

          <p className="text-white/80 text-sm sm:text-base mb-2 sm:mb-4">
            {collection.description}
          </p>

          <div className="flex items-center text-xs sm:text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            Explore Style
            <ArrowRight size={12} className="ml-2" />
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>



        
      </div>
    </section>
  );
};

export default FeaturedCollections;

