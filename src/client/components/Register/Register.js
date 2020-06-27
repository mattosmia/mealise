import React from 'react';
import { Link } from 'react-router-dom';

import './Register.scss';

export default function Register() {
  return (
      <section className="register">
        <h1>Sign up</h1>
        <label>
          <span>First name</span>
          <input type="text" name="first_name"/>
        </label>
        <label>
          <span>Last name</span>
          <input type="text" name="last_name"/>
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email"/>
        </label>
        <label>
          <span>Email confirmation</span>
          <input type="email" name="email_confirmation"/>
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password"/>
        </label>
        <label>
          <span>Password confirmation</span>
          <input type="password" name="password_confirmation"/>
        </label>
        <label>
          <span>I confirm that I am over 18 years of age</span>
          <input type="checkbox" name="accept_over18"/>
        </label>
        <label>
          <span>I have read and accept the Terms & Conditions</span>
          <input type="checkbox" name="accept_terms"/>
        </label>
        <p>Read our <Link to="/terms-conditions">Terms & Conditions</Link> here</p>
        <label>
          <span>I would like to receive emails with promotions and other communications from Mealise</span>
          <input type="checkbox" name="accept_mkt"/>
        </label>
        <button>Sign up</button>
      </section>
  )
}