import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveRole } from "../utils/authUtil";
import "animate.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectRole, setRedirectRole] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials. Please try again.");
      }

      const result = await response.json();
      if (!result.role) {
        throw new Error("Role not found in response.");
      }

      const normalizedRole = result.role.replace("ROLE_", "");
      saveRole(normalizedRole);
      setRedirectRole(normalizedRole);
    } catch (error) {
      console.error("🔺 Login Error:", error);
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (redirectRole) {
      setTimeout(() => {
        switch (redirectRole) {
          case "STUDENT":
            navigate("/student/dashboard", { replace: true });
            break;
          case "ADMIN":
            navigate("/admin/admin-dashboard", { replace: true });
            break;
          default:
            navigate("/login");
        }
      }, 500);
    }
  }, [redirectRole, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white scroll-smooth"
      style={{ backgroundImage: "url('/images/MessMaven.png')" }}
    >
      {/* Navigation Bar */}
      <header className="flex justify-between items-center px-10 py-5 bg-[#0F172A]/80 shadow-md sticky top-0 z-50 backdrop-blur-sm animate__animated animate__fadeInDown">
        <h1 className="text-2xl font-bold text-teal-400">Mess Maven</h1>
        <nav className="space-x-6 text-sm">
          <a href="#home" className="hover:text-teal-400 transition duration-300">
            Home
          </a>
          <a href="/signup" className="text-teal-400 font-semibold">
            SignUp
          </a>
          <a href="#about" className="hover:text-teal-400 transition duration-300">
            About Us
          </a>
          <a href="#contact" className="hover:text-teal-400 transition duration-300">
            Contact
          </a>
        </nav>
      </header>

      {/* Home Section */}
      <section
        id="home"
        className="flex justify-center items-center flex-col md:flex-row gap-10 px-10 py-20 min-h-screen"
      >
        {/* Transparent Login Box */}
        <div className="bg-white/10 text-white w-[350px] p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-white/30 animate__animated animate__zoomIn transition hover:scale-105 duration-500">
          <h2 className="text-3xl font-semibold mb-6 text-center animate__animated animate__fadeInDown">
            Login
          </h2>

          {/* Role Toggle */}
          <div className="flex bg-gray-300 rounded-md mb-5 overflow-hidden">
            {["STUDENT", "ADMIN"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                className={`flex-1 py-2 font-medium transition transform ${
                  formData.role === role
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-3 animate__animated animate__shakeX">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="you@example.com"
              />
              <p className="text-xs text-gray-300 mt-1">
                We'll never share your email.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-medium animate__animated animate__pulse animate__infinite ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 text-white transition hover:scale-105"
              }`}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-300 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="px-10 py-20 bg-black/50 backdrop-blur-sm text-white animate__animated animate__fadeInLeft"
      >
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl leading-relaxed text-gray-200">
          We are Mess Maven, a platform built to simplify and digitize mess
          management. Our mission is to help students and admins manage meals
          effectively, reduce waste, and improve the mess experience across
          hostels and campuses.
        </p>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="px-10 py-20 bg-black/60 backdrop-blur-sm text-white animate__animated animate__fadeInRight"
      >
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="max-w-3xl mb-4 text-gray-300 leading-relaxed">
          Have questions or suggestions? Reach out to us via email or drop by
          our office on campus.
        </p>
        <ul className="space-y-2 text-teal-300">
          <li>Email: messmaven@campus.edu</li>
          <li>Phone: +91 9876543210</li>
          <li>Office: Room 238, Admin Block, MANUU Campus</li>
        </ul>
      </section>
    </div>
  );
};

export default Login;



