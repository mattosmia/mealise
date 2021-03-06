import React from 'react';

import './Landing.scss';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <section className="landing">
        <div className="landing__hero" role="img" aria-label="Image Description">
          <h2>
            <span>
              Mealise helps you plan your daily meals and provides you with a handy and fully customisable shopping list.<br />
              <span className="sub">Flexible and helpful.<br /><Link to="/register">Sign up now!</Link></span>
            </span>
          </h2>
          <a href="#benefits" className="landing__hero__arrow">
            <span className="vh">Continue to see how Mealise can help you</span>
          </a>
        </div>
        <a id="benefits" className="landing__anchor"></a>
        <div className="landing__columns">
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Create recipes using your favourite ingredients</div>
          </div>
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Plan your daily meals with your own recipes</div>
          </div>
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Review, edit and save your shopping list for later</div>
          </div>
        </div>
      </section>
    </>
  )
}