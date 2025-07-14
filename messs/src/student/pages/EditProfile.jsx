import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../apis/studentApi"; // ✅ import your RTK query hooks

const EditProfile = () => {
  const navigate = useNavigate();

  // RTK hooks
  const { data: studentData, isLoading } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    studentId: "",
    course: "",
    year: "",
    hostel: "",
    phone: "",
    address: "",
  });

  // Fill the form with fetched student data
  useEffect(() => {
    if (studentData) {
      setUser(studentData);
    }
  }, [studentData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user).unwrap();
      console.log("Updated Profile:", user);
      navigate("/student/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    navigate("/student/profile");
  };

  if (isLoading) return <p className="text-white p-4">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="flex justify-center items-center mt-10">
        <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name" },
              { label: "Email address", name: "email" },
              { label: "Student ID", name: "studentId" },
              { label: "Course", name: "course" },
              { label: "Year", name: "year" },
              { label: "Hostel", name: "hostel" },
              { label: "Phone", name: "phone" },
              { label: "Permanent Address", name: "address" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.label}
                  value={user[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 my-2 rounded bg-gray-700 text-white"
                />
                <p className="text-teal-400 text-sm">{field.label}</p>
              </div>
            ))}

            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
