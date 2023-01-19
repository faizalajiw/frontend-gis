import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import BannerLogin from "../../assets/images/BannerLogin.png";

//BASE URL API
import Api from "../../api";

//react notification
import toast from "react-hot-toast";

//js cookies
import Cookies from "js-cookie";

function Login() {
  document.title = "Admin Website GIS";

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});
  const history = useHistory();

  //login handler
  const loginHandler = async (e) => {
    e.preventDefault();
    //set state isLoading "true"
    setLoading(true);

    await Api.post("/api/admin/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        //set state isLoading "false"
        setLoading(false);

        //show notification
        toast.success("Login Berhasil!", {
          duration: 3000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#f1f1f1",
            color: "#116f44",
          },
        });

        //set cookies
        Cookies.set("token", response.data.token);

        //beralih ke halaman dashboard
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        //set state isLoading "false"
        setLoading(false);

        //set error response
        setValidation(err.response.data);
      });
  };

  if (Cookies.get("token")) {
    //beralih ke halaman dashboard
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <React.Fragment>
      <div className="container">
        {/* GRID COLUMN 2 ROW */}
        <div className="row">
          {/* LEFT COLUMN */}
          <div className="col-6 my-card justify-content-center">
            <img src={BannerLogin} alt="Banner Login" />
          </div>
          {/* END LEFT COLUMN */}

          {/* RIGHT COLUMN */}
          <div className="col-6 my-card text">
            <div className="card border-0 rounded shadow-sm p-5">
              <div className="card-body p-6">
                {/* TITLE */}
                <div className="text-center">
                  <h2 className="fw-bolder">Website GIS</h2>
                </div>
                {/* END TITLE */}

                {/* FORM LOGIN */}
                <form onSubmit={loginHandler}>
                  {/* FIELD INPUT EMAIL */}
                  <label className="mb-1 fw-bold">Email</label>
                  <div className="input-group input-group-lg mb-4">
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {validation.email && (
                    <div className="alert alert-danger">
                      {validation.email[0]}
                    </div>
                  )}
                  {/* END FIELD INPUT EMAIL */}

                  {/* FIELD INPUT PASSWORD */}
                  <label className="mb-1 fw-bold">Password</label>
                  <div className="input-group input-group-lg mb-4">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  {validation.password && (
                    <div className="alert alert-danger">
                      {validation.password[0]}
                    </div>
                  )}
                  {/* END FIELD INPUT PASSWORD */}

                  {validation.message && (
                    <div className="alert alert-danger">
                      {validation.message}
                    </div>
                  )}

                  {/* BUTTON LOGIN */}
                  <button
                    className="btn btn-primary btn-lg shadow-sm rounded-sm px-4 w-100"
                    type="submit"
                    disabled={isLoading}
                  >
                    {" "}
                    {isLoading ? "LOADING..." : "Masuk"}{" "}
                  </button>
                  {/* END BUTTON LOGIN */}
                </form>
                {/* END FORM LOGIN */}
              </div>
            </div>
          </div>
          {/* END RIGHT COLUMN */}
        </div>
        {/* END GRID COLUMN 2 ROW */}
      </div>
    </React.Fragment>
  );
}

export default Login;
