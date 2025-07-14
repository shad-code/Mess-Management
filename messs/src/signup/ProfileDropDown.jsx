import { useContext, useState, useRef, useEffect } from "react";
//import { UserContext } from "../context/UserContext"; // Import context
import { UserContext } from "./UserContext";
import { FaUserCircle, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const ProfileDropdown = () => {
  const { user } = useContext(UserContext); //Get user data from context
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 cursor-pointer focus:outline-none"
      >
        {user?.profilePic ? (
          <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
        ) : (
          <FaUserCircle className="text-3xl hover:text-gray-200 transition" />
        )}
      </button>

      {showDropdown && user && (
        <div className="absolute right-0 mt-3 w-60 bg-white text-gray-700 shadow-lg rounded-lg p-4 z-50">
          <div className="flex items-center gap-3 mb-4">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full border-2 border-gray-300" />
            ) : (
              <FaUserCircle className="text-4xl text-gray-600" />
            )}
            <div>
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-sm text-gray-400">{user?.role}</p>
            </div>
          </div>

          <NavLink to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
            <FaCog /> Account Settings
          </NavLink>

          <hr className="my-2" />

          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;