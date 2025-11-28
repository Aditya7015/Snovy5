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

// Define the payment method type to match OrderContext
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
    billingCountry: user?.address?.country || "United States",
    shippingAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "United States",
    paymentMethod: 'credit-card' as PaymentMethod,
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    saveInfo: true,
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value as PaymentMethod
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to complete your purchase");
      navigate("/account");
      return;
    }

    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'billingAddress', 'billingCity', 'billingState', 'billingZip', 'billingCountry'
    ];

    if (!sameAsBilling) {
      requiredFields.push(
        'shippingAddress', 'shippingCity', 'shippingState', 'shippingZip', 'shippingCountry'
      );
    }

    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        toast.error("Please enter all payment details");
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

    const paymentInfo = formData.paymentMethod === 'credit-card'
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
      toast.error(error.message || "An error occurred processing your order");
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom flex-grow py-16">
          <h1 className="text-3xl font-serif mb-10">Checkout</h1>
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
              You need to add items to your cart before proceeding to checkout.
            </p>
            <Button onClick={() => navigate("/shop")}>Shop Now</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                  Please sign in or create an account to complete your purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  To provide you with a seamless checkout experience and allow you to track your orders,
                  we require you to sign in before placing an order.
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

  const SHIPPING_COST = 5.99;
  const showFreeShipping = cartTotal >= 50;
  const orderTotal = showFreeShipping ? cartTotal : cartTotal + SHIPPING_COST;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container-custom py-10">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/cart")}>
          <ArrowLeft className="mr-2" size={18} />
          Back to Cart
        </Button>

        <h1 className="text-3xl font-serif mb-10">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-6">Billing Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billingAddress">Street Address *</Label>
                    <Input
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingApartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="billingApartment"
                      name="billingApartment"
                      value={formData.billingApartment}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City *</Label>
                      <Input
                        id="billingCity"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingState">State/Province *</Label>
                      <Input
                        id="billingState"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingZip">ZIP/Postal Code *</Label>
                      <Input
                        id="billingZip"
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingCountry">Country *</Label>
                      <Input
                        id="billingCountry"
                        name="billingCountry"
                        value={formData.billingCountry}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="sameAsBilling"
                    checked={sameAsBilling}
                    onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                  />
                  <label
                    htmlFor="sameAsBilling"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Shipping address same as billing
                  </label>
                </div>

                {!sameAsBilling && (
                  <div className="space-y-4 border-t pt-6">
                    <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
                    <div>
                      <Label htmlFor="shippingAddress">Street Address *</Label>
                      <Input
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingApartment">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="shippingApartment"
                        name="shippingApartment"
                        value={formData.shippingApartment}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shippingCity">City *</Label>
                        <Input
                          id="shippingCity"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingState">State/Province *</Label>
                        <Input
                          id="shippingState"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shippingZip">ZIP/Postal Code *</Label>
                        <Input
                          id="shippingZip"
                          name="shippingZip"
                          value={formData.shippingZip}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingCountry">Country *</Label>
                        <Input
                          id="shippingCountry"
                          name="shippingCountry"
                          value={formData.shippingCountry}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                <RadioGroup
                  defaultValue={formData.paymentMethod}
                  className="space-y-4"
                  onValueChange={handlePaymentMethodChange}
                >
                  <div className="flex items-center space-x-2 border rounded p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-grow cursor-pointer">Credit Card</Label>
                    <CreditCard size={20} className="text-muted-foreground" />
                  </div>
                  <div className="flex items-center space-x-2 border rounded p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-grow cursor-pointer">PayPal</Label>
                    <span className="text-blue-600 font-medium">PayPal</span>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiration Date</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          className="mt-1"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          className="mt-1"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-secondary p-6 rounded sticky top-24">
                <h2 className="font-medium text-lg mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex">
                        <div className="w-12 h-12 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{showFreeShipping ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}</span>
                  </div>
                  {showFreeShipping && (
                    <div className="text-green-600 text-sm flex items-center">
                      <Check size={14} className="mr-1" />
                      Free shipping applied
                    </div>
                  )}
                  <div className="border-t pt-4 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
                </Button>

                <div className="mt-6 text-sm text-center text-muted-foreground">
                  By placing your order, you agree to our
                  <a href="/terms" className="text-primary hover:underline mx-1">Terms of Service</a>
                  and
                  <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>.
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
