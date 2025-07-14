import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, content, action }) => {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg text-center shadow-lg"
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,255,255,0.5)" }}
    >
      <h3 className="text-xl text-teal-400">{title}</h3>
      <p className="mt-2 text-gray-300">{content}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
};

export default Card;
