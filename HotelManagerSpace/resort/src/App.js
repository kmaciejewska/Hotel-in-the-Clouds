import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Statistics from "./pages/Statistics";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";
import Error from "./pages/Error";
import Notifications from "./pages/Notifications";
import Finances from "./pages/Finances";

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
  <>
  <Navbar></Navbar>
  <Switch>
  <Route exact path="/" component={Home}/>
  <Route exact path="/rooms/" component={Rooms}/>
  <Route exact path="/statistics/" component={Statistics}/>
  <Route exact path="/payments/" component={Payments}/>
  <Route exact path="/reviews/" component={Reviews}/>
  <Route exact path="/notifications/" component={Notifications}/>
  <Route exact path="/finances/" component={Finances}/>
  <Route component={Error}/>
  </Switch>
  </>
  );
}

export default App;
