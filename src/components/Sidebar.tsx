import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUpload, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="flex items-center mb-6 px-4 py-2 text-lg text-white">
        <FaHome className="mr-3" />
        Home
      </Link>
      <Link to="/upload" className="flex items-center mb-6 px-4 py-2 text-lg text-white">
        <FaUpload className="mr-3" />
        Upload Image
      </Link>
      <Link to="/signin" className="flex items-center mb-6 px-4 py-2 text-lg text-white">
        <FaSignOutAlt className="mr-3" />
        Sign Out
      </Link>
    </div>
  );
};

export default Sidebar;
