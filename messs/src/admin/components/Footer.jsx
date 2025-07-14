import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} Mess Maven. All rights reserved.
      </p>
      <p className="text-xs">
        Designed with ❤️ by Your Team
      </p>
    </footer>
  );
};

export default Footer;
