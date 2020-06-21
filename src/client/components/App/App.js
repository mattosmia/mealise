import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';

import Planner from '../Planner/Planner';
import Ingredients from '../Ingredients/Ingredients';
import Recipes from '../Recipes/Recipes';
import Meals from '../Meals/Meals';
import ShoppingLists from '../ShoppingLists/ShoppingLists';
import AccountSettings from '../AccountSettings/AccountSettings';
import CookieNotice from '../CookieNotice/CookieNotice';
import Landing from '../Landing/Landing';
import AuthorisedView from './AuthorisedView';
import BrochureView from './BrochureView';
import NotFound from '../NotFound/NotFound';

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {/* <Redirect to="/planner" /> */}
            <BrochureView><Landing /></BrochureView>
          </Route>
          <Route path="/planner">
            <AuthorisedView><Planner /></AuthorisedView>
          </Route>
          <Route path="/meals">
            <AuthorisedView><Meals /></AuthorisedView>
          </Route>
          <Route path="/recipes">
            <AuthorisedView><Recipes /></AuthorisedView>
          </Route>
          <Route path="/ingredients">
            <AuthorisedView><Ingredients /></AuthorisedView>
          </Route>
          <Route path="/shopping-lists">
            <AuthorisedView><ShoppingLists /></AuthorisedView>
          </Route>
          <Route path="/account-settings">
            <AuthorisedView><AccountSettings /></AuthorisedView>
          </Route>
					{/* 404 */}
					<Route>
            <BrochureView><NotFound /></BrochureView>
          </Route>
        </Switch>
      <CookieNotice />
    </Router>
  )
}
