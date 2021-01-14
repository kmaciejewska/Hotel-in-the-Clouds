import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";

// Pages
import Admin from "../pages/admin/Admin"


export const ProtectedLayout = (props) => <div>
<Switch>
   <Route exact path='/admin' component={Admin} />
 </Switch>
</div>