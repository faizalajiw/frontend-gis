//import react  
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Api from "../../../api";
import LayoutAdmin from "../../../layouts/Admin";

export default function IndexSlider() {
    //title page
    document.title = "Sliders";

    //state
    const [sliders, setSliders] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [perPage, setPerPage] = useState(0);
    // const [total, setTotal] = useState(0);

    //token
    const token = Cookies.get("token");

    //function "fetchData"
    const fetchData = async () => {
        //fetching data from Rest API
        await Api.get('/api/admin/sliders', {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            //set data response to state "sliders"
            setSliders(response.data.data.data);

            //set currentPage
            // setCurrentPage(response.data.data.current_page);

            //set perPage
            // setPerPage(response.data.data.per_page);

            //total
            // setTotal(response.data.data.total);
        });
    };

    //hook
    useEffect(() => {
        //call function "fetchData"
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //function "deleteSlider"
    const deleteSlider = (id) => {
        //show confirm alert
        confirmAlert({
            title: 'Hapus Data',
            message: 'Ingin menghapus data?',
            buttons: [{
                label: 'Ya',
                onClick: async () => {
                    await Api.delete(`/api/admin/sliders/${id}`, {
                        headers: {
                            //header Bearer + Token
                            Authorization: `Bearer ${token}`,
                        }
                    })
                        .then(() => {

                            //show toast
                            toast.success("Data Deleted Successfully!", {
                                duration: 4000,
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
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-semibold"><i className="fas fa-images me-2"></i>Sliders</span>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <Link to="/admin/sliders/create" className="btn btn-md btn-success"><i className="fas fa-plus-circle"></i></Link>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="fw-semibold">No</th>
                                                <th scope="col" className="fw-semibold">Gambar</th>
                                                <th scope="col" className="fw-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sliders.map((slider, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index}</td>
                                                    <td className="text-center">
                                                        <img src={slider.image} alt="" width="200" className="rounded" />
                                                    </td>
                                                    <td className="text-center">
                                                        <button onClick={() => deleteSlider(slider.id)}
                                                            className="btn btn-sm btn-danger"><i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </React.Fragment>
    )

}

