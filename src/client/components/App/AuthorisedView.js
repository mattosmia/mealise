import React, { useState } from 'react';
import Header from '../_Header/AuthHeader';
import Footer from '../_Footer/Footer';


export default function AuthorisedView({ children }) {    
  return (
    <>
      <Header />
      <main className="auth">
      { children }
      </main>
      <Footer isAuth={true} />
    </>
  )
}