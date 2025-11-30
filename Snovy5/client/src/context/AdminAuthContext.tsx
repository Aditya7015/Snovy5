// // src/context/AdminAuthContext.tsx
// import React, { createContext, useContext, useEffect, useState } from "react";

// interface AdminUser {
//   email: string;
//   name: string;
// }

// interface AdminAuthContextType {
//   admin: AdminUser | null;
//   isAdminAuthenticated: boolean;
//   loginAdmin: (email: string, password: string) => Promise<void>;
//   logoutAdmin: () => void;
// }

// const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
//   undefined
// );

// // Demo admin credentials (can be moved to .env when backend is ready)
// const ADMIN_CREDENTIALS = {
//   email: "admin@snovy.com",
//   password: "admin12345",
//   name: "Snovy Admin",
// };

// export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [admin, setAdmin] = useState<AdminUser | null>(null);
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     const savedAdmin = localStorage.getItem("snovy_admin");
//     if (savedAdmin) {
//       try {
//         setAdmin(JSON.parse(savedAdmin));
//       } catch (err) {
//         console.error("Failed to parse admin from localStorage:", err);
//         setAdmin(null);
//       }
//     }
//     setIsInitialized(true);
//   }, []);

//   useEffect(() => {
//     if (!isInitialized) return;
//     if (admin) {
//       localStorage.setItem("snovy_admin", JSON.stringify(admin));
//     } else {
//       localStorage.removeItem("snovy_admin");
//     }
//   }, [admin, isInitialized]);

//   const loginAdmin = async (email: string, password: string) => {
//     // In future this will call backend
//     if (
//       email === ADMIN_CREDENTIALS.email &&
//       password === ADMIN_CREDENTIALS.password
//     ) {
//       setAdmin({ email, name: ADMIN_CREDENTIALS.name });
//       return;
//     }
//     throw new Error("Invalid admin credentials");
//   };

//   const logoutAdmin = () => {
//     setAdmin(null);
//   };

//   return (
//     <AdminAuthContext.Provider
//       value={{
//         admin,
//         isAdminAuthenticated: !!admin,
//         loginAdmin,
//         logoutAdmin,
//       }}
//     >
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };

// export const useAdminAuth = () => {
//   const ctx = useContext(AdminAuthContext);
//   if (!ctx) {
//     throw new Error("useAdminAuth must be used within AdminAuthProvider");
//   }
//   return ctx;
// };




// src/context/AdminAuthContext.tsx
// src/context/AdminAuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved session
  useEffect(() => {
    const savedAdmin = localStorage.getItem("snovy_admin");
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch {
        setAdmin(null);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save admin session
  useEffect(() => {
    if (!isInitialized) return;
    if (admin) {
      localStorage.setItem("snovy_admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("snovy_admin");
    }
  }, [admin, isInitialized]);

  const loginAdmin = async (email: string, password: string) => {
    try {
      // Correct backend route
      const res = await api.post("/user/login", { email, password });

      const { token, user } = res.data;

      if (!user?.isAdmin) {
        throw new Error("You are not an Admin!");
      }

      const adminUser: AdminUser = {
        id: user._id,
        email: user.email,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        isAdmin: true,
      };

      localStorage.setItem("admin_token", token);
      setAdmin(adminUser);
    } catch (err: any) {
      const message =
        err.response?.data?.error || err.message || "Admin login failed";
      throw new Error(message);
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("snovy_admin");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAdminAuthenticated: !!admin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
