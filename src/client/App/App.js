import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import Header from '../components/authenticated/_Header/Header';
import Footer from '../components/authenticated/_Footer/Footer';
import Planner from '../components/authenticated/Planner/Planner';
import Ingredients from '../components/authenticated/Ingredients/Ingredients';
import Recipes from '../components/authenticated/Recipes/Recipes';
import Meals from '../components/authenticated/Meals/Meals';
import ShoppingLists from '../components/authenticated/ShoppingLists/ShoppingLists';
import AccountSettings from '../components/authenticated/AccountSettings/AccountSettings';

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
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
