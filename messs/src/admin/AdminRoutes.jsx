import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import MenuPage from "./pages/MenuPage";
import ComplaintsTable from "./pages/ComplaintsTable";
import StudentTable from "./pages/StudentTable";
import FeedbackTable from "./pages/FeedbackTable";

//import PrivateRoute from "../signup/PrivateRoute"; // Assuming this is a custom component
import ViewComplaintDetails from "../admin/pages/ViewDetails";
import GetMenu from "./pages/GetMenu";
import StudentDetails from "./pages/StudentDetails";

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

function AdminRoutes() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (response.status === 401) {
          console.warn("User not authenticated, redirecting to login...");
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.authenticated && data.role) {
          const normalizedRole = data.role.replace("ROLE_", "");
          setIsAuthenticated(true);
          setRole(normalizedRole);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <p className="text-center">Checking authentication...</p>;

  if (!isAuthenticated || role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          {/* All admin routes are wrapped in the PrivateRoute */}
           <Route path="/" element={<AdminDashboard/>}/>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/menu-page" element={<MenuPage />} />
            <Route path="/complaints-table" element={<ComplaintsTable />} />
            <Route path="/student-table" element={<StudentTable />} />
            <Route path="/feedback-table" element={<FeedbackTable />} />
            <Route path="/complaint-resolve/:id" element={<ViewComplaintDetails />} />
            <Route path="/menu" element={<GetMenu />} />
            <Route path="/student-details/:id" element={<StudentDetails />}/>

          
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default AdminRoutes;
