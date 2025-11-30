// // src/pages/admin/AdminAddProduct.tsx
// import { FormEvent, useState } from "react";
// import { useAdminProducts } from "@/context/AdminProductContext";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import ProductCard from "@/components/ProductCard";
// import { Product } from "@/context/CartContext";

// const AdminAddProduct = () => {
//   const { addProduct } = useAdminProducts();

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//   });

//   const [files, setFiles] = useState<File[]>([]);

//   const handleTextChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = Array.from(e.target.files || []);
//     if (selected.length > 5) {
//       toast.error("You can upload a maximum of 5 images!");
//       return;
//     }
//     setFiles(selected);
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!form.name || !form.price || !form.category || files.length === 0) {
//       toast.error("Fill all fields & upload images.");
//       return;
//     }

//     addProduct({
//       name: form.name,
//       price: Number(form.price),
//       category: form.category,
//       description: form.description || "No description provided",
//       image: URL.createObjectURL(files[0]), // only saving first image for now
//     });

//     toast.success("Product Added!");

//     setForm({ name: "", price: "", category: "", description: "" });
//     setFiles([]);
//   };

//   const previewProduct: Product | null =
//     form.name && files.length > 0 && form.price
//       ? ({
//           id: "preview",
//           name: form.name,
//           price: Number(form.price),
//           image: URL.createObjectURL(files[0]),
//           category: form.category,
//           description: form.description,
//           previewImages: files.map((file) => URL.createObjectURL(file)),
//         } as any)
//       : null;

//   return (
//     <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
//       <Card className="p-6 shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <Label>Product Name</Label>
//             <Input name="name" value={form.name} onChange={handleTextChange} />
//           </div>

//           <div>
//             <Label>Category</Label>
//             <Input
//               name="category"
//               value={form.category}
//               onChange={handleTextChange}
//             />
//           </div>

//           <div>
//             <Label>Price (₹)</Label>
//             <Input
//               name="price"
//               type="number"
//               value={form.price}
//               onChange={handleTextChange}
//             />
//           </div>

//           <div>
//             <Label>Upload Images (Max 5)</Label>
//             <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
//           </div>

//           {/* Thumbnails */}
//           {files.length > 0 && (
//             <div className="flex gap-2 flex-wrap p-1">
//               {files.map((file, index) => (
//                 <img
//                   key={index}
//                   src={URL.createObjectURL(file)}
//                   className="w-20 h-20 rounded object-cover border"
//                 />
//               ))}
//             </div>
//           )}

//           <div>
//             <Label>Description</Label>
//             <Textarea
//               name="description"
//               value={form.description}
//               rows={4}
//               onChange={handleTextChange}
//             />
//           </div>

//           <Button type="submit" className="w-full">
//             Save Product
//           </Button>
//         </form>
//       </Card>

//       {/* Live Preview */}
//       <Card className="p-4 flex items-center justify-center min-h-[280px]">
//         {previewProduct ? (
//           <ProductCard product={previewProduct} />
//         ) : (
//           <p className="text-xs text-muted-foreground text-center">
//             Fill form & upload images to preview here
//           </p>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default AdminAddProduct;


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
    category: "",
    description: "",
    stock: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 6) {
      toast.error("You can upload a maximum of 6 images!");
      return;
    }
    setFiles(selected);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || files.length === 0) {
      toast.error("Fill all fields & upload at least one image.");
      return;
    }

    try {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description || "No description provided",
        stock: form.stock ? Number(form.stock) : undefined,
        files,
      });

      toast.success("Product added successfully!");

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
      });
      setFiles([]);
    } catch (err: any) {
      toast.error(err.message || "Error adding product");
    }
  };

  const previewProduct: Product | null =
    form.name && files.length > 0 && form.price
      ? ({
          id: "preview",
          name: form.name,
          price: Number(form.price),
          image: URL.createObjectURL(files[0]),
          category: form.category,
          description: form.description,
          previewImages: files.map((file) => URL.createObjectURL(file)),
        } as any)
      : null;

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
      <Card className="p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>Product Name</Label>
            <Input name="name" value={form.name} onChange={handleTextChange} />
          </div>

          <div>
            <Label>Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleTextChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Price (₹)</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleTextChange}
              />
            </div>
            <div>
              <Label>Stock (optional)</Label>
              <Input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleTextChange}
              />
            </div>
          </div>

          <div>
            <Label>Upload Images (Max 6)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Thumbnails */}
          {files.length > 0 && (
            <div className="flex gap-2 flex-wrap p-1">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  className="w-20 h-20 rounded object-cover border"
                />
              ))}
            </div>
          )}

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              rows={4}
              onChange={handleTextChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </Card>

      {/* Live Preview */}
      <Card className="p-4 flex items-center justify-center min-h-[280px]">
        {previewProduct ? (
          <ProductCard product={previewProduct} />
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Fill form & upload images to preview here
          </p>
        )}
      </Card>
    </div>
  );
};

export default AdminAddProduct;
