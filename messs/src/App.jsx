import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use BrowserRouter
import StudentRoutes from "./student/StudentRoutes";
import AdminRoutes from "./admin/AdminRoutes";
import Login from "./signup/Login";
import SignUp from "./signup/SignUp";
import { UserProvider } from "./signup/UserContext";

function App() {
  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter */}
      <UserProvider> {/* Now UserProvider is inside BrowserRouter */}
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="/login" element={<Login />} /> {/* Login is public */}
          <Route path="/signup" element={<SignUp />} /> {/* SignUp is public */}
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
