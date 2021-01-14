import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/client/Home"
import Rooms from "../pages/client/Rooms";
import BookNow from "../pages/client/BookNow";
//import Checkout from "../pages/Checkout"; todo
import SingleRoom from "../pages/client/SingleRoom";
import Profile from "../pages/client/Profile";
import Error from "../pages/client/Error";

// Components
import Navbar from "../components/client/Navbar"
import Footer from "../components/client/Footer"

export const PublicLayout = (props) => <div>
<Navbar/>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/rooms/" component={Rooms} />
    <Route exact path="/profile/" component={Profile} />
    <Route exact path="/rooms/:id" component={SingleRoom} />
    <Route exact path="/booknow/:id" component={BookNow} /> 
    <Route component={Error} />       
  </Switch>
<Footer/>
</div>