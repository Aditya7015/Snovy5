import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, User } from './AuthContext';
import { CartItem } from './CartContext';

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

interface PaymentInfo {
    cardNumber?: string;
    cardholderName?: string;
    expiryDate?: string;
    cvv?: string;
    paypalEmail?: string;
}

export interface Order {
    id: string;
    userId: string;
    date: string;
    items: CartItem[];
    total: number;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
    trackingNumber?: string;
    paymentMethod: 'credit-card' | 'paypal';
    paymentInfo?: PaymentInfo;
}

interface OrderContextType {
    orders: Order[];
    getUserOrders: () => Order[];
    getOrderById: (orderId: string) => Order | undefined;
    createOrder: (
        items: CartItem[],
        shippingAddress: OrderAddress,
        billingAddress: OrderAddress,
        paymentMethod: 'credit-card' | 'paypal',
        paymentInfo?: PaymentInfo
    ) => Promise<Order>;
    cancelOrder: (orderId: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load orders from localStorage on mount
    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (error) {
                console.error('Failed to parse orders from localStorage:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    }, [orders, isInitialized]);

    // Get orders for the current user
    const getUserOrders = () => {
        if (!user) return [];
        return orders.filter(order => order.userId === user.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    // Get a specific order by ID
    const getOrderById = (orderId: string) => {
        if (!user) return undefined;
        return orders.find(order => order.id === orderId && order.userId === user.id);
    };

    // Create a new order
    const createOrder = async (
        items: CartItem[],
        shippingAddress: OrderAddress,
        billingAddress: OrderAddress,
        paymentMethod: 'credit-card' | 'paypal',
        paymentInfo?: PaymentInfo
    ) => {
        if (!user) {
            throw new Error('User must be logged in to create an order');
        }

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Calculate order total
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + shippingCost;

        // Create new order
        const newOrder: Order = {
            id: `ORD${Date.now().toString().slice(-8)}`,
            userId: user.id,
            date: new Date().toISOString(),
            items: [...items],
            total,
            shippingAddress,
            billingAddress,
            status: 'processing',
            paymentMethod,
            paymentInfo: paymentMethod === 'credit-card' ? {
                // Store only last 4 digits of card number for security
                cardNumber: paymentInfo?.cardNumber ?
                    `**** **** **** ${paymentInfo.cardNumber.slice(-4)}` :
                    undefined,
                cardholderName: paymentInfo?.cardholderName,
                expiryDate: paymentInfo?.expiryDate,
            } : {
                paypalEmail: user.email
            }
        };

        // Update orders state
        setOrders(prev => [...prev, newOrder]);

        return newOrder;
    };

    // Cancel an order
    const cancelOrder = async (orderId: string) => {
        if (!user) {
            throw new Error('User must be logged in to cancel an order');
        }

        const orderToCancel = orders.find(
            order => order.id === orderId && order.userId === user.id
        );

        if (!orderToCancel) {
            throw new Error('Order not found');
        }

        if (orderToCancel.status === 'shipped' || orderToCancel.status === 'delivered') {
            throw new Error('Cannot cancel an order that has already been shipped or delivered');
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update order status
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: 'canceled' } : order
        ));
    };

    return (
        <OrderContext.Provider value={{
            orders,
            getUserOrders,
            getOrderById,
            createOrder,
            cancelOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};