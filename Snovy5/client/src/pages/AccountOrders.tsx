import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { Loader2, RefreshCcw, Copy, MapPin } from "lucide-react";
import { toast } from "sonner";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-purple-600";
    case "delivered":
      return "bg-green-600";
    case "canceled":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

export default function AccountOrders() {
  const { orders, fetchOrders, updateOrderStatus } = useOrder();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied!");
  };

  if (!orders) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-20 flex-grow text-center">
          <Loader2 className="animate-spin mx-auto" size={32} />
        </div>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-20 flex-grow text-center">
          <h2 className="text-xl font-medium mb-3">No Orders Yet</h2>
          <p className="text-muted-foreground mb-4">
            Looks like you haven’t ordered anything yet.
          </p>
          <Button asChild>
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container-custom flex-grow py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">My Orders</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchOrders()}
            className="flex gap-1"
          >
            <RefreshCcw size={16} /> Refresh
          </Button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="p-6 border shadow-md hover:shadow-lg transition rounded-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">
                    Order ID: #{order.id.slice(-8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ordered on{" "}
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyOrderId(order.id)}
                  >
                    <Copy size={16} />
                  </Button>

                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} text-white capitalize`}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>

              {/* Items List */}
              <div className="flex gap-4 mt-6 overflow-x-auto">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 border rounded-md min-w-[200px] bg-muted"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lower Section */}
              <div className="flex flex-wrap justify-between mt-6 text-sm">

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>
                    Deliver to: {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                  </span>
                </div>

                <p className="font-medium">
                  Pay: ₹{order.total} • <span className="text-green-600">COD</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                {order.status === "pending" && (
                  <Button
                    variant="destructive"
                    onClick={() =>
                      updateOrderStatus(order.id, "canceled")
                    }
                  >
                    Cancel Order
                  </Button>
                )}

                <Button variant="outline" asChild>
                  <Link to={`/order-confirmation/${order.id}`}>
                    Track Order
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
