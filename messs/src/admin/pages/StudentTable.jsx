import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../apis/studentApi"; // Import the hook to fetch students

const StudentTable = () => {
  const [searchName, setSearchName] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const navigate = useNavigate(); // ✅ Initialize

  // Fetch students from the backend
  const { data: students = [], isLoading, error } = useGetAllStudentsQuery();

  // Filter the students based on search name and course
  const filteredData = students.filter(student => 
    student.name && student.name.toLowerCase().includes(searchName.toLowerCase()) &&
    student.course && student.course.toLowerCase().includes(searchCourse.toLowerCase())
  );

  // Handle navigation to student details page
  const handleViewDetails = (id) => {
    navigate(`/admin/student-details/${id}`); // ✅ Navigate to dynamic route
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading students!</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Students</h2>

        {/* Search Filters */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            className="p-2 border border-gray-300 rounded-md w-1/2"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Course"
            className="p-2 border border-gray-300 rounded-md w-1/2"
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">NAME</th>
                <th className="border p-3 text-left">COURSE</th>
                <th className="border p-3 text-left">HOSTEL</th>
                <th className="border p-3 text-left">PAYMENT</th>
                <th className="border p-3 text-left">STATUS</th>
                <th className="border p-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.course}</td>
                  <td className="border p-3">{student.hostel}</td>
                  <td className="border p-3">{student.payment}</td>
                  <td className="border p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      student.status === "Dued" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
                    }`}>
                      ● {student.status}
                    </span>
                  </td>
                  <td className="border p-3">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                      onClick={() => handleViewDetails(student.id)} // ✅ trigger navigation
                    >
                      <FaEye /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-500 mt-4 text-sm">
          Showing {filteredData.length} items out of {students.length} results found
        </p>
      </div>
    </div>
  );
};

export default StudentTable;


