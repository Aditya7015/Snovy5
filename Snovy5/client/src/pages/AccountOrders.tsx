import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_URL = "http://localhost:5000";

export default function AccountOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-20 flex-grow text-center">
          Loading your orders...
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
          <p className="text-muted-foreground mb-8">
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
        <h1 className="text-3xl font-serif mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 border shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link to={`/order-confirmation/${order.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>

              {/* Items preview */}
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-2 border rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="text-sm">
                      <p>{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-medium text-right mt-4">
                Total: ₹{order.total}
              </p>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
