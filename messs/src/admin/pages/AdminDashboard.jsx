import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaUsers, FaUtensils, FaCommentDots } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

          {/* Updated Cards */}
          <div className="grid grid-cols-4 gap-6">
            <Card
              icon={<FaUtensils />}
              title="Total Cancelled Meals"
              value="23"
              
            />
            <Card
              icon={<FaUsers />}
              title="Total Students Registered"
              value="15"
              
            />
            <Card
              icon={<FaChartBar />}
              title="Cancelled Bookings Each Day"
              value="20"
              
            />
            <Card
              icon={<FaCommentDots />}
              title="Feedbacks"
              value="95%"
              
            />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4">
            <Button
              text="Create Menu"
              onClick={() => navigate("/admin/menu-page")}
              variant="primary"
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
