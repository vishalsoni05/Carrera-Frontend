import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (response.ok) {
      setIsSuccess(true);
      setFormData({ username: "", email: "", password: "" });

      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(result.message || result || "Registration failed.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  } catch (err) {
    console.error("Error:", err);
    setError("Something went wrong.");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Create Account ✨</h1>
        <p>
          Join thousands of dreamers who found success with <span>Careera</span>.  
          Let’s build your future together.
        </p>
        <img src="/src/Images/register-illustration.svg" alt="Register" />
      </div>

      <div className="auth-right">
        <div className={`auth-card ${isShaking ? "shake" : ""}`}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`auth-btn ${isSuccess ? "success-pulse" : ""}`}
            >
              {isSuccess ? "🎉 Registered" : "Register"}
            </button>
          </form>
          {error && <p className="error-text">{error}</p>}
          <p className="auth-switch">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
