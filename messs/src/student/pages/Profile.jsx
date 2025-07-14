import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useGetMyProfileQuery } from "../../apis/studentApi"; // ✅ Import RTK hook

const Profile = () => {
  const navigate = useNavigate();
  const { data: student, isLoading, isError } = useGetMyProfileQuery();

  if (isLoading) return <p className="text-white p-4">Loading profile...</p>;
  if (isError) return <p className="text-red-500 p-4">Failed to load profile</p>;

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 p-6 bg-[#112240] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-[#64FFDA] mb-6">Mess Maven</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column (Student Info) */}
          <div className="text-gray-300">
            <p><span className="font-semibold text-white">Name :</span> {student.name}</p>
            <p><span className="font-semibold text-white">Student Id :</span> {student.studentId}</p>
            <p><span className="font-semibold text-white">Course :</span> {student.course}</p>
            <p><span className="font-semibold text-white">Year :</span> {student.year}</p>
            <p><span className="font-semibold text-white">Hostel :</span> {student.hostel}</p>
            <p><span className="font-semibold text-white">Phone :</span> {student.phone}</p>
            <p><span className="font-semibold text-white">Email :</span> {student.email}</p>
            <p><span className="font-semibold text-white">Permanent Address :</span> {student.address}</p>
          </div>

          {/* Right Column (Payment & Status) */}
          <div className="text-gray-300">
            <p>
              <span className="font-semibold text-white">Total amount due: </span>
              <span className="text-[#FFD700] font-bold">{student.payment}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Payment Status: </span>
              <span className="text-[#FF6363] font-bold">{student.status}</span>
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={() => navigate("/student/edit-profile")}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/student/payment-dashboard")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Go to Payment Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
