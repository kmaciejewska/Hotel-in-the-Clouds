import React, { useEffect, useState } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
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
          <Switch>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/home" component={AdminHome} />
            <Route exact path="/admin/rooms" component={Rooms} />
            <Route exact path="/admin/statistics" component={Statistics} />
            <Route exact path="/admin/payments" component={Payments} />
            <Route exact path="/admin/reviews" component={Reviews} />
            <Route exact path="/admin/notifications" component={Notifications} />
            <Route exact path="/admin/finances" component={Finances} />
            <Route exact path="/staff" component={StaffHome} />
            <Route exact path="/staff/housekeeping" component={Housekipping} />
            <Route exact path="/staff/bookings/" component={Bookings} />
          </Switch>
        </>
      ) : (
        <Route component={Error} />
      )}
    </div>
  );
}
export default withAuthenticator(ProtectedLayout, true);
