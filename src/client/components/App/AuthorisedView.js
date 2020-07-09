import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../_Header/AuthHeader';
import Footer from '../_Footer/Footer';

import UserContext from '../../helpers/userContext';

export default function AuthorisedView({ children }) {
  const user = useContext(UserContext);
console.log('authview user:',user)
  return (
     <>
      { user ? <>
        <Header />
        <main className="auth">
        { children }
        </main>
        <Footer isAuth={true} />
      </> :
      <Redirect to="/login" />
      }
    </>
  )
}