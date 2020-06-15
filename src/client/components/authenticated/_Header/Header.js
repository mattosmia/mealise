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
  return (
    <header className={themeClasses[thisPage.pathname] || null}>
        <h1 className="header__logo">
            <span className="nav__icon" aria-hidden="true"></span>
            <span className="vh">Mealise</span>
        </h1>
        <nav>
            <ul>
                <li><Link to="/planner"><span className="nav__icon" aria-hidden="true"></span>Planner</Link></li>
                <li><Link to="/meals"><span className="nav__icon" aria-hidden="true"></span>Meals</Link></li>
                <li><Link to="/recipes"><span className="nav__icon" aria-hidden="true"></span>Recipes</Link></li>
                <li><Link to="/ingredients"><span className="nav__icon" aria-hidden="true"></span>Ingredients</Link></li>
                <li><Link to="/shopping-lists"><span className="nav__icon" aria-hidden="true"></span>Shopping lists</Link></li>
                <li><Link to="/account-settings"><span className="nav__icon" aria-hidden="true"></span>Account settings</Link></li>
                <li><Link to="/logout"><span className="nav__icon" aria-hidden="true"></span>Log out</Link></li>
            </ul>
        </nav>
    </header>
  )
};