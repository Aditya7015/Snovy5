import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  LogOut,
  MapPin,
  RefreshCcw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// -----------------------
// LOGIN COMPONENT
// -----------------------
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(
    new URLSearchParams(location.search).get("register") === "true"
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      if (isRegisterMode) {
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("All fields are required");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        toast.success("Account created!");
      } else {
        await login(formData.email, formData.password);
        toast.success("Welcome back!");
      }

      navigate("/account");
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isRegisterMode ? "Create Account" : "Sign In"}</CardTitle>
          <CardDescription>
            {isRegisterMode
              ? "Fill the form to register"
              : "Login with your credentials"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded mb-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegisterMode && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
              </div>
            )}

            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
            />

            {isRegisterMode && (
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Please wait..."
                : isRegisterMode
                ? "Register"
                : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center flex-col">
          <Button
            variant="link"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
          >
            {isRegisterMode ? "Already a member? Login" : "Create an account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// -----------------------
// STATUS COLORS
// -----------------------
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

// -----------------------
// ACCOUNT PAGE
// -----------------------
const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout, updateUserAddress } = useAuth();
  const { orders, fetchOrders, updateOrderStatus } = useOrder();
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const [activeTab, setActiveTab] = useState(
    location.pathname.includes("orders") ? "orders" : "profile"
  );

  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      if (user?.address) setAddressForm(user.address);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <LoginForm />
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container-custom flex-grow py-8">
        <h1 className="text-3xl font-serif mb-8">My Account</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="profile">
              <User size={18} className="mr-1" /> Profile
            </TabsTrigger>

            <TabsTrigger value="orders">
              <ShoppingBag size={18} className="mr-1" /> Orders
            </TabsTrigger>

            <TabsTrigger value="wishlist">
              <Heart size={18} className="mr-1" /> Wishlist
            </TabsTrigger>

            <TabsTrigger value="address">
              <MapPin size={18} className="mr-1" /> Address
            </TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <Card className="mt-6 max-w-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User size={20} /> Profile Information
                </CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Name</span>
                  <span>
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Email</span>
                  <span>{user?.email}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ORDERS TAB - Upgraded */}
          <TabsContent value="orders" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Orders</h2>

              <Button
                variant="outline"
                size="sm"
                className="flex gap-1"
                onClick={() => fetchOrders()}
              >
                <RefreshCcw size={14} /> Refresh
              </Button>
            </div>

            {orders.length === 0 ? (
              <p className="text-muted-foreground">
                You haven't placed any orders yet.
              </p>
            ) : (
              <div className="space-y-6">
                {orders.map((order: any) => (
                  <Card
                    key={order.id}
                    className="p-6 border shadow-sm hover:shadow-md transition rounded-xl"
                  >
                    {/* Order Header */}
                    <div className="flex justify-between items-center flex-wrap gap-3">
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

                      <Badge
                        className={`${getStatusColor(
                          order.status
                        )} text-white capitalize text-xs px-2 py-1`}
                      >
                        {order.status}
                      </Badge>
                    </div>

                    {/* Items */}
                    <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                      {order.items.map((item: any, idx: number) => (
                        <Link
                          to={`/order-confirmation/${order.id}`}
                          key={idx}
                          className="flex items-center gap-3 p-2 border rounded-md min-w-[200px] bg-muted hover:bg-muted/80 cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div className="text-sm">
                            <p className="font-medium line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Size: {item.size || "—"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between mt-5 text-sm flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <MapPin size={14} />
                        Delivering to: {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </div>

                      <p className="font-medium">
                        Total: ₹{order.total} •{" "}
                        <span className="text-green-600 font-semibold">COD</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                      {order.status === "pending" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, "canceled")
                          }
                        >
                          Cancel Order
                        </Button>
                      )}

                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/order-confirmation/${order.id}`}>
                          Track Order
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* WISHLIST TAB */}
          <TabsContent value="wishlist" className="mt-6">
            {wishlist.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              wishlist.map((item: any) => (
                <div
                  key={item.id}
                  className="border p-4 rounded mb-4 flex justify-between items-center"
                >
                  <p>{item.name}</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* ADDRESS TAB */}
          <TabsContent value="address" className="mt-6">
            <h2 className="text-xl font-medium mb-4">Your Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Street</Label>
                <Input
                  value={addressForm.street}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      street: e.target.value,
                    })
                  }
                />

                <Label className="mt-3">City</Label>
                <Input
                  value={addressForm.city}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      city: e.target.value,
                    })
                  }
                />

                <Label className="mt-3">State</Label>
                <Input
                  value={addressForm.state}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      state: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Postal Code</Label>
                <Input
                  value={addressForm.postalCode}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      postalCode: e.target.value,
                    })
                  }
                />

                <Label className="mt-3">Country</Label>
                <Input
                  value={addressForm.country}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      country: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <Button className="mt-4" onClick={() => updateUserAddress(addressForm)}>
              Save Address
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
