import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetComplaintByIdQuery, useResolveComplaintMutation } from "../../apis/complaintApi"; // Adjust the import path if necessary

const ViewComplaintDetails = () => {
  const { id } = useParams(); // Get the complaint ID from the URL
  const navigate = useNavigate();

  // Fetch complaint details by ID
  const { data: complaint, isLoading, isError, error } = useGetComplaintByIdQuery(id);
  
  // Mutation to resolve the complaint
  const [resolveComplaint] = useResolveComplaintMutation();

  const [resolution, setResolution] = useState("");

  // Handle the submission of resolution
  const handleResolveComplaint = async () => {
    try {
      const response = await resolveComplaint({ complaintId: id, resolution });
      if (response?.data) {
        navigate("/admin/complaints-table"); // Redirect to complaints list page
      }
    } catch (err) {
      console.error("Failed to resolve complaint:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>

        <div className="mb-4">
          <strong>Title:</strong> {complaint?.title}
        </div>
        <div className="mb-4">
          <strong>Description:</strong> {complaint?.description}
        </div>
        <div className="mb-4">
          <strong>Course:</strong> {complaint?.course}
        </div>
        <div className="mb-4">
          <strong>Created At:</strong> {new Date(complaint?.createdAt).toLocaleString()}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {complaint?.status}
        </div>

        <div className="mb-4">
          <label className="block text-sm">Resolution:</label>
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            rows="4"
            className="w-full p-2 bg-gray-200 text-gray-700 border border-gray-300 rounded"
            placeholder="Provide a resolution for the complaint"
          ></textarea>
        </div>

        <button
          onClick={handleResolveComplaint}
          className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Resolve Complaint
        </button>
      </div>
    </div>
  );
};

export default ViewComplaintDetails;
