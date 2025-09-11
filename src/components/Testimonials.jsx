import React, { useEffect, useState } from "react";
import "../index.css";

const testimonials = [
  {
    text: "This platform completely changed my job search journey. Within just a few weeks, I was able to connect with multiple recruiters, get interview calls, and eventually land a position I genuinely love. The whole process felt smooth, transparent, and way less stressful than other platforms I tried before.",
    name: "Sarah Johnson",
    role: "Frontend Engineer",
    img: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    text: "I have used countless career websites, but nothing comes close to this one. The AI-driven suggestions saved me hours of searching, and the resume-matching tool gave me confidence that my application was actually seen. I recommend it to anyone who is serious about their career growth.",
    name: "David Lee",
    role: "Data Scientist",
    img: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    text: "Finding remote opportunities has always been a struggle, but this website made it effortless. I was able to filter roles based on my exact preferences, and within days I had multiple offers. It’s professional, well designed, and feels like it was made for modern job seekers like me.",
    name: "Emily Carter",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    text: "The speed and quality of connections I made here were unmatched. I had been applying for months elsewhere without much luck, but within a week on this platform, I was already in interviews. The user interface is clean, fast, and feels trustworthy. Easily the best experience I’ve had.",
    name: "James Brown",
    role: "AI Researcher",
    img: "https://randomuser.me/api/portraits/men/72.jpg"
  },
  {
    text: "As someone who has been both a job seeker and a recruiter, I can confidently say this website gets it right on both sides. It makes it easier to showcase talent and also to find it. The balance it creates between recruiters and candidates is refreshing and effective.",
    name: "Sophia Martinez",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    text: "I transitioned into Data Science and needed a platform that would highlight my transferable skills. This one not only helped me refine my resume but also connected me with recruiters who valued my experience. I honestly think I wouldn’t have landed my current role without it.",
    name: "Michael Chen",
    role: "ML Engineer",
    img: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    text: "Recruiting can be time-consuming, but here I was able to find qualified candidates in record time. The AI matching feature made my job significantly easier, and the profiles were detailed and accurate. I’ve already recommended it to several colleagues in HR who are facing similar challenges.",
    name: "Olivia Davis",
    role: "Recruiter",
    img: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    text: "This platform is a real game-changer. It feels like the creators actually understand the pain points of both job seekers and recruiters. The modern design, intuitive navigation, and powerful tools make it my go-to recommendation for anyone frustrated with outdated and clunky job boards.",
    name: "Ethan Wilson",
    role: "HR Specialist",
    img: "https://randomuser.me/api/portraits/men/18.jpg"
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalDots = isMobile ? testimonials.length : testimonials.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalDots);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalDots]);

  const goTo = (i) => setIndex(i);

  return (
    <section className="section-testimonials">
      <div className="container">
        <h2 className="common-heading">What Our Users Say</h2>

        <div className="carousel">
          <div
            className="carousel-track"
            style={{
              transform: isMobile
                ? `translateX(-${index * 100}%)`
                : `translateX(-${index * (100 / 2)}%)`,
              transition: "transform 0.6s ease-in-out",
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">“{t.text}”</p>
                <div className="testimonial-user">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: totalDots }).map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => goTo(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
