//import react  
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Api from '../../../api';
import LayoutAdmin from "../../../layouts/Admin";
import PaginationComponent from '../../../components/utilities/Pagination';
import toast from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function IndexUsers() {
    //title page
    document.title = "Users - Administrator Travel GIS";
    //state
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");

    //token
    const token = Cookies.get("token");

    //function "fetchData"
    const fetchData = async (searchData, pageNumber) => {
        //define variable "searchQuery"
        const searchQuery = searchData ? searchData : search;
        //define variable "page"
        const page = pageNumber ? pageNumber : currentPage;

        //fetching data from Rest API
        await Api.get(`/api/admin/users?q=${searchQuery}&page=${page}`, {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            //set data response to state "categories"
            setUsers(response.data.data.data);

            //set currentPage
            setCurrentPage(response.data.data.current_page);

            //set perPage
            setPerPage(response.data.data.per_page);

            //total
            setTotal(response.data.data.total);
        });
    };

    //hook
    useEffect(() => {
        //call function "fetchData"
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //function "searchHandler"
    const searchHandlder = (e) => {
        e.preventDefault();
        //call function "fetchDataPost" with state search and page number
        fetchData(search)
    }

    //function "deleteUser"
    const deleteUser = (id) => {

        //show confirm alert
        confirmAlert({
            title: 'Hapus Data',
            message: 'Ingin menghapus data?',
            buttons: [{
                label: 'Ya',
                onClick: async () => {
                    await Api.delete(`/api/admin/users/${id}`, {
                        headers: {
                            //header Bearer + Token
                            Authorization: `Bearer ${token}`,
                        }
                    })
                        .then(() => {

                            //show toast
                            toast.success("Data berhasil dihapus", {
                                duration: 2000,
                                position: "top-right",
                                style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                },
                            });

                            //call function "fetchData"
                            fetchData();
                        })
                }
            },
            {
                label: 'Batal',
                onClick: () => { }
            }
            ]
        });
    }

    return (
        <React.Fragment>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 border-top-success rounded shadow-sm mb-5">
                            <div className="card-header">
                                <span className="fw-semibold"><i className="fas fa-users me-1"></i> USERS</span>
                            </div>
                            <div className="card-body">
                                {/* SEARCH BAR */}
                                <form onSubmit={searchHandlder} className="form-group">
                                    <div className="input-group mb-3">
                                        <Link to="/admin/users/create" className="btn btn-md btn-success"><i className="fas fa-plus-circle"></i></Link>
                                        <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama users" />
                                        <button type="submit" className="btn btn-md btn-success"><i className="fas fa-search"></i> Cari</button>
                                    </div>
                                </form>
                                {/* END SEARCH BAR */}

                                {/* TABEL */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="fw-semibold">No</th>
                                                <th scope="col" className="fw-semibold">Nama</th>
                                                <th scope="col" className="fw-semibold">Email</th>
                                                <th scope="col" className="fw-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td className="text-center">
                                                        <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-primary me-2"><i className="fas fa-pencil-alt"></i></Link>
                                                        <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* END TABEL */}
                                <PaginationComponent
                                    currentPage={currentPage}
                                    perPage={perPage}
                                    total={total}
                                    onChange={(pageNumber) => fetchData(pageNumber)}
                                    position="end"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </React.Fragment>
    );
}

export default IndexUsers