import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import AttendanceDues from "./pages/AttendanceDues";
import PaymentDashboard from "./pages/PaymentDashboard";
import MessMenu from "./pages/MessMenu";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import CancelMeal from "./pages/CancelMeal";
import StudentComplaintForm from "./pages/complaint";
import PaymentComponent from "../payment/componet/PaymentComponent";

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

function StudentRoutes() {
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

  if (!isAuthenticated || role !== "STUDENT") {
    return <Navigate to="/login" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance-dues" element={<AttendanceDues />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/payment-dashboard" element={<PaymentDashboard />} />
          <Route path="/mess-menu" element={<MessMenu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/cancel-meal" element={<CancelMeal />} />
          <Route path="/complaint" element={<StudentComplaintForm/>}/>
          <Route path="/payment" element={<PaymentComponent />}/>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default StudentRoutes;
