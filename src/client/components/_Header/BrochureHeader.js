import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './BrochureHeader.scss';

export default function Header() {
  return (
    <header>
        <h1 className="header__logo">
            <span className="vh">Mealise</span>
        </h1>
        <nav id="main-nav">
            <ul>
                <li><Link to="/login" className="nav__cta nav__cta--secondary">Log in</Link></li>
                <li><Link to="/register" className="nav__cta nav__cta--primary">Sign up</Link></li>
            </ul>
        </nav>
    </header>
  )
};