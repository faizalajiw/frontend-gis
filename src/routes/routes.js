import { Switch, Route } from "react-router-dom";
// ------------------- ADMIN ----------------------
import PrivateRoute from "./PrivateRoutes";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/dashboard/Index";
import IndexCategory from "../pages/admin/categories/IndexCategory";
import CreateCategory from "../pages/admin/categories/CreateCategory";
import EditCategory from "../pages/admin/categories/EditCategory";
import IndexPlace from "../pages/admin/places/IndexPlace";
import CreatePlace from "../pages/admin/places/CreatePlace";
import EditPlace from "../pages/admin/places/EditPlace";
import IndexSlider from "../pages/admin/sliders/IndexSlider";
import CreateSlider from '../pages/admin/sliders/CreateSlider';

// ------------------- WEB ----------------------
import WebIndexHome from "../pages/web/home/IndexHome";
import WebShowCategory from "../pages/web/categories/ShowCategory";
import WebIndexPlace from "../pages/web/places/IndexPlace";

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

      {/* private route "/admin/sliders" */}
      <PrivateRoute exact path="/admin/sliders">
        <IndexSlider />
      </PrivateRoute>

      {/* private route "/admin/sliders/create" */}
      <PrivateRoute exact path="/admin/sliders/create">
        <CreateSlider />
      </PrivateRoute>

      {/* route "/" */}
      <Route exact path="/">
        <WebIndexHome />
      </Route>

      {/* private route "/category/:slug" */}
      <Route exact path="/category/:slug">
        <WebShowCategory />
      </Route>

      {/* private route "/places" */}
      <Route exact path="/places">
        <WebIndexPlace />
      </Route>

    </Switch>
  );
}

export default Routes;
