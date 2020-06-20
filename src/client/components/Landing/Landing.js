import React from 'react';

import './Landing.scss';

export default function Landing() {
  return (
    <>
      <section className="landing">
        <div className="landing__hero" role="img" aria-label="Image Description">
          <h2>
            Mealise helps you plan your daily meals and provides you with a handy and fully customisable shopping list. Flexible and helpful.  
          </h2>
          <button>
            Sign up
          </button>
        </div>
      </section>
      <section className="landing__columns">
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Create recipes using your favourite ingredients</div>
          </div>
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Plan your daily meals with your own recipes</div>
          </div>
          <div className="landing__columns__column">
            <div className="btn btn--secondary">Review your shopping list and customise it as required</div>
          </div>
      </section>
    </>
  )
}