import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";

//import BASE URL API
import Api from "../../../api";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function WebShowPlace() {
    const [place, setPlace] = useState({});

    const { slug } = useParams();

    //function "fetchDataPlace"
    const fetchDataPlace = async () => {
        //fetching Rest API
        await Api.get(`/api/web/places/${slug}`)
            .then((response) => {
                //set data to state "places"
                setPlace(response.data.data);
                //set title from state "category"
                document.title = `${response.data.data.title})`;
            });
    };

    //hook
    useEffect(() => {
        //call function "fetchDataPlace"
        fetchDataPlace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // react image gallery
    //define image array
    const images = [];

    //function "placeImages"
    const placeImages = () => {
        //loop data from object "place"
        for (let value in place.images) {
            //push to image array
            images.push({
                original: place.images[value].image,
                thumbnail: place.images[value].image,
            });
        }
    };

    //hook 
    useEffect(() => {
        //call function "placeImage"
        placeImages();
    });

    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-100">
                    <div className="row">
                        <div className="col-md-7 mb-4">
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body">
                                    <h4 className="fw-semibold">{place.title}</h4>
                                    <span className="card-text">
                                        <i className="fas fa-map-marker-alt me-2"></i>{place.address}
                                    </span>
                                    <br />
                                    <br />

                                    {/* Gambar Tempat */}
                                    <ImageGallery items={images} autoPlay={true} />
                                    <div
                                        dangerouslySetInnerHTML={{ __html: place.description }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mb-4">
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body"></div>
                                <hr />
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2 col-2">
                                            <div className="icon-info-green">
                                                <i className="fa fa-map-marker-alt"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-10">
                                            <div className="capt-info fw-bold">Alamat</div>
                                            <div className="sub-title-info"><i>{place.address}</i></div>
                                        </div>
                                        <div className="col-md-2 col-2">
                                            <div className="icon-info-green">
                                                <i className="fa fa-clock"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-10">
                                            <div className="capt-info fw-bold">Jam</div>
                                            <div className="sub-title-info">{place.office_hours}</div>
                                        </div>
                                        <div className="col-md-2 col-2">
                                            <div className="icon-info-green">
                                                <i className="fa fa-phone"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-10">
                                            <div className="capt-info fw-bold">Kontak</div>
                                            <div className="sub-title-info">{place.phone}</div>
                                        </div>
                                        <div className="col-md-2 col-2">
                                            <div className="icon-info-green">
                                                <i className="fa fa-globe-asia"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-10">
                                            <div className="capt-info fw-bold">Website</div>
                                            <div className="sub-title-info">
                                                <a href={place.website} className="text-decoration-none">{place.website}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </React.Fragment>
    );
}

export default WebShowPlace;