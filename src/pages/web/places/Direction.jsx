import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";

//import mapbox gl
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

//import mapbox gl direction
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function WebPlaceDirection() {
    //title page
    document.title = "Map Direction";
    //map container
    const mapContainer = useRef(null);

    //state for user location coordinate
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();

    //slug params
    const { slug } = useParams();

    //get query params
    const query = new URLSearchParams(useLocation().search);

    //hook
    useEffect(() => {
        //init Map
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [query.get("longitude"), query.get("latitude")],
            zoom: 15
        });

        //init geolocate
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        });


        // Add geolocate control to the map.
        map.addControl(geolocate);

        //init directions
        const directions = new Directions({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            // UI controls
            controls: {
                inputs: false,
                instructions: true
            },
        });

        // Add directions to the map.
        map.on('load', function () {
            geolocate.trigger(); //<- Automatically activates geolocation

            geolocate.on('geolocate', function (position) {
                setLongitude(position.coords.longitude);
                setLatitude(position.coords.latitude);
            });

            directions.setOrigin([longitude, latitude]);
            directions.setDestination([query.get("longitude"), query.get("latitude")]);

            map.addControl(directions);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-100">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body">
                                    <Link to={`/places/${slug}`} className="float-end btn btn-success btn-sm mb-2"><i className="fas fa-arrow-alt-circle-left me-2"></i>Kembali</Link>
                                    <h5><i className="fas fa-location-arrow me-2 fw-semibold"></i>Rute Lokasi</h5>
                                    <hr />
                                    <div ref={mapContainer} className="map-container" style={{ height: "400px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </React.Fragment>
    )

}

export default WebPlaceDirection;