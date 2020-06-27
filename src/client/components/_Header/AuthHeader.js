import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import AuthNavItem from './AuthNavItem';

import './Header.scss';

const navItems = [
  {
    path: '/planner',
    name: 'Planner',
    themeCls: 'in-planner'
  },
  {
    path: '/meals',
    name: 'Meals',
    themeCls: 'in-meals'
  },
  {
    path: '/recipes',
    name: 'Recipes',
    themeCls: 'in-recipes'
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    themeCls: 'in-ingredients'
  },  {
    path: '/shopping-lists',
    name: 'Shopping lists',
    themeCls: 'in-shoppinglists'
  },  {
    path: '/account-settings',
    name: 'Account settings',
    themeCls: 'in-accountsettings'
  },  {
    path: '/logout',
    name: 'Log out',
    themeCls: null
  },
]

export default function Header() {
  const thisPage = useLocation();

  const toggleMobileNav = () => {
    document.getElementById('main-nav').classList.toggle('show');
  }

  const selectedNavItem = navItems.find(navItem => navItem.path === thisPage.pathname);

  return (
    <header className={`auth ${selectedNavItem.themeCls || ''}`}>
        <h1 className="header__logo">
          <span className="logo-icon" aria-hidden="true"></span>
          <span className="vh">Mealise</span>
          <button className="mobile-nav" onClick={toggleMobileNav}><span className="vh">Main navigation</span></button>
        </h1>
        <nav id="main-nav">
            <ul>
              { navItems.map((navItem,i) => 
                <AuthNavItem key={i} name={navItem.name} path={navItem.path} />
              )}
            </ul>
        </nav>
    </header>
  )
};