import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import _ from 'lodash';
Amplify.configure(aws_exports);

function App() {
  const [isClient, updateClientInfo] = useState(false)
  const [isStaff, updateStaffInfo] = useState(false)
  const [isAdmin, updateAdminInfo] = useState(false)
  useEffect(() => {
    /* Get the AWS credentials for the current user from Identity Pools.  */
    Auth.currentSession()
      .then(cognitoUser => {
        const { idToken: { payload }} = cognitoUser
        /* Loop through the groups that the user is a member of */
        /* Set isClient to true if the user is part of the Clients group */
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

export default withAuthenticator(App, true);
