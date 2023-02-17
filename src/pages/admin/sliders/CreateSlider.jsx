import Cookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutAdmin from "../../../layouts/Admin";

export default function SliderCreate() {
    //title page
    document.title = "Sliders";

    //state
    const [image, setImage] = useState("");
    const [validation, setValidation] = useState({});

    //token
    const token = Cookies.get("token");

    //history
    const history = useHistory();

    //function "handleFileChange"
    const handleFileChange = (e) => {
        //define variable for get value image data
        const imageData = e.target.files[0]

        //check validation file
        if (!imageData.type.match('image.*')) {
            //set state "image" to null
            setImage('');

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
        }

        //assign file to state "image"
        setImage(imageData);
    }

    //function "storeSlider"
    const storeSlider = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();
        //append data to "formData"
        formData.append('image', image);

        await Api.post('/api/admin/sliders', formData, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        }).then(() => {
            //show toast
            toast.success("Data Saved Successfully!", {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            //redirect dashboard page
            history.push("/admin/sliders");
        })
            .catch((error) => {
                //set state "validation"
                setValidation(error.response.data);
            })
    }


    return (
        <>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="fw-semibold"><i className="fas fa-place-of-worship me-1"></i>TAMBAH SLIDERS</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeSlider}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Gambar</label>
                                        <input type="file" className="form-control" onChange={handleFileChange} />
                                    </div>
                                    {validation.image && (
                                        <div className="alert alert-danger">
                                            {validation.image[0]}
                                        </div>
                                    )}
                                    <div>
                                        <button type="submit" className="btn btn-md btn-success me-2"><i className="fas fa-save"></i> SAVE</button>
                                        <button type="reset" className="btn btn-md btn-warning"><i className="fas fa-redo"></i> RESET</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </>
    )
}