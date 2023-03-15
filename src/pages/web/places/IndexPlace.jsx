import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
//import BASE URL API
import Api from "../../../api";

import CardPlace from "../../../components/utilities/CardPlace";
import PaginationComponent from "../../../components/utilities/Pagination";

function WebIndexPlace() {
    //title page
    document.title = "Travelin - Tempat";

    //state 
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(0);
    const [total, setTotal] = useState(0);

    //function "fetchDataPlaces"
    const fetchDataPlaces = async (pageNumber) => {
        //define variable "page"
        const page = pageNumber ? pageNumber : currentPage;

        //fetching Rest API
        await Api.get(`/api/web/places?page=${page}`)
            .then((response) => {
                //set data to state "places"
                setPlaces(response.data.data.data);
                //set currentPage
                setCurrentPage(response.data.data.current_page);
                //set perPage
                setPerPage(response.data.data.per_page);
                //total
                setTotal(response.data.data.total);
            })
    }

    //hook
    useEffect(() => {
        //call function "fetchDataPlaces"
        fetchDataPlaces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-100">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4 className="fw-semibold">Tempat</h4>
                            <br />
                        </div>
                        {
                            places.length > 0
                                ? places.map((place) => (
                                    <CardPlace
                                        key={place.id}
                                        id={place.id}
                                        slug={place.slug}
                                        title={place.title}
                                        images={place.images}
                                        address={place.address}
                                    />
                                ))
                                : <div className="alert alert-danger border-0 rounded shadow-sm" role="alert">
                                    <strong>Data Belum Tersedia!</strong>
                                </div>
                        }
                    </div>
                    <PaginationComponent
                        currentPage={currentPage}
                        perPage={perPage}
                        total={total}
                        onChange={(pageNumber) => fetchDataPlaces(pageNumber)}
                        position="center"
                    />
                </div>
            </LayoutWeb>
        </React.Fragment>
    )

}

export default WebIndexPlace;