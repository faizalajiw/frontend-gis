import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../../api';
import LayoutAdmin from "../../../layouts/Admin";

export default function IndexPlaces() {
    document.title = "Tempat";

    //state
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");

    //token
    const token = Cookies.get("token");

    //function "fetchData"
    const fetchData = async (searchData) => {
        //define variable "searchQuery"
        const searchQuery = searchData ? searchData : search;

        //fetching data from Rest API
        await Api.get(`/api/admin/places?q=${searchQuery}`, {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            //set data response to state "places"
            setPlaces(response.data.data.data);

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

        //call function "fetchDataPost"
        fetchData(search)
    }

    return (
        <>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-semibold"><i class="fas fa-place-of-worship me-1"></i> TEMPAT</span>
                            </div>
                            <div className="card-body">
                                {/* SEARCH BAR */}
                                <form onSubmit={searchHandlder} className="form-group">
                                    <div className="input-group mb-3">
                                        <Link to="/admin/places/create" className="btn btn-md btn-success"><i className="fas fa-plus-circle"></i></Link>
                                        <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama tempat" />
                                        <button type="submit" className="btn btn-md btn-success"><i className="fas fa-search"></i> Cari</button>
                                    </div>
                                </form>
                                {/* END SEARCH BAR */}

                                {/* TABEL */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col" className="fw-semibold">No</th>
                                                <th scope="col" className="fw-semibold">Nama Tempat</th>
                                                <th scope="col" className="fw-semibold">Kategori</th>
                                                <th scope="col" className="fw-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {places.map((place, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                                                    <td>{place.title}</td>
                                                    <td className="text-center">{place.category.name}</td>
                                                    <td className="text-center"></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* END TABEL */}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </>
    )
}
