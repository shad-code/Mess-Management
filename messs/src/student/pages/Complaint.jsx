import React, { useState } from "react";
import { useCreateComplaintMutation } from "../../apis/complaintApi";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const StudentComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    course: "General",
    description: "",
  });

  const [createComplaint, { isLoading }] = useCreateComplaintMutation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await createComplaint({
        title: formData.title,
        course: formData.course,
        description: formData.description,
      }).unwrap();
      setSuccess("Complaint submitted successfully!");
      setFormData({ title: "", course: "General", description: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-teal-400 text-center">
            Submit a Complaint
          </h2>

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm mb-3 text-center"
            >
              {success}
            </motion.p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mb-3 text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter complaint title"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Category</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="General">General</option>
              <option value="Food Quality">Food Quality</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Timing">Timing</option>
              <option value="Staff Behaviour">Staff Behaviour</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Write your complaint here..."
            ></textarea>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition duration-200 font-semibold disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Complaint"}
          </motion.button>
        </motion.form>
      </div>
    </>
  );
};

export default StudentComplaintForm;


