import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 Exchange Platform</p>
      <div className="social-media">
        <a href="#"><FaFacebookF className="fa" /></a>
        <a href="#"><FaXTwitter className="fa" /></a>
        <a href="#"><FaLinkedinIn className="fa" /></a>
      </div>
      <a className="contact" href="#">Contact</a>
    </footer>
  );
};

export default Footer;
