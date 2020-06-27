import React from 'react';

import './Landing.scss';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <section className="landing">
        <div className="landing__hero" role="img" aria-label="Image Description">
          <h2>
            Mealise helps you plan your daily meals and provides you with a handy and fully customisable shopping list.<br /><span>Flexible and helpful.<br /><Link to="/register">Sign up now!</Link></span>
          </h2>
        </div>
        <div className="landing__columns">
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Create recipes using your favourite ingredients</div>
          </div>
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Plan your daily meals with your own recipes</div>
          </div>
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Review, edit and save your shopping list for when you need</div>
          </div>
        </div>
      </section>
    </>
  )
}