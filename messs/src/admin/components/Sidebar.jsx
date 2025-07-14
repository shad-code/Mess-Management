import React from "react";
import { FaChartBar, FaUsers, FaUtensils, FaCommentDots, FaPlus, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ onCreateMenu }) => {
  return (
    <aside className="w-64 bg-white p-6 shadow-md min-h-screen">
      <h1 className="text-xl font-bold mb-6">Mess Maven</h1>
      <nav>
        <ul className="space-y-4">
          <li className="text-gray-700 font-semibold flex items-center">
            📊 Dashboard
          </li>
          <li className="text-gray-600 hover:text-black cursor-pointer flex items-center">
            📈 Analytics
          </li>
          <li className="text-gray-600 hover:text-black cursor-pointer flex items-center">
            💬 Feedbacks
            <span className="ml-2 bg-purple-500 text-white px-2 rounded-full">6</span>
          </li>
          <li className="text-gray-600 hover:text-black cursor-pointer flex items-center">
            👨‍🎓 Students
          </li>
          <li className="text-gray-600 hover:text-black cursor-pointer flex items-center">
            ⚠ Complaints
          </li>
          <li
            className="text-gray-600 hover:text-black cursor-pointer flex items-center"
            onClick={onCreateMenu}
          >
            <FaPlus className="mr-2" /> Create Menu
          </li>
        </ul>
      </nav>
      <button className="mt-10 text-red-500 font-bold flex items-center">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
