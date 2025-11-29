// src/components/AdminProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface AdminProtectedRouteProps {
  children: JSX.Element;
}

export const AdminProtectedRoute = ({
  children,
}: AdminProtectedRouteProps) => {
  const { isAdminAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
};
