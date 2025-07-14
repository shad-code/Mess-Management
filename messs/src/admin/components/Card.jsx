import React from "react";

const Card = ({ icon, title, value, change, note }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
      <div className="text-3xl text-blue-500">{icon}</div>
      <h4 className="text-lg font-semibold mt-2">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-green-500 text-sm">{change}</p>
      <p className="text-gray-500 text-xs">{note}</p>
    </div>
  );
};

export default Card;
