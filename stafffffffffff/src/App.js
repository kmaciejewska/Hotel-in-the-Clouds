
import './App.css';
import React from "react";
import Home from "./pages/Home";
import Housekipping from "./pages/Housekipping";
import Error from "./pages/Error";
import Bookings from "./pages/Bookings";
import {Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';



function App() {
  return (
  <>
  <Navbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/house-kipping/" component={Housekipping} />
    <Route exact path="/bookings/" component={Bookings}/>
    <Route component={Error}/>
  </Switch>
  </>
  );
}
export default App;
 