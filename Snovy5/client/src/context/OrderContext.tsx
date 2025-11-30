import { createContext, useContext, useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

export interface OrderAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  createOrder: (
    items: any[],
    shippingAddress: OrderAddress,
    billingAddress: OrderAddress
  ) => Promise<Order>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getToken = () => localStorage.getItem("token");

  // Fetch user/admin orders from backend
  const fetchOrders = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  // Create COD Order
  const createOrder = async (
    items: any[],
    shippingAddress: OrderAddress,
    billingAddress: OrderAddress
  ) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");

    const mappedItems = items.map((item: any) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: mappedItems,
        shippingAddress,
        billingAddress,
        paymentMethod: "cod",
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Order failed");
    }

    const newOrder = await res.json();
    await fetchOrders();
    return newOrder as Order;
  };

  // Admin: update status
  const updateOrderStatus = async (id: string, status: string) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Update failed");

    await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, fetchOrders, createOrder, updateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
};
