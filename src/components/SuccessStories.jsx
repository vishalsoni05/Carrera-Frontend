import React, { useEffect, useRef, useState } from "react";
import "../index.css";

const SuccessStories = () => {
  const stories = [
    {
      name: "Sarah Johnson",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
      job: "Frontend Engineer",
      company: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
      name: "David Lee",
      photo: "https://randomuser.me/api/portraits/men/36.jpg",
      job: "Data Scientist",
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    },
    {
      name: "Emily Carter",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      job: "UI/UX Designer",
      company: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
    },
    {
      name: "James Brown",
      photo: "https://randomuser.me/api/portraits/men/72.jpg",
      job: "AI Researcher",
      company: "OpenAI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    }
  ];

  const timelineRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const scrollAmountRef = useRef(0); 

  useEffect(() => {
    const timeline = timelineRef.current;

    const scroll = () => {
      if (timeline && !paused) {
        scrollAmountRef.current += 1;
        if (scrollAmountRef.current >= timeline.scrollHeight / 2) {
          scrollAmountRef.current = 0;
        }
        timeline.scrollTop = scrollAmountRef.current;
      }
    };

    const interval = setInterval(scroll, 40);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="success-stories-section">
      <div className="success-stories">
      <h2>Success Stories</h2>

      <div
        className="timeline-scroll"
        ref={timelineRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {[...stories, ...stories].map((s, i) => (

            <div key={i} className="story-item">

            <img src={s.photo} alt={s.name} className="story-photo" />
            <div className="story-content">
              <h3>{s.name}</h3>
              <p>{s.job}</p>
              <div className="story-company">
                <img src={s.logo} alt={s.company} className="company-logo" />
                <span>{s.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="next-text">👑 You Could Be Next!</h3>
      </div>
    </section>
  );
};

export default SuccessStories;
