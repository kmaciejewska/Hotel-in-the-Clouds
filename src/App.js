import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "aws-amplify";

//layouts
import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedLayoutStaff from "./components/ProtectedStaff";
import { PublicLayout } from "./components/PublicLayout";

// Amplify Configurations
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PublicLayout/>
        </Route>
        <Route exact path="/admin">
          <ProtectedLayout />
        </Route>
        <Route path="/staff">
          <ProtectedLayoutStaff />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
