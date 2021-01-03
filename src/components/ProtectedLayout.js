import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "aws-amplify";

// Pages
import Admin from "../pages/Admin"
import Rooms from "../pages/Rooms";
import BookNow from "../pages/BookNow";
import SingleRoom from "../pages/SingleRoom";
import Profile from "../pages/Profile";
import Error from "../pages/Error";


export const ProtectedLayout = (props) => <div>

</div>