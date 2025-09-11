import React from "react";
import "../index.css";

function About() {
  return (
    <div className="about-page">

      { /* ========================================
        about page hero section
======================================== */ }
      <section className="about-hero">
        <h1>About <span>Careera</span></h1>
        <p>
          Where dreams meet opportunities. We bridge the gap between talent and 
          top companies with innovation, AI, and a human touch.
        </p>
      </section>

       { /* ========================================
         time lint journey section
======================================== */ }
      <section className="about-journey">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-dot"></span>
            <h3>2020</h3>
            <p>Careera was born with a mission to simplify job hunting.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-dot"></span>
            <h3>2022</h3>
            <p>We integrated AI to recommend personalized jobs instantly.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-dot"></span>
            <h3>2025</h3>
            <p>
              Today, we are trusted by <strong>1000+ companies</strong> and 
              <strong> 50,000+ users</strong> worldwide.
            </p>
          </div>
        </div>
      </section>

      { /* ========================================
          vision and mission section  
======================================== */ }
      <section className="vision-mission">
        <div className="vision">
          <h2>🌍 Our Vision</h2>
          <p>
            To empower every professional with equal access to opportunities 
            through cutting-edge technology.
          </p>
        </div>
        <div className="mission">
          <h2>🚀 Our Mission</h2>
          <p>
            Delivering personalized job matches, insightful career tools, and 
            powerful networking features — all in one place.
          </p>
        </div>
      </section>

       { /* ========================================
            why choose section
======================================== */ }
      <section className="about-surprise">
        <h2>Why Choose Us?</h2>
        <div className="glowing-cards">
          <div className="card">⚡ AI-Powered Job Matches</div>
          <div className="card">🤝 Human + Tech Support</div>
          <div className="card">🌟 Success Stories Everywhere</div>
          <div className="card">💼 Jobs That Truly Fit You</div>
        </div>
      </section>
    </div>
  );
}

export default About;
