import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';

import Header from '../_Header/Header';
import Footer from '../_Footer/Footer';
import Planner from '../Planner/Planner';
import Ingredients from '../Ingredients/Ingredients';
import Recipes from '../Recipes/Recipes';
import Meals from '../Meals/Meals';
import ShoppingLists from '../ShoppingLists/ShoppingLists';
import AccountSettings from '../AccountSettings/AccountSettings';
import CookieNotice from '../CookieNotice/CookieNotice';
import Landing from '../Landing/Landing';

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            {/* <Redirect to="/planner" /> */}
            <Landing />
          </Route>
          <Route path="/planner">
            <Planner />
          </Route>
          <Route path="/meals">
            <Meals />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/ingredients">
            <Ingredients />
          </Route>
          <Route path="/shopping-lists">
            <ShoppingLists />
          </Route>
          <Route path="/account-settings">
            <AccountSettings />
          </Route>
        </Switch>
      </main>
      <Footer/>
      <CookieNotice />
    </Router>
  )
}
