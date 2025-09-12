// import React from 'react';
import heroImg from '../Images/img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { faUserPlus, faMagnifyingGlass, faHandshake, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import {
  faCode, faBrain, faBullhorn, faBox,
  faUsers, faBalanceScale, faHeartbeat, faPalette
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import JobTrendsWidget from "../components/JobTrendsWidget";
import Counter from "../components/Counter";   // ⬅️ add this at top
import SuccessStories from "../components/SuccessStories";
import CareerBlog from "../components/CareerBlog";
import AIJobGenerator from "../components/AIJobGenerator";
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
// import JobTrendsRealtime from '../components/JobTrendsRealtime';


// =======================================
// Company + Logo data (like Success Stories structure)
// =======================================
const marqueeCompanies = [
  {
    company: "",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    company: "",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    company: "",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    company: "",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    company: "",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    company: "",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  },
];
function Home({ aiQuery, setAiQuery, aiOutput, setAiOutput }) {


  const navigate = useNavigate();

  // =======================================
  // this is for card top-job-categories
  // =======================================
  const handleCategoryClick = (category) => {
    // navigate to jobs page with query param
    fetch(`http://localhost:9096/api/jobs/search?category=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        console.log("Jobs in category:", category, data);
        // Later you can update state to display jobs in UI
      })
      .catch(err => console.error("Error fetching jobs:", err));
    navigate(`/jobs?query=${encodeURIComponent(category)}`);
  };


  // =======================================
  // Hero-marquee-logos
  // =======================================
  useEffect(() => {
    const track = document.querySelector(".company-marquee .marquee-track");
    if (track) {
      const clone = track.innerHTML;
      track.innerHTML += clone; // infinite loop
    }
  }, []);

  return (
    // <div className='home-section'>
    <section>


      {/* =======================================
       this is for hero image section with white overlay 
 ======================================= */}
      <div className="hero-section">
        <img src={heroImg} alt="Hero Background" className="hero-image" />

        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Find Your Dream Job,</h1>
            <h1>Effortlessly.</h1>
            <p>Careera connects you with top companies and exciting opportunities</p>
            <p>tailored to your skills and aspirations. Start your journey today.</p>
            <a href="jobs" className="hero-button">Explore Jobs</a>
          </div>
          <div className="company-marquee">
            <div className="marquee-track">
              {marqueeCompanies.map((company, idx) => (
                <div className="marquee-logo" key={idx}>
                  <img
                    src={company.logo}
                    alt={company.company}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span>{company.company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================
       How Carrera Works Section 
 ======================================= */}

      <section className="how-carrera-works">
        <h2 className="how-title">How <span>Carrera</span> Works</h2>

        <div className="how-grid">
          <div className="step">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faUserPlus} className="step-icon" />
            </div>
            <div className="step-content">
              <h3><span className="step-underline">Create</span> Your Profile</h3>
              <p>Build a professional profile highlighting your skills and experience to stand out.</p>
            </div>
          </div>

          <div className="step">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="step-icon" />
            </div>
            <div className="step-content">
              <h3><span className="step-underline">Discover</span> Jobs</h3>
              <p>Explore thousands of curated job listings tailored precisely to your preferences.</p>
            </div>
          </div>

          <div className="step">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faHandshake} className="step-icon" />
            </div>
            <div className="step-content">
              <h3><span className="step-underline">Apply</span> Seamlessly</h3>
              <p>Submit applications with ease using your saved profile and resume in minutes.</p>
            </div>
          </div>

          <div className="step">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faCircleCheck} className="step-icon" />
            </div>
            <div className="step-content">
              <h3><span className="step-underline">Get</span> Hired</h3>
              <p>Connect directly with top companies and land your dream job with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================
       top-job-categories section 
 ======================================= */}

      <section className="top-job-categories">
        <h2 className="categories-title">Explore Top Job Categories</h2>

        <div className="categories-grid">
          {[
            { icon: faCode, title: "Software Development" },
            { icon: faBrain, title: "Data Science" },
            { icon: faBullhorn, title: "Marketing" },
            { icon: faBox, title: "Product Management" },
            { icon: faUsers, title: "Human Resources" },
            { icon: faBalanceScale, title: "Finance & Accounting" },
            { icon: faHeartbeat, title: "Health care" },
            { icon: faPalette, title: "Design & UX" }
          ].map((cat, index) => (
            <Link
              key={index}
              to={`/jobs?query=${encodeURIComponent(cat.title)}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="category-card">
                <div className="icon-circle">
                  <FontAwesomeIcon icon={cat.icon} className="category-icon" />
                </div>
                <h3>{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* =======================================
      COUNTER SECTION for display
 ======================================= */}
      {/* 
<section ref={sectionRef} className="counter-section">
  <div className="counter-container">
    {stats.map((stat, index) => (
      <div key={index} className="counter-item">
        <h2>{counts[index]}+</h2>
        <p>{stat.text}</p>
      </div>
    ))}
  </div>
</section> */}

      <section className="counter-section">
        <div className="counter-container">
          <Counter targetNumber={1000} label="Companies" duration={2000} />
          <Counter targetNumber={50000} label="Users" duration={2000} />
          <Counter targetNumber={10000} label="Jobs" duration={2000} />
          <Counter targetNumber={2000} label="Cups of Coffee" duration={2000} />
        </div>
      </section>

      {/* =======================================
      job trends section
======================================= */}

      <JobTrendsWidget />

      {/* =======================================
     marquee text of trends jon
 ======================================= */}

      <div className="job-ticker">
        <p>
          🔥 Software Engineers in demand — 5,200+ new jobs |
          💼 Data Analysts rising — 3,100 openings |
          🚀 AI Specialists growing fast — 1,800 new positions
        </p>
      </div>

      {/* ========================================
    AI job generator 
======================================== */}

      <AIJobGenerator
        aiQuery={aiQuery}
        setAiQuery={setAiQuery}
        aiOutput={aiOutput}
        setAiOutput={setAiOutput}
      />


      {/* =======================================
            SuccessStories section auto scroll
======================================= */}

      <SuccessStories />

      {/* ========================================
    What our users say section
======================================== */}

      <Testimonials />

      {/* =======================================
            CareerBlog
  ======================================= */}

      <CareerBlog />

      {/* ======================================== 
    Freelancing Section
======================================== */}
      <section className="section section-freelancer">
        <div className="overlay"></div>
        <div className="container">
          <h2>
            I am <span>Available</span> for freelancing
          </h2>
          <p>
            Let’s collaborate on impactful projects — I bring creativity,
            problem-solving, and a passion for delivering results that truly
            make a difference.
          </p>
          <a href="/contact" className="btn">
            HIRE ME
          </a>
        </div>
      </section>

      {/* ========================================
    Footer section 
    ======================================== */}
      <Footer />

      {/* ========================================
     button to go on top
    ======================================== */}

      <ScrollToTopButton />


      {/* ========================================
    extra section job trend uncomment css and jsx to view
    ======================================== */}
      {/* <JobTrendsRealtime /> */}

    </section>
    // </div>
  );
}
export default Home;
