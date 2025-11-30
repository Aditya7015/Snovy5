// src/context/SearchContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { fetchProducts, BackendProduct } from "@/api/productApi";

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  results: BackendProduct[];
  loading: boolean;
  clear: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetchProducts(1, 12, query);
        setResults(res.data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const clear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, results, loading, clear }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be inside <SearchProvider>");
  return ctx;
};
