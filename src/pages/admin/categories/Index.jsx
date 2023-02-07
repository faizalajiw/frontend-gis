import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Cookies from "js-cookie";
import Api from "../../../api";
import { Link } from "react-router-dom";

function CategoriesIndex() {
  //title page
  document.title = "Kategori Admin";
  //state
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  //token 
  const token = Cookies.get("token");

  //function "fetchData"
  const fetchData = async () => {
    const searchQuery = searchData ? searchData : search;
    //fetching data from Rest API
    await Api.get('/api/admin/categories', {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        //set data response to state "categories"
        setCategories(response.data.data.data);
        //set currentPage
        setCurrentPage(response.data.data.current_page);
        //set perPage
        setPerPage(response.data.data.per_page);
        //total
        setTotal(response.data.data.total);
      });
  };

  //hook
  useEffect(() => {
    //call function "fetchData"
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-12">
            {/* Card Table */}
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <b className="font-weight-bold">Kategori</b>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Gambar</th>
                        <th scope="col">Nama Kategori</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    {/* Content */}
                    <tbody>
                      {categories.map((category, index) => (
                        <tr key={index}>
                          <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                          <td className="text-center">
                            <img src={category.image} alt="" width="50" />
                          </td>
                          <td>{category.name}</td>
                          <td className="text-center"></td>
                        </tr>
                      ))}
                    </tbody>
                    {/* End Content */}
                  </table>
                </div>
              </div>
            </div>
            {/* End Card Table */}
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  )

}

export default CategoriesIndex