import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../_Footer/Footer';
import Header from '../_Header/BrochureHeader';
import PageContext from '../../helpers/pageContext';

export default function BrochureView({ children }) {
  const page = useContext(PageContext);

  useEffect(() => page.setIsLoading(false), []);

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