// src/components/protected/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: ("USER" | "ADMIN")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "Please login to access this page.",
      });
    } else if (!allowedRoles.includes(user.role)) {
      toast({
        title: "Unauthorized",
        description: "You are not allowed to access this page.",
      });
    }
  }, [user, allowedRoles, toast]);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
