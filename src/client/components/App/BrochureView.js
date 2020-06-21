import React, { useState } from 'react';
import Footer from '../_Footer/Footer';
import Header from '../_Header/BrochureHeader';

export default function BrochureView({ children }) {    
  return (
    <>
      <Header />
      <main>
      { children }
      </main>
      <Footer />
    </>
  )
}