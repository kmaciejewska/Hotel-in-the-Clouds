import React from "react";
import './App.css';

import Home from "./pages/Home";
import BookNow from "./pages/BookNow"
import Rooms from "./pages/Rooms";
import Profile from "./pages/Profile";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Footer from "./components/Footer"

import { Route, Switch } from
  'react-router-dom'

import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";



function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/checkout/" component={Checkout} />
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/booknow/:slug" component={BookNow} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
