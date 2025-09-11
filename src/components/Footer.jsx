import React from "react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../index.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">
                    <h2 className="footer-logo">Careera<span>Launch</span></h2>
                    <p>
                        Empowering talent and recruiters with AI-driven tools to
                        build meaningful careers. 🚀
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/#">Careers</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div className="footer-links">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="/#">Blog</a></li>
                        <li><a href="/#">FAQs</a></li>
                        <li><a href="/#">Privacy Policy</a></li>
                        <li><a href="/#">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>Email: <a href="mailto:support@careerlaunch.com">support@careeralaunch.com</a></p>
                    <p>Phone: 123-4567-89</p>
                    <p>Location: India, Ahmedabad</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        <a href="#" aria-label="Twitter / X"><FaXTwitter /></a>
                        <a href="#" aria-label="GitHub"><FaGithub /></a>
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                    </div>


                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <h3>Stay Updated</h3>
                    <p>Subscribe for career tips, updates, and job insights.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                <p>© {year} CareerLaunch. All rights reserved. | This Webapp is made with ❤ by Vishal Soni</p>
            </div>
        </footer>
    );
};

export default Footer;
