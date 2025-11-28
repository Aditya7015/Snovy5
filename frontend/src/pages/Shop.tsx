// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCard";
// import { products, categories } from "@/data/products";
// import { Slider } from "@/components/ui/slider";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import { X, GridIcon, List } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Shop = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState([0, 400]);
//   const [sortBy, setSortBy] = useState("featured");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   // Get category filter from URL if present
//   useEffect(() => {
//     const categoryParam = searchParams.get("category");
//     if (categoryParam) {
//       setSelectedCategories([categoryParam]);
//     }
//   }, [searchParams]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...products];

//     // Filter by category
//     if (selectedCategories.length > 0) {
//       result = result.filter(product =>
//         selectedCategories.includes(product.category)
//       );
//     }

//     // Filter by price
//     result = result.filter(product =>
//       product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     // Apply sorting
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "name":
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       // "featured" is default, no sorting needed
//     }

//     setFilteredProducts(result);
//   }, [selectedCategories, priceRange, sortBy]);

//   // Toggle category selection
//   const toggleCategory = (category: string) => {
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange([0, 400]);
//     setSortBy("featured");
//     setSearchParams({});
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />

//       <main className="flex-grow">
//         {/* Shop header */}
//         <section className="bg-secondary py-16">
//           <div className="container-custom">
//             <h1 className="text-4xl font-serif mb-4">Shop Our Collection</h1>
//             <p className="text-muted-foreground max-w-2xl">
//               Discover our curated selection of minimalist home goods designed to elevate your everyday experience.
//             </p>
//           </div>
//         </section>

//         {/* Shop content */}
//         <section className="py-12">
//           <div className="container-custom">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
//               {/* Sidebar filters - mobile */}
//               <div className="lg:hidden flex justify-between items-center mb-6">
//                 <Button variant="outline" size="sm">
//                   Filters
//                 </Button>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     title="Grid View"
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`}
//                   >
//                     <GridIcon size={20} />
//                   </button>
//                   <button
//                     title="List View"
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`}
//                   >
//                     <List size={20} />
//                   </button>
//                 </div>
//               </div>

//               {/* Sidebar filters - desktop */}
//               <div className="hidden lg:block">
//                 <div className="sticky top-24">
//                   <div className="flex justify-between items-center mb-8">
//                     <h3 className="font-medium">Filters</h3>
//                     {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 400) && (
//                       <button
//                         className="text-sm text-muted-foreground hover:text-primary"
//                         onClick={clearFilters}
//                       >
//                         Clear all
//                       </button>
//                     )}
//                   </div>

//                   <Accordion type="multiple" defaultValue={["categories", "price"]}>
//                     <AccordionItem value="categories">
//                       <AccordionTrigger>Categories</AccordionTrigger>
//                       <AccordionContent>
//                         <div className="space-y-2">
//                           {categories.map(category => (
//                             <div key={category.id} className="flex items-center space-x-2">
//                               <Checkbox
//                                 id={category.id}
//                                 checked={selectedCategories.includes(category.name)}
//                                 onCheckedChange={() => toggleCategory(category.name)}
//                               />
//                               <label
//                                 htmlFor={category.id}
//                                 className="text-sm cursor-pointer"
//                               >
//                                 {category.name}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>

//                     <AccordionItem value="price">
//                       <AccordionTrigger>Price Range</AccordionTrigger>
//                       <AccordionContent>
//                         <div className="px-2 pt-2">
//                           <Slider
//                             defaultValue={[0, 400]}
//                             min={0}
//                             max={400}
//                             step={10}
//                             value={priceRange}
//                             onValueChange={(value) => setPriceRange(value as [number, number])}
//                           />
//                           <div className="flex justify-between mt-4 text-sm">
//                             <span>${priceRange[0]}</span>
//                             <span>${priceRange[1]}</span>
//                           </div>
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 </div>
//               </div>

//               {/* Products grid */}
//               <div className="lg:col-span-3">
//                 <div className="flex justify-between items-center mb-8">
//                   <p className="text-muted-foreground">
//                     Showing {filteredProducts.length} products
//                   </p>
//                   <div className="flex items-center space-x-4">
//                     <div className="hidden lg:flex items-center space-x-2">
//                       <button
//                         title="Grid View"
//                         onClick={() => setViewMode("grid")}
//                         className={`p-2 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`}
//                       >
//                         <GridIcon size={20} />
//                       </button>
//                       <button
//                         title="List View"
//                         onClick={() => setViewMode("list")}
//                         className={`p-2 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`}
//                       >
//                         <List size={20} />
//                       </button>
//                     </div>

