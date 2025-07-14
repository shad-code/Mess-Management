import React from "react";
import { motion } from "framer-motion";

const Button = ({ text, onClick, type = "primary" }) => {
  const baseClasses = "px-6 py-2 rounded-lg font-semibold transition-all";

  const styles = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
  };

  return (
    <motion.button
      className={`${baseClasses} ${styles[type]}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
