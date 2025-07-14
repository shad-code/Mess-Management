import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useCreateMealMutation } from "../../apis/mealApi";
import { useSelector } from "react-redux"; // Assuming you're using redux for state management

// Sample list of days and meal types
const daysOfWeek = [
  "MONDAY", "TUESDAY", "WEDNESDAY",
  "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
];

const mealTypes = ["BREAKFAST", "LUNCH", "DINNER"];

const getEmptyWeeklyMenu = () =>
  daysOfWeek.reduce((acc, day) => {
    acc[day] = mealTypes.reduce((meals, type) => {
      meals[type] = {
        name: "",
        description: "",
        time: "",
        items: [],
        newItem: "",
      };
      return meals;
    }, {});
    return acc;
  }, {});

const MenuPage = () => {
  const navigate = useNavigate();
  const [createMeal, { isLoading, isError }] = useCreateMealMutation();

  const [selectedDay, setSelectedDay] = useState("MONDAY");
  const [selectedMealType, setSelectedMealType] = useState("BREAKFAST");
  const [weeklyMenu, setWeeklyMenu] = useState(getEmptyWeeklyMenu());

  const [adminId, setAdminId] = useState(1); // You can replace this with actual logic to fetch the admin ID
  
  useEffect(() => {
    // Replace with actual logic to fetch the admin details or user role
    // e.g. fetch user role or ID from Redux store or context
  }, []);

  const handleChange = (field, value) => {
    setWeeklyMenu((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedMealType]: {
          ...prev[selectedDay][selectedMealType],
          [field]: value,
        },
      },
    }));
  };

  const addItem = () => {
    const meal = weeklyMenu[selectedDay][selectedMealType];
    if (meal.newItem.trim()) {
      handleChange("items", [...meal.items, meal.newItem.trim()]);
      handleChange("newItem", "");
    }
  };

  const removeItem = (index) => {
    const meal = weeklyMenu[selectedDay][selectedMealType];
    const updatedItems = meal.items.filter((_, i) => i !== index);
    handleChange("items", updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Loop through all days and meal types
      for (const day of daysOfWeek) {
        for (const mealType of mealTypes) {
          const { name, description, time, items } = weeklyMenu[day][mealType];
          if (!name || !description || !time || items.length === 0) continue;

          const todayIndex = new Date().getDay(); // Sunday = 0
          const targetIndex = daysOfWeek.indexOf(day);
          const offset = (targetIndex - todayIndex + 7) % 7;
          const mealDate = new Date();
          mealDate.setDate(mealDate.getDate() + offset);

          // Submit each meal to the backend with the admin ID
          await createMeal({
            name,
            description,
            mealType,
            dayOfWeek: day,
            time,
            items,
            dateTime: new Date().toISOString(),
            date: mealDate.toISOString().split("T")[0],
            adminId, // Pass the admin ID from state
          }).unwrap(); // .unwrap() will either return the response or throw an error
        }
      }

      alert("Weekly meals submitted successfully!");
      setWeeklyMenu(getEmptyWeeklyMenu()); // Reset the form
      navigate("/admin/menu-page");
    } catch (err) {
      console.error("Error submitting weekly menu:", err);
      alert("Error submitting menu. Please check the console for details.");
    }
  };

  const meal = weeklyMenu[selectedDay][selectedMealType];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Create Weekly Menu</h2>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Day:</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Meal:</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
              >
                {mealTypes.map((meal) => (
                  <option key={meal} value={meal}>{meal}</option>
                ))}
              </select>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">
              {selectedDay} - {selectedMealType}
            </h3>

            <input
              type="text"
              placeholder="Meal Name"
              className="border p-2 rounded w-full mb-3"
              value={meal.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Description"
              className="border p-2 rounded w-full mb-3"
              value={meal.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Time (e.g. 8:00 AM - 10:00 AM)"
              className="border p-2 rounded w-full mb-3"
              value={meal.time}
              onChange={(e) => handleChange("time", e.target.value)}
              required
            />

            <div className="flex mb-3">
              <input
                type="text"
                placeholder="Add item"
                className="border p-2 rounded w-full mr-2"
                value={meal.newItem}
                onChange={(e) => handleChange("newItem", e.target.value)}
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-1 rounded"
                onClick={addItem}
              >
                Add
              </button>
            </div>

            <ul className="list-disc pl-5 space-y-1 mb-4">
              {meal.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  {item}
                  <button
                    type="button"
                    className="text-red-500 text-sm ml-3"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-center mt-6">
              <motion.button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Weekly Menu"}
              </motion.button>
            </div>
          </form>
        </div>

        {isError && (
          <div className="text-center mt-6 text-red-500">
            <p>There was an error submitting the menu. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
