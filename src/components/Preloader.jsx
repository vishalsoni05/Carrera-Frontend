// import React, { useEffect } from "react";
// import "../index.css";

// /**
//  * Preloader shows "Careera." letters falling from sky (3D-like) and then calls onFinish.
//  * Usage: <Preloader onFinish={() => setLoading(false)} />
//  */
// const Preloader = ({ onFinish, text = "Careera." }) => {
//   useEffect(() => {
//     // Prevent scrolling while preloader is visible
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     // compute total duration: stagger + animation time + small buffer
//     const letters = text.length;
//     const stagger = 140; // ms per letter (matches CSS animationDelay)
//     const animDur = 900; // ms (matches CSS)
//     const buffer = 300; // extra ms to let last animation settle
//     const total = letters * stagger + animDur + buffer;

//     const t = setTimeout(() => {
//       // restore scroll before notifying parent
//       document.body.style.overflow = prevOverflow || "";
//       if (typeof onFinish === "function") onFinish();
//     }, total);

//     return () => {
//       clearTimeout(t);
//       document.body.style.overflow = prevOverflow || "";
//     };
//   }, [onFinish, text]);

//   return (
//     <div className="preloader-root" aria-hidden="true">
//       <div className="preloader-stage">
//         <div className="preloader-logo" role="img" aria-label={text}>
//           {text.split("").map((ch, i) => (
//             <span key={i} style={{ animationDelay: `${i * 140}ms` }}>
//               {ch}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Preloader;
