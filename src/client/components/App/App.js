import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';

import Header from '../authenticated/_Header/Header';
import Footer from '../authenticated/_Footer/Footer';
import Planner from '../authenticated/Planner/Planner';
import Ingredients from '../authenticated/Ingredients/Ingredients';
import Recipes from '../authenticated/Recipes/Recipes';
import Meals from '../authenticated/Meals/Meals';
import ShoppingLists from '../authenticated/ShoppingLists/ShoppingLists';
import AccountSettings from '../authenticated/AccountSettings/AccountSettings';

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/planner" />
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
    </Router>
  )
}