//                     <Select value={sortBy} onValueChange={setSortBy}>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Sort by" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="featured">Featured</SelectItem>
//                         <SelectItem value="price-low">Price: Low to High</SelectItem>
//                         <SelectItem value="price-high">Price: High to Low</SelectItem>
//                         <SelectItem value="name">Name</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {/* Active filters */}
//                 {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 400) && (
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {selectedCategories.map(cat => (
//                       <div key={cat} className="bg-secondary text-sm px-3 py-1 rounded-full flex items-center">
//                         {cat}
//                         <button
                          
//                           title="Remove Category"
//                           className="ml-2"
//                           onClick={() => toggleCategory(cat)}
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}

//                     {(priceRange[0] > 0 || priceRange[1] < 400) && (
//                       <div className="bg-secondary text-sm px-3 py-1 rounded-full flex items-center">
//                         ${priceRange[0]} - ${priceRange[1]}
//                         <button
//                           title="Remove Price Range"
//                           className="ml-2"
//                           onClick={() => setPriceRange([0, 400])}
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {filteredProducts.length > 0 ? (
//                   <div className={viewMode === "grid"
//                     ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
//                     : "space-y-6"
//                   }>
//                     {filteredProducts.map(product => (
//                       viewMode === "grid" ? (
//                         <ProductCard key={product.id} product={product} />
//                       ) : (
//                         <div key={product.id} className="flex border-b pb-6">
//                           <div className="w-1/3 aspect-square">
//                             <img
//                               src={product.image}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="w-2/3 pl-6">
//                             <h3 className="font-medium text-lg mb-2">{product.name}</h3>
//                             <p className="text-muted-foreground mb-4">${product.price.toFixed(2)}</p>
//                             <p className="text-sm mb-6 line-clamp-3">{product.description}</p>
//                             <Button>View Product</Button>
//                           </div>
//                         </div>
//                       )
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-16">
//                     <h3 className="text-xl mb-2">No products found</h3>
//                     <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
//                     <Button onClick={clearFilters}>Clear Filters</Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Shop;




import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
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
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get category filter from URL if present
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price
    result = result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
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
      // "featured" is default, no sorting needed
    }

    setFilteredProducts(result);
  }, [selectedCategories, priceRange, sortBy]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 400]);
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Shop header */}
        <section className="bg-secondary py-16">
          <div className="container-custom">
            <h1 className="text-4xl font-serif mb-4">Shop The Collection</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our curated selection of modern essentials, from timeless outerwear to everyday basics.
            </p>
          </div>
        </section>

        {/* Shop content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* Sidebar filters - mobile toggle button */}
              <div className="lg:hidden flex justify-between items-center mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  Filters
                </Button>
                <div className="flex items-center space-x-2">
                  <button
                    title="Grid View"
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <GridIcon size={20} />
                  </button>
                  <button
                    title="List View"
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* Mobile filters drawer */}
              {mobileFiltersOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex">
                  <div className="bg-background w-4/5 max-w-sm h-full overflow-auto p-6 ml-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-medium">Filters</h3>
                      <button
                        title="Close Filters"
                        className="text-muted-foreground"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="mb-4">
                      {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 400) && (
                        <button
                          className="text-sm text-muted-foreground hover:text-primary mb-4 block"
                          onClick={clearFilters}
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>

                    <Accordion type="multiple" defaultValue={["categories", "price"]}>
                      <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {categories.map(category => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-${category.id}`}
                                  checked={selectedCategories.includes(category.name)}
                                  onCheckedChange={() => toggleCategory(category.name)}
                                />
                                <label
                                  htmlFor={`mobile-${category.id}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="px-2 pt-2">
                            <Slider
                              defaultValue={[0, 400]}
                              min={0}
                              max={400}
                              step={10}
                              value={priceRange}
                              onValueChange={(value) => setPriceRange(value as [number, number])}
                            />
                            <div className="flex justify-between mt-4 text-sm">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Button
                      className="w-full mt-6"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}

              {/* Sidebar filters - desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-medium">Filters</h3>
                    {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 400) && (
                      <button
                        className="text-sm text-muted-foreground hover:text-primary"
                        onClick={clearFilters}
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <Accordion type="multiple" defaultValue={["categories", "price"]}>
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={category.id}
                                checked={selectedCategories.includes(category.name)}
                                onCheckedChange={() => toggleCategory(category.name)}
                              />
                              <label
                                htmlFor={category.id}
                                className="text-sm cursor-pointer"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="px-2 pt-2">
                          <Slider
                            defaultValue={[0, 400]}
                            min={0}
                            max={400}
                            step={10}
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                          />
                          <div className="flex justify-between mt-4 text-sm">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Products grid */}
              <div className="lg:col-span-3">
                {/* ...existing code... */}
                <div className="flex justify-between items-center mb-8">
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="hidden lg:flex items-center space-x-2">
                      <button
                        title="Grid View"
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <GridIcon size={20} />
                      </button>
                      <button
                        title="List View"
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <List size={20} />
                      </button>
                    </div>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active filters */}
                {/* ...existing code... */}
                {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 400) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedCategories.map(cat => (
                      <div key={cat} className="bg-secondary text-sm px-3 py-1 rounded-full flex items-center">
                        {cat}
                        <button

                          title="Remove Category"
                          className="ml-2"
                          onClick={() => toggleCategory(cat)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    {(priceRange[0] > 0 || priceRange[1] < 400) && (
                      <div className="bg-secondary text-sm px-3 py-1 rounded-full flex items-center">
                        ${priceRange[0]} - ${priceRange[1]}
                        <button
                          title="Remove Price Range"
                          className="ml-2"
                          onClick={() => setPriceRange([0, 400])}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {filteredProducts.length > 0 ? (
                  <div className={viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    : "space-y-6"
                  }>
                    {filteredProducts.map(product => (
                      viewMode === "grid" ? (
                        <ProductCard key={product.id} product={product} />
                      ) : (
                        <div key={product.id} className="flex border-b pb-6">
                          <div className="w-1/3 aspect-square">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 pl-6">
                            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                            <p className="text-muted-foreground mb-4">${product.price.toFixed(2)}</p>
                            <p className="text-sm mb-6 line-clamp-3">{product.description}</p>
                            <Button>View Product</Button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
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