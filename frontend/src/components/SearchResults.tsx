
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const results = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-6">
      {query ? (
        results.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Results for "{query}"</h3>
            <div className="space-y-4">
              {results.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center gap-4 p-2 hover:bg-accent rounded-md"
                  onClick={onClose}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No products found for "{query}"</p>
            <Button variant="outline" onClick={onClose}>Clear Search</Button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchResults;
