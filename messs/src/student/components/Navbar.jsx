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
          <li><Link to="/student/dashboard" className="hover:text-teal-400">Dashboard</Link></li>
          <li><Link to="/student/profile" className="hover:text-teal-400">Profile</Link></li>
          <li><Link to="/student/mess-menu" className="hover:text-teal-400">Mess Menu</Link></li>
          <li><Link to="/student/feedback" className="hover:text-teal-400">Feedback</Link></li>
          <li><Link to="/student/complaint" className="hover:text-teal-400">Complaint</Link></li>
          
          
        </ul>

        {/* Logout Button */}
        <Link to="/" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
