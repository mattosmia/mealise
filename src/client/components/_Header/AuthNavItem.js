import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function AuthNavItem({ path, name }) {

  const closeMobileNav = () => {
    document.getElementById('main-nav').classList.remove('show');
  }

  return (
     <li><Link to={path} onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>{name}</Link></li>
  )
};