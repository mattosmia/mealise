import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../helpers/userContext';

import './BrochureHeader.scss';

export default function Header() {
  const user = useContext(UserContext);
  return (
    <header>
      <h1 className="header__logo">
        <Link to={'/'} className="header__logo__link">
          <span className="vh">Mealise</span>
        </Link>
      </h1>
      <nav id="main-nav">
        <ul>
        { user.user && user.user.id ?
          <li><Link to={"/planner"} className="nav__cta nav__cta--secondary">Back to Planner &rarr;</Link></li>
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