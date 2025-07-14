import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useSubmitFeedbackMutation } from "../../apis/feedbackApi";

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null); // Numeric values (1-5)
  const [comments, setComments] = useState("");
  const [submitFeedback, { isLoading, isError, isSuccess }] = useSubmitFeedbackMutation();

  // Mapping of rating text to numerical values
  const ratingOptions = [
    { label: "Very good", value: 5 },
    { label: "Good", value: 4 },
    { label: "Average", value: 3 },
    { label: "Bad", value: 2 },
    { label: "Very bad", value: 1 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("rating:", rating);
    
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    console.log("commnet: " ,comments);

    if (!comments.trim()) { // Prevent sending empty comments
      alert("Feedback text is required.");
      return;
    }

    try {
      const feedbackData = { rating, feedbackText: comments.trim() };
      await submitFeedback(feedbackData).unwrap();
      alert("Thank you for your feedback!");
      setRating(null); // Reset state
      setComments("");
      navigate(-1); // Go back
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <motion.div 
        className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <motion.h2 
          className="text-2xl font-bold text-teal-400 mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }}
        >
          Give your feedback here.
        </motion.h2>

        <motion.p 
          className="text-gray-300 mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } }}
        >
          Your opinion matters! Have some ideas to improve our service?
        </motion.p>

        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } }}
          >
            <label className="block font-semibold text-gray-100 mb-2">Your rating:</label>
            <div className="space-y-2">
              {ratingOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center bg-gray-700 p-2 rounded-md cursor-pointer transition ${
                    rating === option.value ? "bg-teal-500" : "hover:bg-teal-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={rating === option.value}
                    onChange={() => setRating(option.value)}
                    className="hidden"
                  />
                  <span className="text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Feedback Text Area */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } }}
          >
            <label className="block font-semibold text-gray-100 mb-2">
              What could we improve?
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your feedback here..."
              className="w-full h-24 border border-gray-500 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </motion.div>

          {/* Display API State Messages */}
          {isLoading && <p className="text-yellow-400">Submitting feedback...</p>}
          {isError && <p className="text-red-400">Error submitting feedback.</p>}
          {isSuccess && <p className="text-green-400">Feedback submitted successfully!</p>}

          {/* Buttons */}
          <div className="flex justify-between mt-5">
            {/* Back Button */}
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Back
            </motion.button>

            {/* Submit Button */}
            <motion.button 
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isLoading} // Disable button while submitting
            >
              {isLoading ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;
