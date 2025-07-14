import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useGetMealsByDayQuery } from "../../apis/mealApi";

const MessMenu = () => {
  const todayDay = new Date().toLocaleString("en-us", { weekday: "long" }).toUpperCase();
  const { data: meals = [], isLoading, isError } = useGetMealsByDayQuery(todayDay);

  const mealOrder = { BREAKFAST: 1, LUNCH: 2, DINNER: 3 };
  const mealTypes = ["BREAKFAST", "LUNCH", "DINNER"];

  // Sort meals if available
  const sortedMeals = [...meals].sort(
    (a, b) => mealOrder[a.mealType] - mealOrder[b.mealType]
  );

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (isLoading)
    return <div className="text-center text-white mt-10">Loading menu...</div>;

  if (isError)
    return <div className="text-center text-red-400 mt-10">Failed to load menu.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <motion.div
          className="bg-teal-500 text-xl font-bold px-6 py-3 rounded-full shadow-lg mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {formattedDate}
        </motion.div>

        {sortedMeals.length === 0 ? (
          <p className="text-gray-300">No meals available for today.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {mealTypes.map((type, index) => {
              const mealsOfType = sortedMeals.filter(
                (meal) => meal.mealType === type
              );

              return (
                <motion.div
                  key={type}
                  className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg w-80 text-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h2 className="text-xl font-bold text-teal-600 mb-4">{type}</h2>

                  {mealsOfType.length > 0 ? (
                    <>
                      <ul className="text-left text-gray-700 list-disc list-inside">
                        {mealsOfType.map((meal) => (
                          <li key={meal.id}>
                            <strong>{meal.name}</strong> — {meal.description}
                          </li>
                        ))}
                      </ul>
                      
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No {type.toLowerCase()} meal today</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessMenu;
