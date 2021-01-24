import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/client/Home"
import Rooms from "../pages/client/Rooms";
import BookNow from "../pages/client/BookNow";
import SingleRoom from "../pages/client/SingleRoom";
import Profile from "../pages/client/Profile";
import Checkout from "../pages/client/Checkout";
import Error from "../pages/client/Error";

// Components
import Navbar from "../components/client/Navbar"
import Footer from "../components/client/Footer"

export const PublicLayout = () => <>
<Navbar/>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/rooms" component={Rooms} />
    <Route exact path="/profile/" component={Profile} />
    <Route exact path="/rooms/:name" component={SingleRoom} />
    <Route exact path="/booknow/:name" component={BookNow} />  
    <Route exact path="/checkout/" component={Checkout} />  
  </Switch>
<Footer/>
</>