// src/pages/Shop.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/api/productApi";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { X, GridIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Prevent URL category being applied twice
  const [urlCategoryLoaded, setUrlCategoryLoaded] = useState(false);

  // -----------------------
  // 1) Load all products
  // -----------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetchProducts(1, 100);
        const dataArray = res.data || [];
        setProducts(dataArray);
        setFilteredProducts(dataArray);
      } catch (err) {
        console.error("Failed loading products", err);
      }
    }
    load();
  }, []);

  // -----------------------
  // 2) Apply category from URL (initial load)
  // -----------------------
  useEffect(() => {
    if (urlCategoryLoaded) return;

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
      setUrlCategoryLoaded(true);
    }
  }, [searchParams, urlCategoryLoaded]);

  // ---------------------------------------------------------
  // 0) NEW FEATURE: If no params in URL → reset all checkboxes
  // ---------------------------------------------------------
  useEffect(() => {
    if (searchParams.size === 0) {
      setSelectedCategories([]); // uncheck all
    }
  }, [searchParams]);

  // -----------------------
  // 3) Apply filters
  // -----------------------
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category || "")
      );
    }

    // Price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategories, priceRange, sortBy]);

  // Create category list from product data
  const categories = Array.from(
    new Set(products.map((p) => p.category || "Uncategorized"))
  ).map((name, index) => ({ id: String(index), name }));

  // -----------------------
  // 4) Toggle category + update URL
  // -----------------------
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      // Update URL only if exactly 1 category selected
      if (updated.length === 1) {
        setSearchParams({ category: updated[0] });
      } else {
        setSearchParams({}); // remove all params
      }

      return updated;
    });
  };

  // -----------------------
  // 5) Clear All Filters
  // -----------------------
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="bg-secondary py-16">
          <div className="container-custom">
            <h1 className="text-4xl font-serif mb-4">Snovy5 — Shop</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              
              {/* -----------------------
                  LEFT SIDEBAR (Filters)
              ------------------------ */}
              <div className="hidden lg:block sticky top-24">
                <h3 className="font-medium mb-6">Filters</h3>

                <Accordion type="multiple" defaultValue={["categories", "price"]}>
                  
                  {/* Category Filter */}
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      {categories.map((c) => (
                        <div key={c.id} className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            checked={selectedCategories.includes(c.name)}
                            onCheckedChange={() => toggleCategory(c.name)}
                          />
                          <span>{c.name}</span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  {/* Price Filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      <Slider
                        min={0}
                        max={5000}
                        step={50}
                        value={priceRange}
                        onValueChange={(val) =>
                          setPriceRange(val as [number, number])
                        }
                      />
                      <div className="flex justify-between mt-4 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button className="mt-6 w-full" variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>

              {/* -----------------------
                  PRODUCTS GRID
              ------------------------ */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
