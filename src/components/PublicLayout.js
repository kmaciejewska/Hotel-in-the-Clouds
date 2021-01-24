import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/client/Home"
import Rooms from "../pages/client/Rooms";
import BookNow from "../pages/client/BookNow";
import SingleRoom from "../pages/client/SingleRoom";
import Profile from "../pages/client/Profile";
import Checkout from "../pages/client/Checkout";
import LoginPage from "../pages/client/LoginPage";
import Error from "../pages/client/Error";

// Components
import Navbar from "../components/client/Navbar"
import Footer from "../components/client/Footer"

export const PublicLayout = (props) => <div>
  <Router>
    <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/rooms">
        <Rooms/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/rooms/:name">
        <SingleRoom/>
      </Route>
      <Route path="/booknow/:name">
        <BookNow/>
      </Route>
      <Route path="/checkout">
        <Checkout/>
      </Route>
      <Route path="/login">
        <LoginPage/>
      </Route>
    </Switch>
    <Footer/>
  </Router>
</div>