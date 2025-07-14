import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import { useGetMyProfileQuery } from "../../apis/studentApi"; // ✅ RTK Query hook

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: student, isLoading, isError } = useGetMyProfileQuery();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <motion.div 
        className="p-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Loading/Error handling for the name */}
        {isLoading ? (
          <h2 className="text-4xl font-bold">Welcome, Loading...</h2>
        ) : isError ? (
          <h2 className="text-4xl font-bold text-red-400">Welcome, Student!</h2>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <h2 className="text-4xl font-bold">
              Welcome, {student.name} 
            </h2>
            
          </div>
        )}

        <motion.div 
          className="mt-6 flex flex-col md:flex-row gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Attendance Card */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              title="Your Attendance"
              content="85% this month"
              action={
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    text="View Details" 
                    type="secondary" 
                    onClick={() => navigate("/student/attendance-dues")}
                  />
                </motion.div>
              }
            />
          </motion.div>

          
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Dashboard;
