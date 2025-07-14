import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Card from "./Card";
import { motion } from "framer-motion";
import Button from "./Button";



const Dashboard = () => {
  const [userName, setUserName] = useState("Loading...");
  const [attendance, setAttendance] = useState(85);

  useEffect(() => {
    setTimeout(() => setUserName("Shadan Ahmad"), 1000);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Navbar />

        {/* Welcome Message */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        >
          <h2 className="text-4xl font-bold">Welcome, {userName}!</h2>
        </motion.div>

        {/* Cards Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
          

          <Card
            title="Book Your Meal"
            content="Choose your meal for today"
            action={<Button text="Book Now" type="primary" />}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
