// src/context/AdminProductContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/context/CartContext";
import { products as initialProducts } from "@/data/products";

interface AdminProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
}

const AdminProductContext = createContext<AdminProductContextType | undefined>(
  undefined
);

export const AdminProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("snovy_admin_products");
    if (stored) {
      try {
        return JSON.parse(stored) as Product[];
      } catch {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("snovy_admin_products", JSON.stringify(products));
  }, [products]);

  const addProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (
    id: string,
    updates: Partial<Omit<Product, "id">>
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
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
