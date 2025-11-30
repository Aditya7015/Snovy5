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
  const [urlCategoryLoaded, setUrlCategoryLoaded] = useState(false);

  // Fetch products once
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

  // Preselect category from URL
  useEffect(() => {
    if (urlCategoryLoaded) return;
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
      setUrlCategoryLoaded(true);
    }
  }, [searchParams, urlCategoryLoaded]);

  // Reset all filters if URL is empty
  useEffect(() => {
    if (searchParams.size === 0) {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Filtering + sorting logic
  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category || "")
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

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

  const categories = Array.from(
    new Set(products.map((p) => p.category || "Uncategorized"))
  ).map((name, index) => ({ id: String(index), name }));

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      if (updated.length === 1) {
        setSearchParams({ category: updated[0] });
      } else {
        setSearchParams({});
      }

      return updated;
    });
  };

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
        {/* Banner */}
        <section className="bg-secondary py-14">
          <div className="container-custom">
            <h1 className="text-4xl font-serif font-bold mb-2">Explore T-Shirts</h1>
            <p className="text-muted-foreground">
              Premium Quality. Latest Trends. Best Offers.
            </p>
          </div>
        </section>

        {/* Filters + Products */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

              {/* Sidebar Filters */}
              <div className="hidden lg:block sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  {selectedCategories.length > 0 && (
                    <button className="text-sm text-red-500" onClick={clearFilters}>
                      Reset all
                    </button>
                  )}
                </div>

                <Accordion
                  type="multiple"
                  defaultValue={["categories", "price"]}
                  className="mb-4"
                >
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      {categories.map((c) => (
                        <label
                          key={c.id}
                          className="flex items-center space-x-2 mb-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={selectedCategories.includes(c.name)}
                            onCheckedChange={() => toggleCategory(c.name)}
                          />
                          <span>{c.name}</span>
                        </label>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

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
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button className="w-full" variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>

              {/* Main Product Grid */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Toolbar */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-bold">{filteredProducts.length}</span>{" "}
                    items
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Sorting */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px] text-sm">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low → High</SelectItem>
                        <SelectItem value="price-high">Price: High → Low</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Mode */}
                    <div className="hidden sm:flex gap-2">
                      <Button
                        size="icon"
                        variant={viewMode === "grid" ? "default" : "outline"}
                        onClick={() => setViewMode("grid")}
                      >
                        <GridIcon size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant={viewMode === "list" ? "default" : "outline"}
                        onClick={() => setViewMode("list")}
                      >
                        <List size={18} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* No Products */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 text-lg text-muted-foreground">
                    No results found. Try removing filters.
                  </div>
                )}

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
