import { Switch, Route } from "react-router-dom";
import Login from "../pages/admin/Login";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../pages/admin/dashboard/Index";
import IndexCategory from "../pages/admin/categories/IndexCategory";
import CreateCategory from "../pages/admin/categories/CreateCategory";
import EditCategory from "../pages/admin/categories/EditCategory";
import IndexPlace from "../pages/admin/places/IndexPlace";
import CreatePlace from "../pages/admin/places/CreatePlace";
import EditPlace from "../pages/admin/places/EditPlace";

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
        <IndexCategory />
      </PrivateRoute>
      {/* end private route "/admin/categories" */}

      {/* privae route "/admin/categories/create" */}
      <PrivateRoute exact path="/admin/categories/create">
        <CreateCategory />
      </PrivateRoute>

      {/* private route "/admin/categories/edit/:id" */}
      <PrivateRoute exact path="/admin/categories/edit/:id">
        <EditCategory />
      </PrivateRoute>

      {/* private route "/admin/places" */}
      <PrivateRoute exact path="/admin/places">
        <IndexPlace />
      </PrivateRoute>

      {/* private route "/admin/places/create" */}
      <PrivateRoute exact path="/admin/places/create">
        <CreatePlace />
      </PrivateRoute>

      {/* private route "/admin/places/edit/:id" */}
      <PrivateRoute exact path="/admin/places/edit/:id">
        <EditPlace />
      </PrivateRoute>
    </Switch>
  );
}

export default Routes;
