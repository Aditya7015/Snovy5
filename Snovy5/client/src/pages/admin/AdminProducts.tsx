import { useEffect, useMemo, useState } from "react";
import { useAdminProducts } from "@/context/AdminProductContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Search, Edit2, Trash2 } from "lucide-react";

interface EditForm {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
}

const AdminProducts = () => {
  const {
    products,
    isLoading,
    refreshProducts,
    updateProduct,
    deleteProduct,
  } = useAdminProducts();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditForm | null>(null);

  useEffect(() => {
    refreshProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [products, search]);

  const openEditDialog = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setEditing({
      id: p.id,
      name: p.name,
      price: String(p.price),
      category: p.category,
      description: p.description,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editing) return;
    const { name, value } = e.target;
    setEditing({ ...editing, [name]: value });
  };

  const handleEditSave = async () => {
    if (!editing) return;
    try {
      await updateProduct(editing.id, {
        name: editing.name,
        price: Number(editing.price),
        category: editing.category,
        description: editing.description,
      });
      toast.success("Product updated");
      setEditing(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <Card className="p-6 backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 shadow-xl border border-white/20">
      {/* HEADER SEARCH BAR */}
      <div className="flex items-center justify-between mb-6 gap-3 sticky top-0 z-20">
        <h2 className="text-2xl font-semibold tracking-tight">Products</h2>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE LIST */}
      {isLoading ? (
        <div className="py-12 text-center text-sm text-muted-foreground animate-pulse">
          Loading products...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No products found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/10 dark:bg-gray-900/10 shadow-md backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead className="bg-black/20 dark:bg-white/10 backdrop-blur-xl sticky top-0">
              <tr className="text-left text-xs uppercase tracking-wide text-white/80">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/10 hover:bg-white/10 transition"
                >
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-md shadow-sm hover:scale-110 transition duration-300"
                    />
                  </td>

                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>

                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-green-200 text-green-800 text-xs font-semibold">
                      ₹{p.price.toFixed(2)}
                    </span>
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full hover:scale-105 transition"
                      onClick={() => openEditDialog(p.id)}
                    >
                      <Edit2 size={14} /> Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-full hover:scale-105 transition"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT MODAL */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="backdrop-blur-2xl bg-white/60 dark:bg-gray-800/60 border border-white/20 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit Product
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-3 mt-2">
              <div>
                <Label>Name</Label>
                <Input name="name" value={editing.name} onChange={handleEditChange} />
              </div>

              <div>
                <Label>Category</Label>
                <Input name="category" value={editing.category} onChange={handleEditChange} />
              </div>

              <div>
                <Label>Price (₹)</Label>
                <Input name="price" type="number" value={editing.price} onChange={handleEditChange} />
              </div>

              <div>
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={editing.description}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full border rounded-md p-2 text-sm"
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave} className="bg-primary hover:bg-primary/80">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminProducts;
