import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../api";
import CardPlace from "../../../components/utilities/CardPlace";
import LayoutWeb from "../../../layouts/Web";

function WebShowCategory() {
    const [category, setCategory] = useState({});
    const [places, setPlaces] = useState([]);
    //get params from url
    const { slug } = useParams();

    //function "fetchDataCategory"
    const fetchDataCategory = async () => {
        //fetching Rest API
        await Api.get(`/api/web/categories/${slug}`)
            .then((response) => {

                //set data to state "category"
                setCategory(response.data.data);
                //set data to state "places"
                setPlaces(response.data.data.places);
                //set title from state "category"
                document.title = `Travelin - Kategori ${response.data.data.name}`;
            })
    }

    //hook
    useEffect(() => {
        //call function "fetchDataCategory"
        fetchDataCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-100">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4 className="fw-semibold">Kategori {category.name}</h4>
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
                </div>
            </LayoutWeb>
        </React.Fragment>
    )

}

export default WebShowCategory;