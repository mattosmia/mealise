import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.scss';

const themeClasses = {
  '/planner': 'in-planner',
  '/meals': 'in-meals',
  '/recipes': 'in-recipes',
  '/ingredients': 'in-ingredients',
  '/shopping-lists': 'in-shoppinglists',
  '/account-settings': 'in-accountsettings'
}

export default function Header() {
  const thisPage = useLocation();

  const toggleMobileNav = () => {
    document.getElementById('main-nav').classList.toggle('show');
  }

  const closeMobileNav = () => {
    document.getElementById('main-nav').classList.remove('show');
  }

  return (
    <header className={`auth ${themeClasses[thisPage.pathname]?themeClasses[thisPage.pathname]:''}`}>
        <h1 className="header__logo">
            <span className="logo-icon" aria-hidden="true"></span>
            <span className="vh">Mealise</span>
            <button className="mobile-nav" onClick={toggleMobileNav}><span className="vh">Main navigation</span></button>
        </h1>
        <nav id="main-nav">
            <ul>
                <li><Link to="/planner" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Planner</Link></li>
                <li><Link to="/meals" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Meals</Link></li>
                <li><Link to="/recipes" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Recipes</Link></li>
                <li><Link to="/ingredients" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Ingredients</Link></li>
                <li><Link to="/shopping-lists" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Shopping lists</Link></li>
                <li><Link to="/account-settings" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Account settings</Link></li>
                <li><Link to="/logout" onClick={closeMobileNav}><span className="nav__icon" aria-hidden="true"></span>Log out</Link></li>
            </ul>
        </nav>
    </header>
  )
};