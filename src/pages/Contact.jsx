import React from "react";
import "./index.css";

function Contact() {
  return (
    <div className="contact-page">

       { /* ========================================
          contact hero section
======================================== */ }
      <section className="contact-hero">
        <h1>Contact <span>Us</span></h1>
        <p>We’d love to hear from you! Let’s create something amazing together.</p>
      </section>

      { /* ========================================
          contact form
======================================== */ }
      <section className="contact-form-section">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" className="glow-btn">Send Message</button>
        </form>
      </section>

       { /* ========================================
          contact details
======================================== */ }
      <section className="contact-details">
        <div className="detail-box">
          <h3>📍 Address</h3>
          <p>7 Career Street, Dream City</p>
        </div>
        <div className="detail-box">
          <h3>📞 Phone</h3>
          <p>+1 234 567 890</p>
        </div>
        <div className="detail-box">
          <h3>📧 Email</h3>
          <p>support@careera.com</p>
        </div>
      </section>

       { /* ========================================
          map section
======================================== */ }
      <section className="map-section">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.4907297672!2d72.25008569347868!3d23.01990207203543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1757505282962!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}

export default Contact;
