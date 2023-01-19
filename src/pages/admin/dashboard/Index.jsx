import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";

//import BASE URL API
import Api from "../../../api";

//js cookies
import Cookies from "js-cookie";

function Dashboard() {
  //title page
  document.title = "Dashboard Admin";

  //set state
  const [categories, setCategories] = useState(0);
  const [places, setPlaces] = useState(0);
  const [sliders, setSliders] = useState(0);
  const [users, setUsers] = useState(0);

  //token
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async () => {
    // fetching data from rest api
    const response = await Api.get("api/admin/dashboard", {
      headers: {
        //header Bearer + token
        Authorization: `Bearer ${token}`,
      },
    });

    //get response data
    const data = await response.data.data;

    //masukkan response data ke state
    setCategories(data.categories);
    setPlaces(data.places);
    setSliders(data.sliders);
    setUsers(data.users);
  };

  useEffect(() => {
    //call method "fetchData"
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-12 col-lg-3 mb-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-primary py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-folder fa-2x text-white"></i>
                </div>
                <div>
                  <div className="text-value text-primary">{categories}</div>
                  <div className="text-muted font-weight-bold small">
                    Kategori
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-4">
            <div className="card border-0 rounded shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-success py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-map-marked-alt fa-2x text-white"></i>
                </div>
                <div>
                  <div className="text-value text-success">{places}</div>
                  <div className="text-muted font-weight-bold small">
                    Tempat
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-4">
            <div className="card border-0 rounded shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-primary py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-images fa-2x text-white"></i>
                </div>
                <div>
                  <div className="text-value text-primary">{sliders}</div>
                  <div className="text-muted font-weight-bold small">
                    Sliders
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-4">
            <div className="card border-0 rounded shadow-sm overflow-hidden">
              <div className="card-body p-0 d-flex align-items-center">
                <div
                  className="bg-success py-4 px-5 mfe-3"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-users fa-2x text-white"></i>
                </div>
                <div>
                  <div className="text-value text-success">{users}</div>
                  <div className="text-muted font-weight-bold small">Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  );
}

export default Dashboard;
