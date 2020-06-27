import React from 'react';
import { Link } from 'react-router-dom';

import './AboutUs.scss';

export default function AboutUs() {
  return (
    <section className="about-us">
      <h1>About Us</h1>
      <p>At Mealise, we understand the importance of preparing wholesome nutricious meals for all the family in the pressure cooker that is modern living. We believe "Fail to plan" equals "Plan to fail". We established Mealise to help today's busy family plan the ingredients needed to make the week's meals without waste. Use our Planner to see all meals displayed on your personalised calendar. You can plan and reuse the meals you create. The aim here is to cut down on wasted ingredients and coordinate what is needed to reduce, reuse and recycle so you maximise your time to do what matters. As you shop for your ingredients you can tick each item needed off your shopping list. Families crave routine - once you get into your Mealise routine it will help you to avoid eating junk and avoid mismatched ingredients expiring. The flexibility of our Planner ensures you can move meals around based on your changing family demands. We hope to help reduce kiddie arguments - staring into the cupboard shouting: "What's for dinner?" Get the kids involved in meal planning too and teach them the importance of healthy eating.</p>
      <p><Link to="/contact-us">We look forward to your suggestions to help Mealise to improve</Link> - your feedback is vital in making Mealise a success.</p>
      <p>Thank you,<br />
      Camila Mattos<br />
      Founder of Mealise</p>
    </section>
  )
}