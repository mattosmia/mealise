import React, { Suspense, lazy, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import AppProvider from './App.provider';

import CookieNotice from '../CookieNotice/CookieNotice';
import Spinner from '../Spinner/Spinner';

const AuthorisedView = lazy(() => import('./AuthorisedView'));
const BrochureView = lazy(() => import('./BrochureView'));

const Landing = lazy(() => import('../Landing/Landing'));
const AboutUs = lazy(() => import('../AboutUs/AboutUs'));

const Register = lazy(() => import('../Register/Register'));
const Login = lazy(() => import('../Login/Login'));
const Logout = lazy(() => import('../Logout/Logout'));

const Planner = lazy(() => import('../Planner/Planner'));
const Ingredients = lazy(() => import('../Ingredients/Ingredients'));
const Recipes = lazy(() => import('../Recipes/Recipes'));
const Meals = lazy(() => import('../Meals/Meals'));
const ShoppingLists = lazy(() => import('../ShoppingLists/ShoppingLists'));
const AccountSettings = lazy(() => import('../AccountSettings/AccountSettings'));

const ResetPassword = lazy(() => import('../ResetPassword/ResetPassword'));
const ForgotPassword = lazy(() => import('../ForgotPassword/ForgotPassword'));
const ContactUs = lazy(() => import('../ContactUs/ContactUs'));
const TermsConditions = lazy(() => import('../Policies/TermsConditions'));
const PrivacyPolicy = lazy(() => import('../Policies/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('../Policies/CookiePolicy'));
const NotFound = lazy(() => import('../NotFound/NotFound'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  return (
    <AppProvider user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}>
      
      <Suspense fallback={<Spinner />}>
      <Spinner />
      <Router>
          <Switch>
            <Route exact path="/">
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
            <Route exact path="/forgot-password">
              <BrochureView><ForgotPassword /></BrochureView>
            </Route>
            <Route exact path="/contact-us">
              <BrochureView><ContactUs /></BrochureView>
            </Route>
            <Route exact path="/terms-conditions">
              <BrochureView><TermsConditions /></BrochureView>
            </Route>
            <Route exact path="/privacy-policy">
              <BrochureView><PrivacyPolicy /></BrochureView>
            </Route>
            <Route exact path="/cookie-policy">
              <BrochureView><CookiePolicy /></BrochureView>
            </Route>
            <Route exact path="/reset-password/:token" render={(props) => 
              <BrochureView><ResetPassword {...props} /></BrochureView>}>
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
      </Suspense>
    </AppProvider>
  )
}
