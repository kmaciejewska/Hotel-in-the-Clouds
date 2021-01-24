import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import config from "../aws-exports";

// Pages
//admin
import Admin from "../pages/admin/Admin";
import AdminHome from "../pages/admin/Home";
import Rooms from "../pages/admin/Rooms";
import Statistics from "../pages/admin/Statistics";
import Payments from "../pages/admin/Payments";
import Reviews from "../pages/admin/Reviews";
import AError from "../pages/admin/Error";
import Notifications from "../pages/admin/Notifications";
import Finances from "../pages/admin/Finances";

//staff
import StaffHome from "../pages/staff/Home";
import Housekipping from "../pages/staff/Housekipping";
import Error from "../pages/staff/Error";
import Bookings from "../pages/staff/Bookings";
import Navbar from "../components/admin/Navbar";

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
              <Route exact path="/admin">
                <Admin />
              </Route>
              <Route exact path="/admin/home">
                <AdminHome />
              </Route>
              <Route path="/admin/rooms">
                <Rooms />
              </Route>
              <Route path="/admin/statistics">
                <Statistics />
              </Route>
              <Route path="/admin/payments">
                <Payments />
              </Route>
              <Route path="/admin/reviews">
                <Reviews />
              </Route>
              <Route path="/admin/finances">
                <Finances />
              </Route>
              <Route path="/admin/notifications">
                <Notifications />
              </Route>
              <Route path="/staff">
                <StaffHome/>
              </Route>
              <Route path="/staff/housekeeping">
                <Housekipping/>
              </Route>
              <Route path="/staff/bookings">
                <Bookings/>
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
export default withAuthenticator(ProtectedLayout, false);
