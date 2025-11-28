import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";
import { Tags } from "lucide-react";

const Categories = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="bg-secondary py-16">
          <div className="container-custom">
            <h1 className="text-4xl font-serif mb-4">Shop by Category</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our curated categories of modern apparel, designed to elevate your personal style.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group relative overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Tags
                        className="mx-auto mb-2 sm:mb-3"
                        size={window.innerWidth >= 640 ? 32 : 24}
                      />
                      <h2 className="text-lg sm:text-2xl font-serif">{category.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
