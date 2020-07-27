import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../helpers/userContext';

import './BrochureHeader.scss';

export default function Header() {
  const user = useContext(UserContext);
  return (
    <header>
        <h1 className="header__logo">
            <span className="vh">Mealise</span>
        </h1>
        <nav id="main-nav">
            <ul>
          { user.user && user.user.id ?
              <li><Link to={"/planner"} className="nav__cta nav__cta--secondary">Go back to planner &rarr;</Link></li>
            :
            <>
              <li><Link to="/login" className="nav__cta nav__cta--secondary">Log in</Link></li>
              <li><Link to="/register" className="nav__cta nav__cta--primary">Sign up</Link></li>
            </>
          }
            </ul>
        </nav>
    </header>
  )
};