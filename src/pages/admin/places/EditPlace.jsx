import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import Api from '../../../api';
import LayoutAdmin from "../../../layouts/Admin";

//mapbox gl
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//mapbox gl geocoder
import MapboxGeocoder from "mapbox-gl-geocoder";
//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function EditPlace() {
    document.title = "Tempat";

    //state form
    const [title, setTitle] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [office_hours, setOfficeHours] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    //state image array / multiple
    const [images, setImages] = useState([]);
    //state categories
    const [categories, setCategories] = useState([]);
    //state validation
    const [validation, setValidation] = useState({});

    //token
    const token = Cookies.get("token");
    //history
    const history = useHistory();
    //get ID from parameter URL
    const { id } = useParams();

    //function "fetchCategories"
    const fetchCategories = async () => {
        //fetching data from Rest API
        await Api.get("/api/web/categories")
            .then((response) => {
                //set data response to state "catgeories"
                setCategories(response.data.data);
            });
    };

    //function "getPlaceById"
    const getPlaceById = async () => {
        //fetching data from Rest API
        await Api.get(`/api/admin/places/${id}`, {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data response to state
            setTitle(response.data.data.title);
            setCategoryID(response.data.data.category_id);
            setDescription(response.data.data.description);
            setPhone(response.data.data.phone);
            setWebsite(response.data.data.website);
            setOfficeHours(response.data.data.office_hours);
            setAddress(response.data.data.address);
            setLatitude(response.data.data.latitude);
            setLongitude(response.data.data.longitude);
        });
    };

    //hook
    useEffect(() => {
        //call function "fetchCategories"
        fetchCategories();
        //fetch function "getPlaceById"
        getPlaceById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //function "handleFileChange"
    const handleFileChange = (e) => {
        //define variable for get value image data
        const imageData = e.target.files;

        Array.from(imageData).forEach(image => {
            //check validation file
            if (!image.type.match('image.*')) {
                setImages([]);

                //show toast
                toast.error("Format File Tidak Didukung!", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                return
            } else {
                setImages([...e.target.files]);
            }
        });
    }

    //function "updatePlace"
    const updatePlace = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append("title", title);
        formData.append("category_id", categoryID);
        formData.append("description", description);
        formData.append("phone", phone);
        formData.append("website", website);
        formData.append("office_hours", office_hours);
        formData.append("address", address);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("_method", "PATCH");

        Array.from(images).forEach(image => {
            formData.append("image[]", image);
        });

        await Api.post(`/api/admin/places/${id}`, formData, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                //show toast
                toast.success("Berhasil Update!", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });

                //redirect place index page
                history.push("/admin/places");
            })
            .catch((error) => {
                //set state "validation"
                setValidation(error.response.data);
            });
    };

    //========================= MAPBOX =========================
    //define state
    const mapContainer = useRef(null);

    useEffect(() => {
        //init map
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude],
            zoom: 15,
        });

        //init geocoder
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,

            marker: {
                draggable: true,
            },

            mapboxgl: mapboxgl,
        });

        map.addControl(geocoder);

        //init marker
        const marker = new mapboxgl.Marker({
            draggable: true,
            color: "rgb(0 4 45)"
        })
            //set longtitude and latitude
            .setLngLat([longitude, latitude])
            //add marker to map
            .addTo(map);

        //geocoder result
        geocoder.on('result', function(e) {
            //remove marker
            marker.remove();
            //set longitude and latitude
            marker.setLngLat(e.result.center).addTo(map);
        
            //event marker on dragend
            marker.on('dragend', function (e) {
                //assign longitude and latitude to state
                setLongitude(e.target._lngLat.lng)
                setLatitude(e.target._lngLat.lat)
            });
        });
    });


    return (
        <>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-semibold"><i className="fas fa-place-of-worship me-1"></i> EDIT TEMPAT</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updatePlace}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Image (<i>select many file</i>)
                                        </label>
                                        <input type="file" className="form-control" onChange={handleFileChange} multiple />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title Place" />
                                    </div>
                                    {validation.title && (
                                        <div className="alert alert-danger">
                                            {validation.title[0]}
                                        </div>
                                    )}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Category
                                                </label>
                                                <select class="form-select" value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                                                    <option value="">-- Select Category --</option>
                                                    {categories.map((category) => (
                                                        <option value={category.id} key={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {validation.category_id && (
                                                <div className="alert alert-danger">
                                                    {validation.category_id[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Office Hours
                                                </label>
                                                <input type="text" className="form-control" value={office_hours} onChange={(e) => setOfficeHours(e.target.value)} placeholder="Enter Office Hours"
                                                />
                                            </div>
                                            {validation.office_hours && (
                                                <div className="alert alert-danger">
                                                    {validation.office_hours[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Description
                                        </label>
                                        <ReactQuill theme="snow" rows="5" value={description} onChange={(content) => setDescription(content)}
                                        />
                                    </div>
                                    {validation.description && (
                                        <div className="alert alert-danger">
                                            {validation.description[0]}
                                        </div>
                                    )}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Phone
                                                </label>
                                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" />
                                            </div>
                                            {validation.phone && (
                                                <div className="alert alert-danger">
                                                    {validation.phone[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Website
                                                </label>
                                                <input type="text" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter Website Place" />
                                            </div>
                                            {validation.website && (
                                                <div className="alert alert-danger">
                                                    {validation.title[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Address</label>
                                        <textarea class="form-control" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address Place"></textarea>
                                    </div>
                                    {validation.address && (
                                        <div className="alert alert-danger">
                                            {validation.address[0]}
                                        </div>
                                    )}

                                    {/* Latitude & Longitude */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Latitude</label>
                                                <input type="text" className="form-control" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude Place" disabled />
                                            </div>
                                            {validation.latitude && (
                                                <div className="alert alert-danger">
                                                    {validation.latitude[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Longitude</label>
                                                <input type="text" className="form-control" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude Place" disabled />
                                            </div>
                                            {validation.longitude && (
                                                <div className="alert alert-danger">
                                                    {validation.longitude[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* End Latitude & Longitude */}

                                    {/* Mapbox */}
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <div ref={mapContainer} className="map-container" />
                                        </div>
                                    </div>
                                    {/* End Mapbox */}

                                    {/* Button */}
                                    <div>
                                        <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> SAVE</button>
                                        <button type="reset" className="btn btn-md btn-warning me-2"><i className="fa fa-redo"></i> RESET</button>
                                        <Link to="/admin/places">
                                            <button type="reset" className="btn btn-md btn-dark"><i className="fas fa-arrow-circle-left"></i>  Kembali</button>
                                        </Link>
                                    </div>
                                    {/* End Button */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </>
    )
}

export default EditPlace;