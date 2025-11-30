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
      <div className="flex flex-col min-h-screen relative">
        {/* Animated background remains behind */}
        <Header />
        <div className="text-center flex-grow py-20 text-gray-700 dark:text-gray-200 z-10 relative">
          Loading...
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Animated background remains behind */}
      <Header />

      <main className="container-custom py-12 flex-grow relative z-10">
        {/* Confirmation Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Order Confirmed 🎉
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thank you! Your order has been successfully placed.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 backdrop-blur-md transition">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                Order ID: <span className="font-normal">{order.id}</span>
              </p>
              <p className="mt-1 text-sm">
                Status:{" "}
                <span
                  className={`capitalize px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
            <div className="text-left md:text-right text-gray-700 dark:text-gray-300">
              <p>
                Payment Method: <span className="font-medium">{order.paymentMethod.toUpperCase()}</span>
              </p>
              <p className="mt-1">
                Date: <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6 border-t border-b border-gray-200 dark:border-gray-700 py-4">
            <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-2">
              Shipping Address
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName},<br />
              {order.shippingAddress.street}, {order.shippingAddress.city},<br />
              {order.shippingAddress.state} - {order.shippingAddress.postalCode},<br />
              {order.shippingAddress.country} <br />
              Phone: {order.shippingAddress.phone}
            </p>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <p className="text-gray-800 dark:text-gray-100 font-medium">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-gray-900 dark:text-gray-100 font-semibold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 text-right text-lg font-semibold text-gray-900 dark:text-gray-100">
            Total: ₹{order.total}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
  {/* Primary button */}
  <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition shadow-md">
    <Link to="/shop">Continue Shopping</Link>
  </Button>

  {/* Secondary button - improved */}
  <Button
    asChild
    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition shadow-sm"
  >
    <Link to="/account/orders">View All Orders</Link>
  </Button>
</div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
