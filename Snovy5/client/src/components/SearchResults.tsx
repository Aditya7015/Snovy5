// src/components/SearchResults.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/SearchContext";

const SearchResults = ({ onClose }: { onClose: () => void }) => {
  const { query, results, loading, clear } = useSearch();

  if (!query.trim()) return null;

  return (
    <div className="mt-6">
      {loading ? (
        <p className="text-center text-muted-foreground py-6">Searching...</p>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Results for "{query}"</h3>
          <div className="space-y-4">
            {results.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="flex items-center gap-4 p-2 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No match for "{query}"</p>
          <Button variant="outline" onClick={() => { clear(); onClose(); }}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
