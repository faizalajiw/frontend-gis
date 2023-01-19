import { Route, Redirect } from "react-router-dom";
//js cookies
import Cookies from "js-cookie";

function PrivateRoute({ children, ...rest }) {
  //token from cookie
  const token = Cookies.get("token");

  return (
    <Route {...rest}>{token ? children : <Redirect to="/admin/login" />}</Route>
  );
}

export default PrivateRoute;
