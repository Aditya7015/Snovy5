import { useParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrder();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Get order data from OrderContext
  const order = orderId ? getOrderById(orderId) : undefined;

  // If order not found and done loading, redirect to account page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!order && !isLoading) {
        navigate("/account/orders");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [order, isLoading, navigate]);

  // If no order ID or not authenticated, show loading state
  if (!orderId || !isAuthenticated || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-20 flex-grow">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If order not found, show error
  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-20 flex-grow">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Order Not Found</h2>
            <p className="mb-6 text-muted-foreground">
              The order you're looking for doesn't exist or you don't have access to view it.
            </p>
            <Button asChild>
              <Link to="/account/orders">View Your Orders</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date for display
  const orderDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get shipping address display
  const shippingAddress = `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`;

  // Calculate order total and subtotal
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container-custom py-10">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/account/orders")}>
          <ArrowLeft className="mr-2" size={18} />
          Back to Orders
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle size={60} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-serif mb-4">Thank you for your order!</h1>
            <p className="text-muted-foreground mb-2">
              Your order #{order.id} has been successfully placed.
            </p>
            <p className="text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </div>

          {/* Order details card */}
          <div className="bg-secondary rounded-lg p-6 mb-10">
            <h2 className="text-xl font-medium mb-6">Order Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">ORDER NUMBER</h3>
                <p>{order.id}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">DATE</h3>
                <p>{orderDate}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">SHIPPING ADDRESS</h3>
                <p>{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</p>
                <p>{shippingAddress}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">PAYMENT METHOD</h3>
                <p>{order.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}</p>
              </div>
            </div>

            {/* Order summary */}
            <h3 className="font-medium border-b pb-2 mb-4">Order Summary</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="pt-2 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{subtotal >= 50 ? 'Free' : '$5.99'}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order tracking */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-6">Order Status</h2>
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-6 top-8 h-[calc(100%-32px)] w-0.5 bg-muted"></div>

              {/* Steps */}
              <div className="space-y-8">
                <div className="flex">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="font-medium">Order Placed</h3>
                    <p className="text-muted-foreground text-sm">
                      {orderDate}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className={`w-12 h-12 rounded-full ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} flex items-center justify-center shrink-0`}>
                    <Package size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className={`font-medium ${['processing', 'shipped', 'delivered'].includes(order.status) ? '' : 'text-muted-foreground'}`}>
                      Processing
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We're preparing your order for shipment.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className={`w-12 h-12 rounded-full ${['shipped', 'delivered'].includes(order.status) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} flex items-center justify-center shrink-0`}>
                    <Truck size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className={`font-medium ${['shipped', 'delivered'].includes(order.status) ? '' : 'text-muted-foreground'}`}>
                      Shipped
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {order.status === 'shipped' || order.status === 'delivered'
                        ? `Your order is on its way to you.${order.trackingNumber ? ` Tracking #: ${order.trackingNumber}` : ''}`
                        : 'Your order will be shipped soon.'}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className={`w-12 h-12 rounded-full ${order.status === 'delivered' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'} flex items-center justify-center shrink-0`}>
                    <Home size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className={`font-medium ${order.status === 'delivered' ? '' : 'text-muted-foreground'}`}>
                      Delivered
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {order.status === 'delivered'
                        ? 'Your order has been delivered.'
                        : 'Your order will be delivered soon.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
