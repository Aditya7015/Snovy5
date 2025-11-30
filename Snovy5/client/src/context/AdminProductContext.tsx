// src/context/AdminProductContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/context/CartContext";
import {
  BackendProduct,
  createProductApi,
  deleteProductApi,
  fetchProducts,
  updateProductApi,
} from "@/api/productApi";
import { toast } from "sonner";

interface AdminProductContextType {
  products: Product[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
  addProduct: (payload: {
    name: string;
    price: number;
    category: string;
    description: string;
    stock?: number;
    files: File[];
  }) => Promise<void>;
  updateProduct: (
    id: string,
    updates: {
      name?: string;
      price?: number;
      category?: string;
      description?: string;
      stock?: number;
    }
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const AdminProductContext = createContext<AdminProductContextType | undefined>(
  undefined
);

const mapBackendToProduct = (p: BackendProduct): Product => ({
  id: p._id,
  name: p.name,
  price: p.price,
  category: p.category || "Uncategorized",
  description: p.description || "",
  image: p.images?.[0] || "",
});

export const AdminProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const refreshProducts = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetchProducts({ page: 1, limit: 100 });
  //     setProducts(res.data.map(mapBackendToProduct));
  //   } catch (err) {
  //     console.error("Failed to load products:", err);
  //     toast.error("Failed to load products");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const refreshProducts = async () => {
  try {
    setIsLoading(true);
    const res = await fetchProducts(1, 100);
    setProducts(res.data.map(mapBackendToProduct));
  } catch (err) {
    console.error("Failed to load products:", err);
    toast.error("Failed to load products");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct: AdminProductContextType["addProduct"] = async (payload) => {
    try {
      const backend = await createProductApi(
        {
          name: payload.name,
          price: payload.price,
          category: payload.category,
          description: payload.description,
          stock: payload.stock,
        },
        payload.files
      );
      setProducts((prev) => [...prev, mapBackendToProduct(backend)]);
    } catch (err: any) {
      const msg =
        err.response?.data?.error || err.message || "Failed to add product";
      console.error("addProduct error:", err);
      throw new Error(msg);
    }
  };

  const updateProduct: AdminProductContextType["updateProduct"] = async (
    id,
    updates
  ) => {
    try {
      const backend = await updateProductApi(id, updates);
      const updated = mapBackendToProduct(backend);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err: any) {
      const msg =
        err.response?.data?.error || err.message || "Failed to update product";
      console.error("updateProduct error:", err);
      throw new Error(msg);
    }
  };

  const deleteProduct: AdminProductContextType["deleteProduct"] = async (
    id
  ) => {
    try {
      await deleteProductApi(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      const msg =
        err.response?.data?.error || err.message || "Failed to delete product";
      console.error("deleteProduct error:", err);
      throw new Error(msg);
    }
  };

  return (
    <AdminProductContext.Provider
      value={{
        products,
        isLoading,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};

export const useAdminProducts = () => {
  const ctx = useContext(AdminProductContext);
  if (!ctx) {
    throw new Error(
      "useAdminProducts must be used within AdminProductProvider"
    );
  }
  return ctx;
};
