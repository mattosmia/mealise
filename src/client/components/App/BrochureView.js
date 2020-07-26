import React from 'react';
import PropTypes from 'prop-types';
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

BrochureView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired
}