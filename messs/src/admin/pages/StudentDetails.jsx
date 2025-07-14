import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProfileByIdQuery } from "../../apis/studentApi";
import Navbar from "../components/Navbar"; // optional if you want the navbar
import { FaArrowLeft } from "react-icons/fa";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: student, isLoading, isError } = useGetProfileByIdQuery(id);

  const handleBack = () => navigate("/admin/student-table");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="text-blue-500 text-lg">Loading student data...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 bg-gray-100 h-screen">
        ❌ Failed to load student data.
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6 text-center text-yellow-600 bg-gray-100 h-screen">
        ⚠️ Student not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Student Profile</h2>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-gray-700">
          <p><strong>Name:</strong> {student.name || "N/A"}</p>
          <p><strong>Email:</strong> {student.email || "N/A"}</p>
          <p><strong>Phone:</strong> {student.phoneNumber || "N/A"}</p>
          <p><strong>Course:</strong> {student.course || "N/A"}</p>
          <p><strong>Hostel:</strong> {student.hostel || "N/A"}</p>
          <p><strong>Payment:</strong> {student.payment || "N/A"}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-2 px-3 py-1 text-sm rounded-full font-semibold ${
              student.status === "Dued"
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-600"
            }`}>
              {student.status}
            </span>
          </p>
          <p className="sm:col-span-2"><strong>Permanent Address:</strong> {student.permanentAddress || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
