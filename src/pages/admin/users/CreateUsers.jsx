//import hook useState from react
import React, { useState } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import BASE URL API
import Api from "../../../api";

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import toats
import toast from "react-hot-toast";

function CreateUsers() {

    //title page
    document.title = "Add New User - Administrator Travel GIS";

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //state validation
    const [validation, setValidation] = useState({});

    //token
    const token = Cookies.get("token");

    //history
    const history = useHistory();

    //function "storeUser"
    const storeUser = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        await Api.post('/api/admin/users', formData, {

                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                }

            }).then(() => {

                //show toast
                toast.success("Data Saved Successfully!", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                //redirect dashboard page
                history.push("/admin/users");

            })
            .catch((error) => {

                //set state "validation"
                setValidation(error.response.data);
            })

    }

    return (
        <React.Fragment>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-semibold"><i className="fas fa-users me-1"></i>TAMBAH USERS</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeUser}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Nama</label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama"/>
                                            </div>
                                            {validation.name && (
                                                <div className="alert alert-danger">
                                                    {validation.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Email</label>
                                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                            </div>
                                            {validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.email[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Password</label>
                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                            </div>
                                            {validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Konfirmasi Password</label>
                                                <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Konfirmasi Password"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> SAVE</button>
                                        <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> RESET</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
              </div>
            </LayoutAdmin>
        </React.Fragment>
    );
}

export default CreateUsers;