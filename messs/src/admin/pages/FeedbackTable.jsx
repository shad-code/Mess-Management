import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useGetAllFeedbackQuery } from "../../apis/feedbackApi";

const FeedbackTable = () => {
  const { data: feedbacks, error, isLoading } = useGetAllFeedbackQuery();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 drop-shadow" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold animate-pulse text-blue-500">Loading feedback...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-500">Error loading feedback</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-200 overflow-hidden">
      {/* Background blur glow circle */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000"></div>

      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto mt-12 backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-2xl border border-white/30"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-indigo-700 mb-6 drop-shadow"
        >
          Student Feedbacks
        </motion.h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
            <thead>
              <motion.tr
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-100 text-indigo-800 font-semibold"
              >
                <th className="border p-3 text-left">#</th>
                <th className="border p-3 text-left">COMMENT</th>
                <th className="border p-3 text-left">RATING</th>
              </motion.tr>
            </thead>
            <tbody>
              {feedbacks?.map((feedback, index) => (
                <motion.tr
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.015 }}
                  className="transition-all bg-white hover:bg-indigo-50 border-b border-gray-200"
                >
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3 text-gray-700">{feedback.feedbackText}</td>
                  <td className="border p-3">
                    <div className="flex gap-1">{renderStars(feedback.rating)}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-gray-600 mt-4 text-center"
        >
          Showing <strong>{feedbacks.length}</strong> feedbacks
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FeedbackTable;
