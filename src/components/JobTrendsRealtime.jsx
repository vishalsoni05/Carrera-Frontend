// import React, { useEffect, useMemo, useRef, useState } from 'react';

// const DEFAULT_SKILLS = [
//   { name: 'React.js', demand: 88 },
//   { name: 'Java', demand: 84 },
//   { name: 'Node.js', demand: 79 },
//   { name: 'Python', demand: 92 },
//   { name: 'AWS', demand: 81 },
//   { name: 'Docker', demand: 76 },
//   { name: 'SQL', demand: 73 },
//   { name: 'UI/UX', demand: 69 }
// ];

// function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

// export default function JobTrendsRealtime({ refreshMs = 5000, skills: initial = DEFAULT_SKILLS }) {
//   const [skills, setSkills] = useState(() => initial.map(s => ({ ...s, delta: 0 })));
//   const [paused, setPaused] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const timerRef = useRef(null);

//   // stable random seed per mount so it feels “AI-ish” but not chaotic
//   const rng = useMemo(() => {
//     let x = Date.now() % 2147483647;
//     return () => (x = (x * 48271) % 2147483647);
//   }, []);

//   useEffect(() => {
//     function tick() {
//       setSkills(prev => {
//         const next = prev.map(s => {
//           // small, believable movement
//           const r = rng() % 11; // 0..10
//           const move = r < 4 ? -Math.ceil(r / 2) : Math.ceil(r / 2); // more chance to go up slightly
//           const newDemand = clamp(s.demand + move, 40, 99);
//           return { ...s, demand: newDemand, delta: newDemand - s.demand };
//         });
//         // keep highest demand on top for “live” feel
//         next.sort((a, b) => b.demand - a.demand);
//         return next;
//       });
//       setLastUpdated(new Date());
//     }

//     if (!paused) {
//       timerRef.current = setInterval(tick, refreshMs);
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [paused, refreshMs, rng]);

//   return (
//     <section className="job-trends-widget">
//       <div className="trends-header">
//         <h3 className="trends-title">
//           AI-Powered Job Trends
//           <span className="live-badge" title="Live updating">
//             <span className="live-dot" aria-hidden="true" />
//             Live
//           </span>
//         </h3>

//         <div className="trends-controls">
//           <button
//             type="button"
//             className="trends-btn"
//             onClick={() => setPaused(p => !p)}
//             aria-pressed={paused}
//           >
//             {paused ? 'Resume' : 'Pause'}
//           </button>
//         </div>
//       </div>

//       <div className="skills-list">
//         <ul>
//           {skills.map((s, idx) => {
//             const trend =
//               s.delta > 0 ? 'up' : s.delta < 0 ? 'down' : 'flat';
//             return (
//               <li key={s.name} style={{ animationDelay: `${idx * 90}ms` }}>
//                 <span className="skill-rank">#{idx + 1}</span>
//                 <span style={{ fontWeight: 800 }}>{s.name}</span>
//                 <span className="skill-demand">
//                   {s.demand}%
//                   <span
//                     className={
//                       trend === 'up'
//                         ? 'trend-badge trend-up'
//                         : trend === 'down'
//                         ? 'trend-badge trend-down'
//                         : 'trend-badge trend-flat'
//                     }
//                   >
//                     {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '•'}
//                   </span>
//                 </span>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <div className="trends-meta" aria-live="polite">
//         Updating every {Math.round(refreshMs / 1000)}s • Last updated:{' '}
//         {lastUpdated.toLocaleTimeString()}
//       </div>
//     </section>
//   );
// }
