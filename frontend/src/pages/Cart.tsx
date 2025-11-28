
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };
  
  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom flex-grow py-16">
          <h1 className="text-3xl font-serif mb-10">Shopping Cart</h1>
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
              Looks like you haven't added anything to your cart yet. 
              Explore our products and find something you love.
            </p>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
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
        <h1 className="text-3xl font-serif mb-10">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Cart items */}
            <div className="border-b pb-1 hidden md:grid md:grid-cols-8 text-sm text-muted-foreground mb-4">
              <div className="md:col-span-4">Product</div>
              <div className="md:col-span-1">Price</div>
              <div className="md:col-span-2">Quantity</div>
              <div className="md:col-span-1 text-right">Total</div>
            </div>
            
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="border-b pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                    {/* Product info */}
                    <div className="md:col-span-4 flex">
                      <div className="w-20 h-20">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.category}
                        </p>
                        <button 
                          className="text-sm text-primary hover:text-primary/80 md:hidden"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-1 flex items-center">
                      <span className="md:hidden text-muted-foreground mr-2">Price:</span>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center">
                      <span className="md:hidden text-muted-foreground mr-2">Quantity:</span>
                      <div className="flex border rounded">
                        <button
                          title="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          title="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total and remove button */}
                    <div className="md:col-span-1 flex justify-between items-center">
                      <span className="md:hidden text-muted-foreground">Total:</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        title="Remove item"
                        className="text-muted-foreground hover:text-primary hidden md:block"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue shopping */}
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            <div className="bg-secondary p-6 rounded">
              <h2 className="font-medium text-lg mb-6">Order Summary</h2>
              
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
                  <div className="text-green-600 text-sm">
                    You've qualified for free shipping!
                  </div>
                )}
                {!showFreeShipping && (
                  <div className="text-sm">
                    Spend ${(50 - cartTotal).toFixed(2)} more to get free shipping
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mb-4" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
                <ArrowRight className="ml-2" size={16} />
              </Button>
              
              <div className="text-sm text-center text-muted-foreground">
                Taxes calculated at checkout
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
