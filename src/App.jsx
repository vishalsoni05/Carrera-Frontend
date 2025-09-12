// App.jsx
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from "./pages/Logout";
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import './index.css';
import Preloader from "./components/Preloader";


function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    if (!window.__scrollPositions) window.__scrollPositions = {};

    const saveScroll = () => {
      window.__scrollPositions[location.pathname] = window.scrollY;
    };

    window.addEventListener("scroll", saveScroll);

    saveScroll();

    return () => {
      window.removeEventListener("scroll", saveScroll);
    };
  }, [location.pathname]);

  useLayoutEffect(() => {
    const y = window.__scrollPositions?.[location.pathname];
    if (typeof y === "number") {
      window.scrollTo(0, y);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });


  return (
     <>
   
    {loading && <Preloader onFinish={() => setLoading(false)} />}

    {!loading && (
    <Router>
      <ScrollRestoration />

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="/src/Images/carrera-high-resolution-logo.png"
            alt="Logo"
            className="navbar-logo"
          />
          <span className="navbar-brand">Careera</span>
        </div>
        {/* Hamburger (for mobile only) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/jobs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>Jobs</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>Contact</NavLink>

          <div className="dropdown">
            <span
              className="nav-link dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user ? `Welcome, ${user.username || user.email} ˅` : "Login➜] ˅"}
            </span>


            {showDropdown && (
              <div className="dropdown-menu">
                {!user && (
                  <NavLink to="/login" className="dropdown-item" onClick={() => setMenuOpen(false)}>Login</NavLink>
                )}
                {user && (
                  <NavLink to="/logout" className="dropdown-item" onClick={() => setMenuOpen(false)}>Logout ➜]</NavLink>
                )}
              </div>
            )}
          </div>

          <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>Register</NavLink>
        </div>

      </nav>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee">
          Welcome to the Careera — Explore jobs, apply easily, and manage your career all in one place.
        </div>
      </div>

      {/* Routes */}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home aiQuery={aiQuery}
            setAiQuery={setAiQuery}
            aiOutput={aiOutput}
            setAiOutput={setAiOutput} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  )}
  </>
  );
  }

export default App;
