import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports";

//staff
import StaffHome from "../pages/staff/Home";
import Housekipping from "../pages/staff/Housekipping";
import Error from "../pages/staff/Error";
import Bookings from "../pages/staff/Bookings";
import Navbar from "../components/staff/Navbar";

Amplify.configure(config);
Auth.configure(config);

function ProtectedLayout() {
  //check if it is admin or staff
  const [isAdmin, updateAdminInfo] = useState(false);
  const [isStaff, updateStaffInfo] = useState(false);
  useEffect(() => {
    // Get the AWS credentials for the current user from Identity Pools.
    Auth.currentSession()
      .then((cognitoUser) => {
        const {
          idToken: { payload },
        } = cognitoUser;
        // Loop through the groups that the user is a member of
        // Set isAdmin to true if the user is part of the Admins group
        payload["cognito:groups"] &&
          payload["cognito:groups"].forEach((group) => {
            if (group === "Admins") updateAdminInfo(true);
            else if (group === "Staff") updateStaffInfo(true);
          });
      })
      .catch((err) => console.log(err));
  }, []);
  //
  return (
    <div>
      {isAdmin || isStaff ? (
        <>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/staff">
                <StaffHome />
              </Route>
              <Route path="/staff/housekeeping">
                <Housekipping />
              </Route>
              <Route path="/staff/bookings">
                <Bookings />
              </Route>
            </Switch>
          </Router>
        </>
      ) : (
        <Route component={Error} />
      )}
    </div>
  );
}
export default withAuthenticator(ProtectedLayout, true);
