import React from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';

export default function Login() {
  return (
      <section className="login">
        <h1>Log in</h1>
        <label>
            <span>Email</span>
            <input type="email" name="email"/>
        </label>
        <label>
            <span>Password</span>
            <input type="password" name="password"/>
        </label>
        <button>Log in</button>
      </section>
  )
}