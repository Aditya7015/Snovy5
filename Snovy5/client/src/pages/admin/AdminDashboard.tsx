// src/pages/admin/AdminDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminProducts } from "@/context/AdminProductContext";

const AdminDashboard = () => {
  const { products } = useAdminProducts();

  const totalProducts = products.length;
  const uniqueCategories = new Set(products.map((p) => p.category)).size;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalProducts}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Products currently available in admin inventory
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{uniqueCategories}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Unique categories across your catalog
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">—</p>
          <p className="text-xs text-muted-foreground mt-1">
            Orders dashboard will be connected after backend implementation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
