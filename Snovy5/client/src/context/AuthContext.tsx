import React, { createContext, useContext, useState, useEffect } from "react";

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
    isAdmin: boolean;   // ⭐ REQUIRED
    phone?: string;
    address?: UserAddress;
}


interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
    logout: () => void;
    updateUserProfile: (data: Partial<User>) => Promise<void>;
    updateUserAddress: (address: UserAddress) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // const API_BASE = "http://localhost:5000/user";
    const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/user"
    : "https://snovy5-2.onrender.com/user");


    // Load saved user on app start
    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            setUser(JSON.parse(saved));  // FIXED
        }
    }, []);

    const saveUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // ---------------------------
    // LOGIN (BACKEND CONNECTED)
    // ---------------------------
    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");

        // FIX: Save ONLY the user object
        saveUser(data.user);

        // Optional: store token
        localStorage.setItem("token", data.token);
    };

    // ---------------------------
    // REGISTER (BACKEND CONNECTED)
    // ---------------------------
    const register = async (formData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => {
        const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");

        // FIX: Save ONLY the user
        saveUser(data.user);

        localStorage.setItem("token", data.token);
    };

    // LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // UPDATE PROFILE
    const updateUserProfile = async (updated: Partial<User>) => {
        if (!user) throw new Error("No authenticated user");

        const newUser = { ...user, ...updated };
        saveUser(newUser);
    };

    // UPDATE ADDRESS
    const updateUserAddress = async (address: UserAddress) => {
        if (!user) throw new Error("No authenticated user");

        const newUser = { ...user, address };
        saveUser(newUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                updateUserProfile,
                updateUserAddress,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
