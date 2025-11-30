import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.log("Order fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="text-center flex-grow py-20">Loading...</div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom py-10 flex-grow text-center">
        <h1 className="text-3xl font-serif mb-4">Order Confirmed 🎉</h1>
        <p className="text-lg">Thank you! Your order has been placed.</p>

        <div className="bg-secondary mt-6 p-6 rounded max-w-xl mx-auto text-left">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="mt-4">
            {order.items.map((item: any) => (
              <p
                key={item._id}
                className="flex justify-between text-sm py-1 border-b"
              >
                {item.quantity}× {item.name}
                <span>₹{item.price}</span>
              </p>
            ))}
          </div>
          <div className="font-semibold text-lg mt-4 text-right">
            Total: ₹{order.total}
          </div>
        </div>

        <div className="mt-10 flex gap-3 justify-center">
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/account/orders">View All Orders</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
