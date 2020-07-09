import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';

import AuthorisedView from './AuthorisedView';
import BrochureView from './BrochureView';

import Landing from '../Landing/Landing';
import AboutUs from '../AboutUs/AboutUs';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';

import Planner from '../Planner/Planner';
import Ingredients from '../Ingredients/Ingredients';
import Recipes from '../Recipes/Recipes';
import Meals from '../Meals/Meals';
import ShoppingLists from '../ShoppingLists/ShoppingLists';
import AccountSettings from '../AccountSettings/AccountSettings';
import CookieNotice from '../CookieNotice/CookieNotice';

import NotFound from '../NotFound/NotFound';

import Spinner from '../Spinner/Spinner';

import { isAuth } from '../../helpers/auth';
import AppProvider from './App.provider';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    isAuth()
      .then(res => setUser(res.data))        
      .finally(() => { setIsLoading(false) })
  }, []);

  return (
    <AppProvider user={user} isLoading={isLoading} setIsLoading={setIsLoading}>
      <Spinner />
      <Router>
          <Switch>
            <Route exact path="/">
              {/* <Redirect to="/planner" /> */}
              <BrochureView><Landing /></BrochureView>
            </Route>
            <Route exact path="/about-us">
              <BrochureView><AboutUs /></BrochureView>
            </Route>
            <Route exact path="/login">
              <BrochureView><Login /></BrochureView>
            </Route>
            <Route exact path="/logout">
              <BrochureView><Logout /></BrochureView>
            </Route>
            <Route exact path="/register">
              <BrochureView><Register /></BrochureView>
            </Route>
            <Route exact path="/planner">
              <AuthorisedView><Planner /></AuthorisedView>
            </Route>
            <Route exact path="/meals">
              <AuthorisedView><Meals /></AuthorisedView>
            </Route>
            <Route exact path="/recipes">
              <AuthorisedView><Recipes /></AuthorisedView>
            </Route>
            <Route exact path="/ingredients">
              <AuthorisedView><Ingredients /></AuthorisedView>
            </Route>
            <Route exact path="/shopping-lists">
              <AuthorisedView><ShoppingLists /></AuthorisedView>
            </Route>
            <Route exact path="/account-settings">
              <AuthorisedView><AccountSettings /></AuthorisedView>
            </Route>
            {/* 404 */}
            <Route>
              <BrochureView><NotFound /></BrochureView>
            </Route>
          </Switch>
        <CookieNotice />
      </Router>
    </AppProvider>
  )
}
