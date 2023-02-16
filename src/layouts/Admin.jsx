import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import Sidebar from "../components/admin/Sidebar";

//import BASE URL API
import Api from "../api";

//import js cookie
import Cookies from "js-cookie";

//hook link
import { useHistory, Link } from "react-router-dom";

//react notification
import toast from "react-hot-toast";

const LayoutAdmin = ({ children }) => {
  //state user
  const [user, setUser] = useState({});

  //state toggle
  const [sidebarToggle, setSidebarToggle] = useState(false);

  //history
  const history = useHistory();

  //token
  const token = Cookies.get("token");

  //function toggle hanlder
  const sidebarToggleHandler = (e) => {
    e.preventDefault();

    if (!sidebarToggle) {
      //add class on body
      document.body.classList.add("sb-sidenav-toggled");
      //set state "sidebarToggle" to true
      setSidebarToggle(true);
    } else {
      //remove class on body
      document.body.classList.remove("sb-sidenav-toggled");
      //set state "sidebarToggle" to false
      setSidebarToggle(false);
    }
  };

  //fetchData untuk memperoleh user yg sedang login
  const fetchData = async () => {
    //fetch on Rest API
    await Api.get("/api/admin/user", {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set state "user"
      setUser(response.data);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function logout
  const logoutHandler = async (e) => {
    e.preventDefault();
    await Api.post("/api/admin/logout", null, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      //remove token
      Cookies.remove("token");
      //show notification
      toast.success("Berhasil Keluar.", {
        duration: 3000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#f1f1f1",
          color: "#116f44",
        },
      });
      //mengarah ke halaman login
      history.push("/admin/login");
    });
  };

  return (
    <React.Fragment>
      <div className="d-flex sb-sidenav-toggled" id="wrapper">
        <div className="bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading bg-light">
            <strong>Travelin Dashboard</strong>
          </div>
          <Sidebar />
        </div>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              {/* Button Toggle */}
              <button
                className="btn btn-success-dark"
                onClick={sidebarToggleHandler}
              >
                <i className="fa fa-list-ul"></i>
              </button>
              {/* End Button Toggle */}

              {/* Navbar Collapse */}
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                  {/* Dropdown */}
                  {/* Nama User */}
                  <NavDropdown
                    title={user.name}
                    className="fw-bold"
                    id="basic-nav-dropdown"
                  >
                    {/* End Nama User */}

                    {/* Visit Web */}
                    <NavDropdown.Item as={Link} to="/" target="_blank">
                      <i className="fa fa-external-link-alt me-2"></i>Visit Web
                    </NavDropdown.Item>
                    {/* End Visit Web */}

                    <NavDropdown.Divider />

                    {/* Kategori */}
                    <NavDropdown.Item as={Link} to="/admin/categories">
                      Kategori
                    </NavDropdown.Item>
                    {/* End Kategori */}

                    {/* Tempat */}
                    <NavDropdown.Item as={Link} to="/admin/places">
                      Tempat
                    </NavDropdown.Item>
                    {/* End Tempat */}

                    {/* Sliders */}
                    {/* <NavDropdown.Item as={Link} to="/admin/sliders">
                      Sliders
                    </NavDropdown.Item> */}
                    {/* End Sliders */}

                    {/* Users */}
                    <NavDropdown.Item as={Link} to="/admin/users">
                      Users
                    </NavDropdown.Item>
                    {/* End Users */}
                    
                    <NavDropdown.Divider />

                    {/* Logout */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fa fa-sign-out-alt me-2"></i>Logout
                    </NavDropdown.Item>
                    {/* End Logout */}
                  </NavDropdown>
                  {/* End Dropdown */}
                </ul>
              </div>
              {/* End Navbar Collapse */}
            </div>
          </nav>
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LayoutAdmin;
