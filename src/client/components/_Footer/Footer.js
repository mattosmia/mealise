import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
  return (
    <footer>
      <ul>
        <li><Link to="/about-us">About us</Link></li>
        <li><Link to="/terms-conditions">Terms & conditions</Link></li>
        <li><Link to="/privacy-policy">Privacy policy</Link></li>
        <li><Link to="/cookie-policy">Cookie policy</Link></li>
        <li><Link to="/contact-us">Contact us</Link></li>
      </ul> 
    </footer>
  )
}