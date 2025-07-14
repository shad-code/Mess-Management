import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Mess Maven</h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/admin/admin-dashboard" className="hover:text-teal-400">Dashboard</Link></li>
          <li><Link to="/admin/feedback-table" className="hover:text-teal-400">Feedbacks</Link></li>
          <li><Link to="/admin/student-table" className="hover:text-teal-400">Students</Link></li>
          <li><Link to="/admin/complaints-table" className="hover:text-teal-400">Complaints</Link></li>
          <li><Link to="/admin/menu" className="hover:text-teal-400">Menu</Link></li>
        </ul>

        {/* Logout Button */}
        <Link to="/" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
