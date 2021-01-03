import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "aws-amplify";

//layouts
import { ProtectedLayout } from "./components/ProtectedLayout"
import { PublicLayout } from "./components/PublicLayout"

// Amplify Configurations
import awsExports from "./aws-exports";
Amplify.configure(awsExports);


function App() {
  return <div>
    <Switch>
      <Route path='/admin' component={ProtectedLayout} />
      <Route path='/' component={PublicLayout} />
    </Switch>
  </div>
}

export default App;
