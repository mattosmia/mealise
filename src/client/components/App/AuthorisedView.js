import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../_Header/AuthHeader';
import Footer from '../_Footer/Footer';

import { isAuth } from '../../helpers/auth';
import UserContext from '../../helpers/userContext';
import PageContext from '../../helpers/pageContext';

export default function AuthorisedView({ children }) {
  const page = useContext(PageContext);
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    isAuth()
      .then(res => {
        if (res.data) {
          user.setUser(res.data);
        } else {
          history.push({
            pathname: "/login"
          })
        }
      }).catch(err => 
        console.log(err)     
      ).finally(() => page.setIsLoading(false))
  }, []);

  return (
     <>
      { user.user && user.user.id && <>
        <Header />
        <main className="auth">
        { children }
        </main>
        <Footer isAuth={true} />
      </>}
    </>
  )
}