import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "aws-amplify";

//layouts
import ProtectedLayout from "./components/ProtectedLayout";
import { PublicLayout } from "./components/PublicLayout";
import Home from "./pages/client/Home";
import Admin from "./pages/admin/Admin";
import Navbar from "./components/client/Navbar";
import Rooms from "./pages/client/Rooms";

// Amplify Configurations
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PublicLayout}></Route>
        <Route exact path="/admin">
          <ProtectedLayout />
        </Route>
        <Route path="/staff">
          <ProtectedLayout />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
