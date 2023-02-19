import React, { useEffect, useRef, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";

//import BASE URL API
import Api from "../../../api";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

//import mapbox gl
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function WebShowPlace() {
    //state place
    const [place, setPlace] = useState({});
    //slug params
    const { slug } = useParams();
    //map container
    const mapContainer = useRef(null);

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


    //========================= GAMBAR TEMPAT =========================
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

    //========================= MAPBOX =========================
    //function "initMap"
    const initMap = () => {
        //init Map
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [
                place.longitude ? place.longitude : "",
                place.latitude ? place.latitude : "",
            ],
            zoom: 17,
        });

        //init popup
        new mapboxgl.Popup({
            closeOnClick: false
        })
            .setLngLat([
                place.longitude ? place.longitude : "",
                place.latitude ? place.latitude : "",
            ])
            .setHTML(`<h6>${place.title}</h6><br/><p>${place.address}</p>`)
            .addTo(map);
    };

    //hook 
    useEffect(() => {
        //call function "placeImage"
        placeImages();

        initMap();
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
                                <div className="card-body">
                                    <div ref={mapContainer} className="map-container" style={{ height: "350px" }} />
                                    <div className="d-grid gap-2">
                                        <Link to={`/places/${place.slug}/direction?longitude=${place.longitude}&latitude=${place.latitude}`} className="float-end btn btn-success btn-block btn-md mt-3">
                                            <i className="fas fa-location-arrow me-2"></i>Buka Rute
                                        </Link>
                                    </div>
                                </div>
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
                                            <div className="sub-title-info">{place.address}</div>
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