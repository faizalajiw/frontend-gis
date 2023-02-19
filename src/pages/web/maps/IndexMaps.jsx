import React, { useEffect, useRef, useState } from "react";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/Web";
//import mapbox gl
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function WebIndexMaps() {
    //title page
    document.title = "Maps";

    //map container
    const mapContainer = useRef(null);
    //state coordinate
    const [coordinates, setCoordinates] = useState([]);

    //function "fetchDataPlaces"
    const fetchDataPlaces = async () => {
        //fetching Rest API
        await Api.get('/api/web/all_places')
            .then((response) => {
                //set data to state
                setCoordinates(response.data.data)
            })
    }

    //hook
    useEffect(() => {
        //call function "fetchDataPlaces"
        fetchDataPlaces();
    }, []);

    //hook
    useEffect(() => {
        //init Map
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [109.12410532246922, -6.87670482108234],
            zoom: 12.5
        });

        // Create a default Marker and add it to the map.
        coordinates.forEach((location) => {
            // add popup
            const popup = new mapboxgl.Popup()
                .setHTML(`<h6>${location.title}</h6><hr/><p><i class="fa fa-map-marker"></i> <i>${location.address}</i></p><hr/><div class="d-grid gap-2"><a href="/places/${location.slug}" class="btn btn-sm btn-success btn-block text-white">Lihat Selengkapnya</a></div>`)
                .addTo(map);

            // add marker to map
            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map);
        });

    })

    return (
        <React.Fragment>
            <LayoutWeb>
                <div className="container mt-100">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body"><h5><i className="fas fa-map-marker-alt me-2"></i>Kota Tegal</h5>
                                    <hr />
                                    <div ref={mapContainer} className="map-container" style={{ height: "450px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </React.Fragment>
    )

}

export default WebIndexMaps;