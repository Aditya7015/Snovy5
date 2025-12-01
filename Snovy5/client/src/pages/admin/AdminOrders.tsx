import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useOrder } from "@/context/OrderContext";
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock9,
  MapPin,
  Calendar,
  BarChart4,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrder();

  const STATUS: Array<
    "pending" | "processing" | "shipped" | "delivered" | "canceled"
  > = ["pending", "processing", "shipped", "delivered", "canceled"];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
  };

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as any);
    toast.success("Order status updated successfully!");
  };

  const stats = useMemo(() => {
    const summary = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      canceled: 0,
    };

    orders.forEach((o) => {
      const key = o.status as keyof typeof summary;
      if (summary[key] !== undefined) summary[key]++;
    });

    return summary;
  }, [orders]);

  const maxCount =
    Math.max(
      stats.pending,
      stats.processing,
      stats.shipped,
      stats.delivered,
      stats.canceled
    ) || 1;

  return (
    <div className="space-y-6">

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Pending", value: stats.pending, icon: Clock9 },
          { label: "Processing", value: stats.processing, icon: Package },
          { label: "Shipped", value: stats.shipped, icon: Truck },
          { label: "Delivered", value: stats.delivered, icon: CheckCircle2 },
          { label: "Canceled", value: stats.canceled, icon: XCircle },
        ].map(({ label, value, icon: Icon }) => (
          <Card
            key={label}
            className="p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition"
          >
            <Icon size={22} className="mb-2 text-primary" />
            <p className="font-semibold text-lg">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </Card>
        ))}
      </div>

      {/* BAR GRAPH */}
      <Card className="p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart4 size={18} />
            <h3 className="font-semibold text-sm">Order Overview</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            Total: {orders.length}
          </span>
        </div>

        <div className="flex items-end gap-4 h-32">
          {[
            { label: "Pending", value: stats.pending, color: "bg-yellow-400" },
            { label: "Processing", value: stats.processing, color: "bg-blue-400" },
            { label: "Shipped", value: stats.shipped, color: "bg-purple-400" },
            { label: "Delivered", value: stats.delivered, color: "bg-green-500" },
            { label: "Canceled", value: stats.canceled, color: "bg-red-500" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-end gap-1 flex-1"
            >
              <div
                className={`rounded-t-md w-10 ${color}`}
                style={{
                  height: value === 0 ? 6 : (value / maxCount) * 90 + 10,
                }}
              />
              <span className="text-[10px] text-muted-foreground">{label}</span>
              <span className="text-[10px] font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ORDERS LIST */}
      <Card className="p-6 space-y-6 shadow-lg border">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Orders Management
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm">
            No orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              className="p-5 border rounded-xl bg-secondary/10 hover:shadow-xl transition"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-semibold text-base">
                    Order #{order.id.slice(-8)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>

                <Badge className={`capitalize font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </Badge>
              </div>

              {/* CUSTOMER + META */}
              <div className="mt-4 grid gap-3 text-xs md:text-sm md:grid-cols-2 lg:grid-cols-3">
                
                <p>
                  <span className="font-semibold">Customer:</span>{" "}
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>

                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.shippingAddress.phone}
                </p>

                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  ₹{order.total.toFixed(2)}
                </p>

                <p>
                  <span className="font-semibold">Payment:</span> COD
                </p>

                <p className="flex items-start gap-1 col-span-full">
                  <MapPin size={14} className="mt-0.5" />
                  <span>
                    {order.shippingAddress.street},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} - {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </span>
                </p>
              </div>

              {/* STATUS SELECTOR */}
              <div className="mt-4">
                <Select
                  defaultValue={order.status}
                  onValueChange={(value) =>
                    handleStatusChange(order.id, value)
                  }
                >
                  <SelectTrigger className="w-[200px] shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st.charAt(0).toUpperCase() + st.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ITEMS */}
              {/* ITEMS */}
<div className="mt-5 flex gap-4 overflow-x-auto pb-3">
  {order.items.map((item) => (
    <div
      key={item.productId}
      className="border rounded-lg p-2 bg-white dark:bg-gray-700 w-32 flex-shrink-0"
    >
      <img
        src={item.image}
        className="w-16 h-16 object-cover mx-auto rounded"
        alt={item.name}
      />
      <p className="text-xs font-medium text-center mt-2 line-clamp-2">
        {item.name}
      </p>

      {/* 🆕 SIZE DISPLAY */}
      <div className="text-center mt-1">
        <Badge variant="outline" className="text-[10px] px-1 py-0.5">
          Size: {item.size || "—"}
        </Badge>
      </div>

      {/* Quantity */}
      <p className="text-[10px] text-center text-muted-foreground mt-0.5">
        Qty: {item.quantity}
      </p>

    </div>
  ))}
</div>

            </Card>
          ))
        )}
      </Card>
    </div>
  );
}
