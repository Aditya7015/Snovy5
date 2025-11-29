// src/pages/admin/AdminAddProduct.tsx
import { FormEvent, useState } from "react";
import { useAdminProducts } from "@/context/AdminProductContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/context/CartContext";

const AdminAddProduct = () => {
  const { addProduct } = useAdminProducts();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.image) {
      toast.error("Please fill all required fields");
      return;
    }

    addProduct({
      name: form.name,
      category: form.category,
      image: form.image,
      description: form.description || "No description provided.",
      price: Number(form.price),
    });

    toast.success("Product added to admin inventory");
    setForm({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });
  };

  const previewProduct: Product | null =
    form.name && form.image && form.price
      ? {
          id: "preview",
          name: form.name,
          price: Number(form.price || 0),
          image: form.image,
          category: form.category || "Preview",
          description: form.description || "Preview description",
        }
      : null;

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
      <Card className="p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Oversized Tee"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the product..."
            />
          </div>

          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Live Preview
        </h3>
        <Card className="p-4 flex items-center justify-center min-h-[280px]">
          {previewProduct ? (
            <div className="max-w-xs w-full">
              <ProductCard product={previewProduct} />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center">
              Fill the form to preview how the product will look on the
              storefront.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminAddProduct;
