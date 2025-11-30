// src/pages/admin/AdminDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminProducts } from "@/context/AdminProductContext";
import { useOrder } from "@/context/OrderContext";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useMemo } from "react";
import { Package, ShoppingBag, CreditCard } from "lucide-react";

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444"];

const AdminDashboard = () => {
  const { products } = useAdminProducts();
  const { orders } = useOrder();

  const totalProducts = products.length;
  const uniqueCategories = new Set(products.map((p) => p.category)).size;
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  /* 🔥 Order Status Breakdown */
  const statusCount = useMemo(() => {
    const stats: Record<string, number> = {};
    orders.forEach((o) => {
      stats[o.status] = (stats[o.status] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [orders]);

  /* 📈 Revenue by Month */
  const revenueByMonth = useMemo(() => {
    const monthly: Record<string, number> = {};
    orders.forEach((o) => {
      const month = new Date(o.date).toLocaleString("default", {
        month: "short",
      });
      monthly[month] = (monthly[month] || 0) + o.total;
    });
    return Object.entries(monthly).map(([month, total]) => ({
      month,
      total,
    }));
  }, [orders]);

  return (
    <div className="space-y-6">

      {/* TOP STATS CARDS */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Products</CardTitle>
            <Package className="opacity-70" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalProducts}</CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Categories</CardTitle>
            <ShoppingBag className="opacity-70" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">{uniqueCategories}</CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Orders</CardTitle>
            <CreditCard className="opacity-70" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalOrders}</CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            ₹{revenue.toLocaleString()}
          </CardContent>
        </Card>
      </div>

      {/* REVENUE GROWTH LINE CHART */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ORDER STATUS PIE CHART */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Order Status Analytics</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                label
                data={statusCount}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {statusCount.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminDashboard;
