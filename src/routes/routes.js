import { Switch, Route } from "react-router-dom";
import Login from "../pages/admin/Login";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../pages/admin/dashboard/Index";

function Routes() {
  return (
    <Switch>
      {/* route "/admin/login" */}
      <Route exact path="/admin/login">
        <Login />
      </Route>
      {/* end route "/admin/login" */}

      {/* private route "/admin/dashboard" */}
      <PrivateRoute exact path="/admin/dashboard">
        <Dashboard />
      </PrivateRoute>
      {/* end private route "/admin/dashboard" */}
    </Switch>
  );
}

export default Routes;
