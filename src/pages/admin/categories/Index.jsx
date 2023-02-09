import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import PaginationComponent from "../../../components/utilities/Pagination";
import Api from "../../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function CategoriesIndex() {
  document.title = "Kategori Admin";
  //state 
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const token = Cookies.get("token");

  //function "fetchData"
  const fetchData = async (pageNumber, searchData) => {
    const searchQuery = searchData ? searchData : search;
    const page = pageNumber ? pageNumber : currentPage;

    //fetching data from Rest API
    await Api.get(`/api/admin/categories?q=${searchQuery}&page=${page}`, {
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

  //function "searchHandler"
  const searchHandlder = (e) => {
    e.preventDefault();

    //call function "fetchDataPost" with params
    fetchData(1, search)
  }

  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-header">
                <span className="fw-bold">Kategori</span>
              </div>
              <div className="card-body">
                <form onSubmit={searchHandlder} className="form-group">
                  <div className="input-group mb-3">
                    <Link to="/admin/categories/create" className="btn btn-md btn-success"><i className="fa fa-plus-circle"> </i></Link>
                    <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="cari detail kategori" />
                    <button type="submit" className="btn btn-md btn-success"><i className="fa fa-search"></i> Cari</button>
                  </div>
                </form>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">No</th>
                        <th scope="col">Gambar</th>
                        <th scope="col">Detail Kategori</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, index) => (
                        <tr key={index}>
                          <td className="text-center">{++index + (currentPage - 1) * perPage}</td>
                          <td className="text-center">
                            <img src={category.image} alt="" width="50" />
                          </td>
                          <td className="text-center">{category.name}</td>
                          <td className="text-center"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationComponent
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    onChange={(pageNumber) => fetchData(pageNumber)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  )
}

export default CategoriesIndex