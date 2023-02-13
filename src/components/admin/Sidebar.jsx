import React from "react";
import {Link, useLocation} from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    //ambil object pathname dari variabel location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    return (
        <React.Fragment>
            <div className="list-group list-group-flush">
                <Link className={splitLocation[2] === "dashboard" ? "list-group-item list-group-item-action list-group-item-light p-3 active fw-bold" : "list-group-item list-group-item-action list-group-item-light p-3 fw-semibold"} to="/admin/dashboard"><i className="fas fa-chart-line me-2"></i> Dashboard</Link>
                <Link className={splitLocation[2] === "categories" ? "list-group-item list-group-item-action list-group-item-light p-3 active fw-bold" : "list-group-item list-group-item-action list-group-item-light p-3 fw-semibold"} to="/admin/categories"><i className="fas fa-folder me-2"></i> Kategori</Link>
                <Link className={splitLocation[2] === "places" ? "list-group-item list-group-item-action list-group-item-light p-3 active fw-bold" : "list-group-item list-group-item-action list-group-item-light p-3 fw-semibold"} to="/admin/places"><i className="fas fa-place-of-worship me-1"></i> Tempat</Link>
                <Link className={splitLocation[2] === "sliders" ? "list-group-item list-group-item-action list-group-item-light p-3 active fw-bold" : "list-group-item list-group-item-action list-group-item-light p-3 fw-semibold"} to="/admin/sliders"><i className="fas fa-images me-2"></i> Sliders</Link>
                <Link className={splitLocation[2] === "users" ? "list-group-item list-group-item-action list-group-item-light p-3 active fw-bold" : "list-group-item list-group-item-action list-group-item-light p-3 fw-semibold"} to="/admin/users"><i className="fas fa-users me-2"></i> Users</Link>
            </div>
        </React.Fragment>
    )

}

export default Sidebar;