import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "aws-amplify";

// Pages
import Home from "../pages/Home"
import Rooms from "../pages/Rooms";
import BookNow from "../pages/BookNow";
//import Checkout from "../pages/Checkout"; todo
import SingleRoom from "../pages/SingleRoom";
import Profile from "../pages/Profile";
import Error from "../pages/Error";

// Components
import Navbar from "./Navbar"
import Footer from "./Footer"

export const PublicLayout = (props) => <div>
<Navbar/>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/rooms/" component={Rooms} />
    <Route exact path="/profile/" component={Profile} />
    <Route exact path="/rooms/:slug" component={SingleRoom} />
    <Route exact path="/booknow/:slug" component={BookNow} /> 
    <Route exact path="/error" component={Error} />       
  </Switch>
<Footer/>
</div>