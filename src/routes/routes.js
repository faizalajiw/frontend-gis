import { Switch, Route } from "react-router-dom";
import Login from "../pages/admin/Login";

function Routes() {
  return (
    <Switch>
      {/* route "/admin/login" */}
      <Route exact path="/admin/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default Routes;
