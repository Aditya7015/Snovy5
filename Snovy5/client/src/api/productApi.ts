import api from "./axios";

export interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category?: string;
  stock?: number;
}

// export async function fetchProducts(): Promise<BackendProduct[]> {
//   const res = await api.get("/products");
//   return res.data; // <-- backend directly returns array
//}

export async function fetchProducts(
  page: number = 1,
  limit: number = 10
): Promise<{ data: BackendProduct[]; meta: any }> 
{
  const res = await api.get(`/products?page=${page}&limit=${limit}`);
  return res.data;
}



export async function fetchProductById(id: string): Promise<BackendProduct> {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function createProductApi(
  form: {
    name: string;
    price: number;
    category: string;
    description: string;
    stock?: number;
  },
  files: File[]
): Promise<BackendProduct> {
  const fd = new FormData();
  fd.append("name", form.name);
  fd.append("price", String(form.price));
  fd.append("category", form.category);
  fd.append("description", form.description);
  if (form.stock !== undefined) fd.append("stock", String(form.stock));

  files.forEach((file) => fd.append("images", file));

  const res = await api.post("/admin/products/createPro", fd);
  return res.data;
}

export async function updateProductApi(
  id: string,
  updates: {
    name?: string;
    price?: number;
    category?: string;
    description?: string;
    stock?: number;
    files?: File[];
  }
): Promise<BackendProduct> {
  const fd = new FormData();
  if (updates.name) fd.append("name", updates.name);
  if (updates.price) fd.append("price", String(updates.price));
  if (updates.category) fd.append("category", updates.category);
  if (updates.description) fd.append("description", updates.description);
  if (updates.stock !== undefined) fd.append("stock", String(updates.stock));
  if (updates.files) updates.files.forEach((file) => fd.append("images", file));

  const res = await api.put(`/admin/products/updatePro/${id}`, fd);
  return res.data;
}

export async function deleteProductApi(id: string): Promise<void> {
  await api.delete(`/admin/products/deletPro/${id}`);
}
