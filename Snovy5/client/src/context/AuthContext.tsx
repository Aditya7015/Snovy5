import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: UserAddress;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
    logout: () => void;
    updateUserProfile: (userData: Partial<User>) => Promise<void>;
    updateUserAddress: (address: UserAddress) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data for demo purposes
const SAMPLE_USERS = [
    {
        id: "user1",
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "password123",
        phone: "(555) 123-4567",
        address: {
            street: "123 Main St",
            city: "Anytown",
            state: "ST",
            postalCode: "12345",
            country: "United States"
        }
    },
    {
        id: "user2",
        email: "jane@example.com",
        firstName: "Jane",
        lastName: "Smith",
        password: "password456",
        phone: "(555) 987-6543",
        address: {
            street: "456 Oak Ave",
            city: "Somewhere",
            state: "ST",
            postalCode: "67890",
            country: "United States"
        }
    }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to parse user from localStorage:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        }
    }, [user, isInitialized]);

    // Login function - in a real app this would call an API
    const login = async (email: string, password: string) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user with matching email and password
        const foundUser = SAMPLE_USERS.find(u =>
            u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = foundUser;

        // Update state
        setUser(userWithoutPassword as User);
        setIsAuthenticated(true);

        return;
    };

    // Register function - in a real app this would call an API
    const register = async (userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string
    }) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if email is already taken
        if (SAMPLE_USERS.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
            throw new Error('Email is already in use');
        }

        // Create new user (in a real app, this would be handled by the backend)
        const newUser: User = {
            id: `user${Date.now()}`,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        };

        // Update state
        setUser(newUser);
        setIsAuthenticated(true);

        return;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    // Update user profile
    const updateUserProfile = async (userData: Partial<User>) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!user) {
            throw new Error('No user is currently authenticated');
        }

        // Update user data
        const updatedUser = {
            ...user,
            ...userData
        };

        setUser(updatedUser);

        return;
    };

    // Update user address
    const updateUserAddress = async (address: UserAddress) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!user) {
            throw new Error('No user is currently authenticated');
        }

        // Update user address
        const updatedUser = {
            ...user,
            address
        };

        setUser(updatedUser);

        return;
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            register,
            logout,
            updateUserProfile,
            updateUserAddress
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};