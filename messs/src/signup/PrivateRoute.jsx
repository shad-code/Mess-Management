import { useState, useEffect } from "react";  // ✅ Add this
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:8080/auth/check", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      if (data.authenticated && allowedRoles.includes(data.role)) {
        setIsAuthenticated(true);
        setRole(data.role);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;  // Render child routes (the protected routes)
};

export default PrivateRoute;
