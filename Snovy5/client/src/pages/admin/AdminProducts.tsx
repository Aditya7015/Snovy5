// // src/pages/admin/AdminProducts.tsx
// import { useState } from "react";
// import { useAdminProducts } from "@/context/AdminProductContext";
// import { Product } from "@/context/CartContext";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";

// const AdminProducts = () => {
//   const { products, deleteProduct, updateProduct } = useAdminProducts();
//   const [search, setSearch] = useState("");
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   const filtered = products.filter((p) =>
//     (p.name + p.category)
//       .toLowerCase()
//       .includes(search.trim().toLowerCase())
//   );

//   const handleDelete = (id: string) => {
//     const ok = window.confirm("Are you sure you want to delete this product?");
//     if (!ok) return;
//     deleteProduct(id);
//     toast.success("Product deleted");
//   };

//   const handleEditSave = () => {
//     if (!editingProduct) return;
//     const { id, name, price, category, image, description } = editingProduct;
//     updateProduct(id, { name, price, category, image, description });
//     toast.success("Product updated");
//     setEditingProduct(null);
//   };

//   return (
//     <Card className="p-4 md:p-6 shadow-sm">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
//         <h2 className="text-lg font-semibold">Products</h2>
//         <Input
//           placeholder="Search by name or category..."
//           className="max-w-xs"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="border-b">
//             <tr className="text-left">
//               <th className="py-2 pr-4">Image</th>
//               <th className="py-2 pr-4">Name</th>
//               <th className="py-2 pr-4">Category</th>
//               <th className="py-2 pr-4">Price</th>
//               <th className="py-2 pr-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((p) => (
//               <tr key={p.id} className="border-b last:border-0">
//                 <td className="py-3 pr-4">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="w-14 h-14 object-cover rounded-md"
//                   />
//                 </td>
//                 <td className="py-3 pr-4 font-medium">{p.name}</td>
//                 <td className="py-3 pr-4">{p.category}</td>
//                 <td className="py-3 pr-4 font-semibold">
//                   ₹{p.price.toFixed(2)}
//                 </td>
//                 <td className="py-3 pr-4 text-right space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setEditingProduct(p)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDelete(p.id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="py-6 text-center text-muted-foreground text-sm"
//                 >
//                   No products found for this search.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Dialog */}
//       <Dialog
//         open={!!editingProduct}
//         onOpenChange={(open) => !open && setEditingProduct(null)}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Product</DialogTitle>
//           </DialogHeader>
//           {editingProduct && (
//             <div className="space-y-4">
//               <div className="space-y-1">
//                 <Label>Name</Label>
//                 <Input
//                   value={editingProduct.name}
//                   onChange={(e) =>
//                     setEditingProduct({ ...editingProduct, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Category</Label>
//                 <Input
//                   value={editingProduct.category}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       category: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Price</Label>
//                 <Input
//                   type="number"
//                   value={editingProduct.price}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       price: Number(e.target.value),
//                     })
//                   }
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Image URL</Label>
//                 <Input
//                   value={editingProduct.image}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       image: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Description</Label>
//                 <Input
//                   value={editingProduct.description}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           )}
//           <DialogFooter className="mt-4">
//             <Button
//               variant="outline"
//               onClick={() => setEditingProduct(null)}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleEditSave}>Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default AdminProducts;



// src/pages/admin/AdminProducts.tsx
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
    // ensure latest from backend
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
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    }
  };

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold">Manage Products</h2>
        <Input
          placeholder="Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {isLoading ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          Loading products...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          No products found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Image</th>
                <th className="text-left py-2 px-2">Name</th>
                <th className="text-left py-2 px-2">Category</th>
                <th className="text-left py-2 px-2">Price</th>
                <th className="text-left py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2 px-2">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-2 font-medium">{p.name}</td>
                  <td className="py-2 px-2">{p.category}</td>
                  <td className="py-2 px-2">₹{p.price.toFixed(2)}</td>
                  <td className="py-2 px-2 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(p.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4 mt-2">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={editing.name}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  name="category"
                  value={editing.category}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <Label>Price (₹)</Label>
                <Input
                  name="price"
                  type="number"
                  value={editing.price}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={editing.description}
                  onChange={handleEditChange}
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminProducts;
