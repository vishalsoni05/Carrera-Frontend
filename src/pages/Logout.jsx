import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {

  const navigate = useNavigate();
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    
    localStorage.removeItem("user");
    setUser(null); 

    setMessage("✅ You have been logged out successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  return (
    <div className="logout-page" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
}

export default Logout;
