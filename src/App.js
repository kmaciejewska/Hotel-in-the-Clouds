/*import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

function App() {
  const [isClient, updateClientInfo] = useState(false)
  const [isStaff, updateStaffInfo] = useState(false)
  const [isAdmin, updateAdminInfo] = useState(false)
  useEffect(() => {
    // Get the AWS credentials for the current user from Identity Pools.
    Auth.currentSession()
      .then(cognitoUser => {
        const { idToken: { payload }} = cognitoUser
        // Loop through the groups that the user is a member of 
        // Set isClient to true if the user is part of the Clients group 
        payload['cognito:groups'] && payload['cognito:groups'].forEach(group => {
          if (group === 'Clients') updateClientInfo(true)
          else if (group === 'Staff')   updateStaffInfo(true)
          else if (group === 'Admins') updateAdminInfo(true)
        })
      })
      .catch(err => console.log(err));
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { isClient && <h1>Welcome, Client!</h1> }
        { isStaff && <h1>Welcome, Staff!</h1> }
        { isAdmin && <h1>Welcome, Admin!</h1> }
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);*/

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
  /*return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/booknow/:slug" component={BookNow} />
        <Route exact path="/Admin/" component={Admin} />
        <Route component={Error} />
      </Switch>
    <Footer/>
    </>
  );*/
}

export default App;

/*const App = () => {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      
        <Route exact path="/rooms">
          <Rooms />
        </Route>
        <Route
          path="/rooms/:slug"
          children={<SingleRoom></SingleRoom>}>
        </Route>
        
      </Switch>
    </Router>
  );
}*/
