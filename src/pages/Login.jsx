import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      const message = err.response?.data?.message || "Invalid email or password";
      setError(message);

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Welcome Back 👋</h1>
        <p>
          Ready to continue your journey with <span>Careera</span>?
          Sign in and explore opportunities made just for you.
        </p>
        <img src="/src/Images/login-illustration.svg" alt="Login" />
      </div>

      <div className="auth-right">
        <div className={`auth-card ${isShaking ? "shake" : ""}`}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`auth-btn ${isSuccess ? "success-pulse" : ""}`}
            >
              {isSuccess ? "✔ Success" : "Login"}
            </button>
          </form>
          {error && <p className="error-text">{error}</p>}
          <p className="auth-switch">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
