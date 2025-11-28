import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, ShoppingBag, Heart, LogOut, CreditCard, Settings, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CardTitle
} from "@/components/ui/card";

// Login component for unauthorized users
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
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegisterMode) {
      // Validation for registration
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("All fields are required");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      try {
        setIsLoading(true);
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        });
        toast.success("Account created successfully!");
        navigate('/account');
      } catch (error: any) {
        setError(error.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Login logic
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return;
      }

      try {
        setIsLoading(true);
        await login(formData.email, formData.password);
        toast.success("Logged in successfully!");
        navigate('/account');
      } catch (error: any) {
        setError(error.message || "Invalid email or password");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isRegisterMode ? "Create Account" : "Sign In"}</CardTitle>
          <CardDescription>
            {isRegisterMode
              ? "Fill out the form below to create your account"
              : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            {isRegisterMode && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            {isRegisterMode && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : isRegisterMode ? "Create Account" : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center w-full">
            {isRegisterMode ? (
              <p>
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => setIsRegisterMode(false)}
                  className="p-0"
                >
                  Sign In
                </Button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => setIsRegisterMode(true)}
                  className="p-0"
                >
                  Create one
                </Button>
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout, updateUserProfile } = useAuth();
  const { getUserOrders } = useOrder();
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('/orders') ? "orders" : "profile"
  );

  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update profile state when user data changes
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password change if attempting to change password
    if (profile.newPassword) {
      if (!profile.currentPassword) {
        toast.error("Please enter your current password");
        return;
      }
      if (profile.newPassword !== profile.confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
      if (profile.newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
    }

    try {
      setIsSaving(true);

      await updateUserProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);
      setProfile(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/");
  };

  const orders = getUserOrders();

  // Sample addresses - would come from user data in a real implementation
  const addresses = user?.address ? [
    {
      id: "addr1",
      default: true,
      name: `${user.firstName} ${user.lastName}`,
      line1: user.address.street,
      line2: "",
      city: user.address.city,
      state: user.address.state,
      zip: user.address.postalCode,
      country: user.address.country
    }
  ] : [];

  // If not authenticated, show login/register form
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container-custom">
          <LoginForm />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container-custom py-10">
        <h1 className="text-3xl font-serif mb-10">My Account</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="border-b">
            <TabsList className="bg-transparent -mb-px">
              <TabsTrigger value="profile" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <User size={18} className="mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <ShoppingBag size={18} className="mr-2" /> Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <MapPin size={18} className="mr-2" /> Addresses
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <Heart size={18} className="mr-2" /> Wishlist
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <Settings size={18} className="mr-2" /> Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Profile Information</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">First Name</h3>
                      <p>{profile.firstName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Last Name</h3>
                      <p>{profile.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">Email Address</h3>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">Phone Number</h3>
                    <p>{profile.phone || "Not provided"}</p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profile.firstName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profile.lastName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email address cannot be changed</p>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="border-t pt-6 mt-6">
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={profile.currentPassword}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={profile.newPassword}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={profile.confirmPassword}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-8">
              <h2 className="text-xl font-medium">Order History</h2>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-secondary p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <h3 className="text-sm text-muted-foreground mb-1">Order Number</h3>
                          <p className="font-medium">{order.id}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground mb-1">Date</h3>
                          <p>{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground mb-1">Status</h3>
                          <span className="inline-block bg-green-100 text-green-800 py-1 px-2 rounded text-sm">
                            {order.status}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm text-muted-foreground mb-1">Total</h3>
                          <p>${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium mb-4">Items</h3>
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <div>
                                <p>{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button asChild>
                            <Link to={`/order/${order.id}`}>View Order Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <Button asChild>
                    <Link to="/shop">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Saved Addresses</h2>
                <Button>Add New Address</Button>
              </div>

              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map(address => (
                    <div key={address.id} className="border rounded-lg p-6 relative">
                      {address.default && (
                        <span className="absolute top-2 right-2 bg-primary/10 text-primary text-xs py-1 px-2 rounded">
                          Default
                        </span>
                      )}
                      <h3 className="font-medium mb-2">{address.name}</h3>
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>{address.city}, {address.state} {address.zip}</p>
                      <p>{address.country}</p>

                      <div className="mt-4 pt-4 border-t flex gap-4">
                        <Button size="sm" variant="outline">Edit</Button>
                        {!address.default && (
                          <Button size="sm" variant="outline">Set as Default</Button>
                        )}
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="font-medium mb-2">No saved addresses</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't added any addresses yet.
                  </p>
                  <Button>Add New Address</Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <div className="space-y-8">
              <h2 className="text-xl font-medium">Your Wishlist</h2>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {wishlist.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-square">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-muted-foreground mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => {
                              addToCart(item);
                              toast.success(`${item.name} added to cart`);
                            }}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            className="text-destructive"
                            onClick={() => {
                              removeFromWishlist(item.id);
                              toast.success(`${item.name} removed from wishlist`);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Save items you love to your wishlist.
                  </p>
                  <Button asChild>
                    <Link to="/shop">Explore Products</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-8 max-w-2xl">
              <h2 className="text-xl font-medium">Account Settings</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your orders and products
                    </p>
                  </div>
                  <div>
                    <Button variant="outline">Manage Preferences</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Close Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <div>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Close Account
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
