import { configureStore } from "@reduxjs/toolkit";
import { feedbackApi } from "../apis/feedbackApi"; // Import the RTK Query API slice
import { mealApi } from "../apis/mealApi";
import { studentApi } from "../apis/studentApi";
import { complaintApi } from "../apis/complaintApi";
import { duesApi } from "../apis/duesApi";
import { paymentApi } from "../apis/paymentApi";
const store = configureStore({
  reducer: {
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [mealApi.reducerPath]: mealApi.reducer, // ✅ Add meals API reducer
    [studentApi.reducerPath]: studentApi.reducer,
    [complaintApi.reducerPath]: complaintApi.reducer,
    [duesApi.reducerPath]: duesApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedbackApi.middleware,
      mealApi.middleware,
    studentApi.middleware,
  complaintApi.middleware,
  duesApi.middleware,
paymentApi.middleware), // ✅ Add meals API middleware
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
