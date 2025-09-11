// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// import "../index.css";

// const JobTrendsWidget = () => {
//   const [skills, setSkills] = useState([]);
//   const [industries, setIndustries] = useState([]);

//   useEffect(() => {
//     // Fake live data generator
//     const fetchData = () => {
//       setSkills([
//         { name: "React", demand: Math.floor(Math.random() * 100) },
//         { name: "Spring Boot", demand: Math.floor(Math.random() * 100) },
//         { name: "Docker", demand: Math.floor(Math.random() * 100) },
//         { name: "AI/ML", demand: Math.floor(Math.random() * 100) },
//         { name: "Cloud (AWS/GCP)", demand: Math.floor(Math.random() * 100) },
//       ]);

//       setIndustries([
//         { name: "IT", growth: Math.floor(Math.random() * 100) },
//         { name: "Healthcare", growth: Math.floor(Math.random() * 100) },
//         { name: "FinTech", growth: Math.floor(Math.random() * 100) },
//         { name: "E-Commerce", growth: Math.floor(Math.random() * 100) },
//         { name: "EdTech", growth: Math.floor(Math.random() * 100) },
//       ]);
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000); // update every 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="job-trends-widget">
//       <h2 className="trends-title">🚀 Real-Time Job Market Trends</h2>

//       {/* Skills Section */}
//       <div className="skills-list">
//         <h3>🔥 Top 5 Skills in Demand</h3>
//         <ul>
//           {skills.map((skill, i) => (
//             <li key={i} style={{ animationDelay: `${i * 0.2}s` }}>
//               <span className="skill-rank">#{i + 1}</span> {skill.name}
//               <span className="skill-demand">📊 {skill.demand}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Industries Chart */}
//       <div className="industries-chart">
//         <h3>📈 Fastest Growing Industries</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={industries} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
//             <XAxis dataKey="name" stroke="#0ff" />
//             <YAxis stroke="#0ff" />
//             <Tooltip
//               cursor={{ fill: "rgba(0,255,255,0.1)" }}
//               contentStyle={{
//                 backgroundColor: "#0a0a1e",
//                 border: "1px solid cyan",
//                 borderRadius: "8px",
//                 color: "#fff",
//               }}
//               formatter={(value) => [`${value}% growth`, "Industry"]}
//             />
//             <Bar dataKey="growth" fill="url(#colorGrowth)" radius={[8, 8, 0, 0]} />
//             <defs>
//               <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#00ffff" stopOpacity={0.9} />
//                 <stop offset="100%" stopColor="#8000ff" stopOpacity={0.6} />
//               </linearGradient>
//             </defs>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// };

// export default JobTrendsWidget;




















import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../index.css";

const JobTrendsWidget = () => {
  const [skills, setSkills] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [ticker, setTicker] = useState("");

  useEffect(() => {

    const fetchData = () => {
      setSkills([
        { name: "React", demand: Math.floor(Math.random() * 100) },
        { name: "Spring Boot", demand: Math.floor(Math.random() * 100) },
        { name: "Docker", demand: Math.floor(Math.random() * 100) },
        { name: "AI/ML", demand: Math.floor(Math.random() * 100) },
        { name: "Cloud (AWS/GCP)", demand: Math.floor(Math.random() * 100) },
      ]);

      setIndustries([
        { name: "IT", growth: Math.floor(Math.random() * 100) },
        { name: "Healthcare", growth: Math.floor(Math.random() * 100) },
        { name: "FinTech", growth: Math.floor(Math.random() * 100) },
        { name: "E-Commerce", growth: Math.floor(Math.random() * 100) },
        { name: "EdTech", growth: Math.floor(Math.random() * 100) },
      ]);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const headlines = [
      "🔥 Software Engineers in demand — 5,200+ new jobs",
      "💼 Data Analysts rising — 3,100 openings",
      "🚀 AI Specialists growing fast — 1,800 new positions",
      "🌐 Cloud Engineers exploding — 2,400+ new jobs",
      "🛡️ Cybersecurity experts critical — 2,000+ positions",
    ];
    let i = 0;
    setTicker(headlines[i]);
    const interval = setInterval(() => {
      i = (i + 1) % headlines.length;
      setTicker(headlines[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="job-trends-widget-section">
    <div className="job-trends-widget">
      <h2 className="trends-title">🚀 Real-Time Job Market Trends</h2>

      {/* Skills Section */}
      <div className="skills-list">
        <h3>🔥 Top 5 Skills in Demand</h3>
        <ul>
          {skills.map((skill, i) => (
            <li key={i}>
              <span className="skill-rank">#{i + 1}</span> {skill.name}
              <span className="skill-demand">📊 {skill.demand}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Industries Chart */}
      <div className="industries-chart">
        <h3>📈 Fastest Growing Industries</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={industries}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="name" stroke="#0ff" />
            <YAxis stroke="#0ff" />
            <Tooltip
              cursor={{ fill: "rgba(0,255,255,0.1)" }}
              contentStyle={{
                backgroundColor: "#0a0a1e",
                border: "1px solid cyan",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}% growth`, "Industry"]}
            />
            <Bar dataKey="growth" fill="url(#colorGrowth)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ffff" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8000ff" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rotating Ticker */}
      <div className="job-ticker-1">
        <p>{ticker}</p>
      </div>
    </div>
    </section>
  );
};

export default JobTrendsWidget;
