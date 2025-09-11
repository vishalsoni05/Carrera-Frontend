import React from "react";
import "../index.css";

const CareerBlog = () => {
  const posts = [
    {
      title: "🔥 Ace Your Next Interview",
      desc: "Top 10 proven strategies to impress recruiters and land your dream role at dream company.",
      link: "#"
    },
    {
      title: "📄 Resume Hacks That Work",
      desc: "Craft a resume that stands out with action verbs, ATS optimization & design tips.",
      link: "#"
    },
    {
      title: "🚀 Career Growth Secrets",
      desc: "Learn how to negotiate salary, get promotions, and accelerate your career through it.",
      link: "#"
    }
  ];

  return (
    <section className="career-blog-section">
      <h2 className="career-blog-title">📚 Career Resources</h2>
      <div className="career-blog-grid">
        {posts.map((post, i) => (
          <div key={i} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <a href={post.link} className="read-more">Read More →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerBlog;
