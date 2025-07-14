import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAdminComplaintsQuery } from "../../apis/complaintApi";
import Navbar from "../components/Navbar";

const ComplaintsTable = () => {
  const navigate = useNavigate();
  const { data: complaints = [], isLoading, isError, error } = useGetAdminComplaintsQuery();

  const handleViewDetails = (id) => {
    navigate(`/admin/complaint-resolve/${id}`); // ✅ Updated route
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Complaints</h2>

        {isLoading && <p className="text-gray-500">Loading complaints...</p>}
        {isError && <p className="text-red-500">Error: {error?.message || "Failed to load complaints."}</p>}

        {!isLoading && complaints.length === 0 && (
          <p className="text-gray-600 text-sm">No complaints found.</p>
        )}

        {complaints.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">#</th>
                  <th className="border p-3 text-left">Title</th>
                  <th className="border p-3 text-left">Category</th>
                  <th className="border p-3 text-left">Status</th>
                  <th className="border p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{item.title}</td>
                    <td className="border p-3">{item.course || "N/A"}</td>
                    <td className="border p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "RESOLVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        ● {item.status}
                      </span>
                    </td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-gray-500 mt-4 text-sm">
              Showing {complaints.length} complaints
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsTable;
