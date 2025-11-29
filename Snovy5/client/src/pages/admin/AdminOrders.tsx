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

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrder();

  const STATUS: Array<
    "pending" | "processing" | "shipped" | "delivered" | "canceled"
  > = ["pending", "processing", "shipped", "delivered", "canceled"];

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as any);
    toast.success("Order status updated successfully!");
  };

  return (
    <Card className="p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Orders Management</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          No orders placed yet.
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-md space-y-3 shadow-sm"
            >
              {/* TOP SECTION */}
              <div className="flex justify-between">
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="text-sm leading-relaxed">
                <p>
                  <span className="font-medium">User ID:</span>{" "}
                  {order.userId}
                </p>
                <p>
                  <span className="font-medium">Total Price:</span> ₹
                  {order.total.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {order.paymentMethod === "credit-card"
                    ? "Credit Card"
                    : "PayPal"}
                </p>
              </div>

              {/* STATUS DROPDOWN */}
              <Select
                defaultValue={order.status}
                onValueChange={(value) =>
                  handleStatusChange(order.id, value)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* ORDER ITEMS */}
              <div className="pl-4 border-l space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <p className="text-sm">
                      {item.name} × {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
