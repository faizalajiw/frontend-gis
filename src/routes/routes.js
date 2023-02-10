import { Switch, Route } from "react-router-dom";
import Login from "../pages/admin/Login";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../pages/admin/dashboard/Index";
import CategoriesIndex from "../pages/admin/categories/Index";
import CreateCategory from "../pages/admin/categories/CreateCategory";

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

      {/* private route "/admin/categories" */}
      <PrivateRoute exact path="/admin/categories">
        <CategoriesIndex />
      </PrivateRoute>
      {/* end private route "/admin/categories" */}

      {/* privae route "/admin/categories/create" */}
      <PrivateRoute exact path="/admin/categories/create">
        <CreateCategory />
      </PrivateRoute>
    </Switch>
  );
}

export default Routes;
