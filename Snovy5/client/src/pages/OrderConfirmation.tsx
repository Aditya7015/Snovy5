import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle, Box, MapPin, Truck, Package } from "lucide-react";

const API_URL = "http://localhost:5000";

// Same token checker used everywhere
const getToken = () =>
  localStorage.getItem("admin_token") ?? localStorage.getItem("token");

// Order status steps for timeline UI
const STATUS_STEPS = [
  { key: "pending", label: "Order Placed", Icon: Package },
  { key: "processing", label: "Packed", Icon: Box },
  { key: "shipped", label: "Shipped", Icon: Truck },
  { key: "delivered", label: "Delivered", Icon: CheckCircle },
];

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      const token = getToken();
      if (!token) {
        setError("You must be logged in to view this order");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to load order details");
      } else {
        setOrder(data);
      }
    } catch (e) {
      setError("Error fetching order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading)
    return (
      <Page>
        <div className="text-center py-20 text-lg">Loading your order...</div>
      </Page>
    );

  if (error || !order)
    return (
      <Page>
        <div className="text-center py-20 space-y-4">
          <h1 className="text-2xl font-semibold text-red-500">⚠ Error</h1>
          <p>{error}</p>
          <Button asChild>
            <Link to="/account/orders">My Orders</Link>
          </Button>
        </div>
      </Page>
    );

  const shipping = order.shippingAddress;
  const statusIndex = STATUS_STEPS.findIndex(
    (s) => s.key.toLowerCase() === order.status.toLowerCase()
  );
  const dateLabel = new Date(order.date).toLocaleDateString("en-IN");

  return (
    <Page>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-semibold">🎉 Order Confirmed</h1>
        <p className="text-gray-600 mt-2">
          Thank you for shopping with Snovy5!
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8">

        {/* Top Info */}
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">Order ID:</p>
            <p className="font-semibold">{order.id}</p>
            <p className="text-xs text-gray-500 mt-1">
              Ordered on {dateLabel}
            </p>
          </div>

          <p className="text-sm">
            Payment: <span className="font-semibold text-green-600">COD</span>
          </p>
        </div>

        {/* STATUS TIMELINE */}
        <div>
          <h3 className="font-medium mb-3">Order Status</h3>

          <div className="relative flex justify-between text-center">

            {/* Gray track */}
            <div className="absolute top-4 left-0 h-1 bg-gray-300 w-full rounded"></div>

            {/* Progress line */}
            <div
              className="absolute top-4 left-0 h-1 bg-green-500 rounded"
              style={{ width: `${(statusIndex / 3) * 100}%` }}
            ></div>

            {STATUS_STEPS.map((step, i) => {
              const active = i <= statusIndex;
              return (
                <div key={step.key} className="relative z-10">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition
                      ${
                        active
                          ? "bg-green-500 border-green-600 text-white"
                          : "bg-white dark:bg-gray-700 border-gray-400 text-gray-400"
                      }`}
                  >
                    <step.Icon size={18} />
                  </div>
                  <p
                    className={`mt-2 text-xs ${
                      active ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border rounded-lg p-4 space-y-1">
          <p className="font-medium flex items-center gap-2">
            <MapPin size={18} /> Delivery Address
          </p>
          <p className="text-sm text-gray-700 leading-5">
            {shipping.firstName} {shipping.lastName} <br />
            {shipping.street}, {shipping.city} <br />
            {shipping.state} - {shipping.postalCode} <br />
            {shipping.country} <br />
            📞 {shipping.phone}
          </p>
        </div>

        {/* ORDER ITEMS */}
        <div className="space-y-4">
          {order.items.map((item: any, i: number) => (
            <div key={i} className="flex justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <p className="text-lg font-semibold text-right">
          Total: ₹{order.total}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild>
            <Link to="/account/orders">View All Orders</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Page>
  );
}

function Page({ children }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom py-10 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
