import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useOrder, OrderAddress } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

// Payment types
type PaymentMethod = 'credit-card' | 'paypal';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    billingAddress: user?.address?.street || "",
    billingApartment: "",
    billingCity: user?.address?.city || "",
    billingState: user?.address?.state || "",
    billingZip: user?.address?.postalCode || "",
    billingCountry: user?.address?.country || "India",
    shippingAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "India",
    paymentMethod: 'credit-card' as PaymentMethod,
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    saveInfo: true,
    notes: ""
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData({ ...formData, paymentMethod: value as PaymentMethod });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to complete your order");
      navigate("/account");
      return;
    }

    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'billingAddress', 'billingCity', 'billingState',
      'billingZip', 'billingCountry'
    ];

    if (!sameAsBilling) {
      requiredFields.push(
        'shippingAddress', 'shippingCity',
        'shippingState', 'shippingZip', 'shippingCountry'
      );
    }

    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        toast.error("Enter your card details");
        return;
      }
    }

    const billingAddress: OrderAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      street: formData.billingAddress,
      city: formData.billingCity,
      state: formData.billingState,
      postalCode: formData.billingZip,
      country: formData.billingCountry,
      phone: formData.phone
    };

    const shippingAddress: OrderAddress = sameAsBilling
      ? billingAddress
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          postalCode: formData.shippingZip,
          country: formData.shippingCountry,
          phone: formData.phone
        };

    const paymentInfo = formData.paymentMethod === "credit-card"
      ? {
          cardNumber: formData.cardNumber,
          cardholderName: `${formData.firstName} ${formData.lastName}`,
          expiryDate: formData.cardExpiry,
          cvv: formData.cardCvv
        }
      : undefined;

    try {
      setLoading(true);
      const order = await createOrder(
        cart,
        shippingAddress,
        billingAddress,
        formData.paymentMethod,
        paymentInfo
      );
      clearCart();
      navigate(`/order-confirmation/${order.id}`);

    } catch (error: any) {
      toast.error(error.message || "Error placing your order");
      setLoading(false);
    }
  };

  // Empty cart UI
  if (cart.length === 0 && !loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom flex-grow py-16">
          <h1 className="text-3xl font-serif mb-10">Snovy5 Checkout</h1>

          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
              Looks like you haven't added any Snovy5 apparel yet.  
              Explore our latest drops and pick your favourite fits.
            </p>
            <Button onClick={() => navigate("/shop")}>Shop Collection</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Not logged in UI
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom flex-grow py-16">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/cart")}>
            <ArrowLeft className="mr-2" size={18} />
            Back to Cart
          </Button>

          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Sign in to continue</CardTitle>
                <CardDescription>
                  Sign in or create an account to place your Snovy5 order.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="mb-4">
                  An account helps you track your orders and get updates on new Snovy5 drops.
                </p>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={() => navigate("/account")}>
                  Sign In
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/account?register=true")}>
                  Create Account
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const SHIPPING_COST = 49; // ₹49 shipping
  const freeShipping = cartTotal >= 999; // Free shipping above ₹999
  const orderTotal = freeShipping ? cartTotal : cartTotal + SHIPPING_COST;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container-custom py-10">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/cart")}>
          <ArrowLeft className="mr-2" size={18} />
          Back to Cart
        </Button>

        <h1 className="text-3xl font-serif mb-10">Snovy5 Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-10">
              {/* CONTACT */}
              <div>
                <h2 className="text-xl font-medium mb-6">Your Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <Label>First Name *</Label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} />
                  </div>

                  <div>
                    <Label>Last Name *</Label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>

                  <div>
                    <Label>Email *</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </div>

                  <div>
                    <Label>Phone *</Label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              {/* BILLING */}
              <div>
                <h2 className="text-xl font-medium mb-6">Billing Address</h2>

                <div className="space-y-4">
                  <div>
                    <Label>Street Address *</Label>
                    <Input name="billingAddress" value={formData.billingAddress} onChange={handleInputChange} />
                  </div>

                  <div>
                    <Label>Apartment, Suite (optional)</Label>
                    <Input name="billingApartment" value={formData.billingApartment} onChange={handleInputChange} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>City *</Label>
                      <Input name="billingCity" value={formData.billingCity} onChange={handleInputChange} />
                    </div>

                    <div>
                      <Label>State *</Label>
                      <Input name="billingState" value={formData.billingState} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>PIN Code *</Label>
                      <Input name="billingZip" value={formData.billingZip} onChange={handleInputChange} />
                    </div>

                    <div>
                      <Label>Country *</Label>
                      <Input name="billingCountry" value={formData.billingCountry} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SHIPPING */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    checked={sameAsBilling}
                    onCheckedChange={(c) => setSameAsBilling(c as boolean)}
                  />
                  <label className="text-sm font-medium">
                    Shipping address same as billing
                  </label>
                </div>

                {!sameAsBilling && (
                  <div className="space-y-4 border-t pt-6">
                    <h2 className="text-xl font-medium mb-6">Shipping Address</h2>

                    <div>
                      <Label>Street Address *</Label>
                      <Input name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} />
                    </div>

                    <div>
                      <Label>Apartment (optional)</Label>
                      <Input name="shippingApartment" value={formData.shippingApartment} onChange={handleInputChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City *</Label>
                        <Input name="shippingCity" value={formData.shippingCity} onChange={handleInputChange} />
                      </div>

                      <div>
                        <Label>State *</Label>
                        <Input name="shippingState" value={formData.shippingState} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>PIN Code *</Label>
                        <Input name="shippingZip" value={formData.shippingZip} onChange={handleInputChange} />
                      </div>

                      <div>
                        <Label>Country *</Label>
                        <Input name="shippingCountry" value={formData.shippingCountry} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PAYMENT */}
              <div>
                <h2 className="text-xl font-medium mb-6">Payment Method</h2>

                <RadioGroup
                  defaultValue={formData.paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded p-4">
                    <RadioGroupItem value="credit-card" />
                    <Label className="flex-grow">Credit / Debit Card</Label>
                    <CreditCard size={20} className="text-muted-foreground" />
                  </div>

                  <div className="flex items-center space-x-2 border rounded p-4">
                    <RadioGroupItem value="paypal" />
                    <Label className="flex-grow">PayPal</Label>
                    <span className="text-blue-600 font-medium">PayPal</span>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label>Card Number</Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry</Label>
                        <Input
                          placeholder="MM/YY"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>CVV</Label>
                        <Input
                          placeholder="123"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div>
              <div className="bg-secondary p-6 rounded sticky top-24">
                <h2 className="font-medium text-lg mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex">
                        <div className="w-12 h-12 relative">
                          <img src={item.image} className="w-full h-full object-cover" />
                          <span className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">₹{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{freeShipping ? "Free" : `₹${SHIPPING_COST}`}</span>
                  </div>

                  {freeShipping && (
                    <div className="text-green-600 text-sm flex items-center">
                      <Check size={14} className="mr-1" />
                      Free shipping applied
                    </div>
                  )}

                  <div className="border-t pt-4 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
                </Button>

                <div className="mt-6 text-sm text-center text-muted-foreground">
                  By placing your order, you agree to Snovy5's
                  <a href="/terms" className="text-primary ml-1">Terms</a>
                  and
                  <a href="/privacy" className="text-primary ml-1">Privacy Policy</a>.
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
