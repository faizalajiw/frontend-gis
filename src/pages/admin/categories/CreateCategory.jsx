import React, { useState } from 'react'
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../api";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function CreateCategory() {
  document.title = "Kategori Admin";

  //state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [validation, setValidation] = useState({});
  const token = Cookies.get("token");
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
      toast.error("Format File not Supported!", {
        duration: 4000,
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

  //function "storeCategory"
  const storeCategory = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();
    //append data to "formData"
    formData.append('image', image);
    formData.append('name', name);

    await Api.post('/api/admin/categories', formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      //show toast
      toast.success("Berhasil Disimpan", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      //redirect dashboard page
      history.push("/admin/categories");
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
              <div className="card-body">
                <form onSubmit={storeCategory}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Gambar</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                  </div>
                  {validation.image && (
                    <div className="alert alert-danger">
                      {validation.image[0]}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama Kategori</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  {validation.name && (
                    <div className="alert alert-danger">
                      {validation.name[0]}
                    </div>
                  )}
                  <div>
                    <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i>  Simpan</button>
                    <button type="reset" className="btn btn-md btn-warning me-2"><i className="fa fa-redo"></i>  Reset</button>
                    <Link to="/admin/categories">
                      <button type="reset" className="btn btn-md btn-dark"><i class="fas fa-arrow-circle-left"></i>  Kembali</button>
                    </Link>
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

