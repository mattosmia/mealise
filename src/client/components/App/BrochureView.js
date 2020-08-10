import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../_Footer/Footer';
import Header from '../_Header/BrochureHeader';
import { isAuth } from '../../helpers/auth';
import UserContext from '../../helpers/userContext';
import PageContext from '../../helpers/pageContext';

export default function BrochureView({ children }) {
  const page = useContext(PageContext);
  const user = useContext(UserContext);

  useEffect(() => {
    isAuth()
      .then(res => {
        if (res.data) {
          user.setUser(res.data);
        }
      }).catch(err => {
        // console.log(err)
      }).finally(() => page.setIsLoading(false))
  }, []);

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