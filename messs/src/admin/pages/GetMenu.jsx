import React, { useState, useEffect } from "react";
import { useGetMealsByDayQuery } from "../../apis/mealApi";
import Navbar from "../components/Navbar";

// Days of the week enum values (match the backend)
const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const GetMenu = () => {
  const [weeklyMeals, setWeeklyMeals] = useState({});

  // Fetch meals for each day of the week
  useEffect(() => {
    daysOfWeek.forEach((day) => {
      fetchMealsForDay(day);
    });
  }, []);

  // Fetch meals for a specific day
  const fetchMealsForDay = async (day) => {
    try {
      const response = await fetch(
        `http://localhost:8080/meals/student/filter?dayOfWeek=${day}`
      );
      const data = await response.json();
      setWeeklyMeals((prev) => ({ ...prev, [day]: data }));
    } catch (error) {
      console.error(`Error fetching meals for ${day}:`, error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Weekly Mess Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{day}</h3>
              {weeklyMeals[day] ? (
                weeklyMeals[day].length > 0 ? (
                  weeklyMeals[day].map((meal, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="font-semibold">
                        🍽️ {meal.mealType} - <span className="text-gray-700">{meal.time}</span>
                      </p>
                      <p className="text-gray-600 italic">{meal.name}</p>
                      <p className="text-sm text-gray-500 mb-1">
                        {meal.description}
                      </p>
                      {meal.items && meal.items.length > 0 && (
                        <ul className="list-disc ml-6 text-sm">
                          {meal.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No meals planned</p>
                )
              ) : (
                <p className="text-gray-400 italic">Loading...</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetMenu;
