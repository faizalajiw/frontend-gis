import React, { useState, useEffect } from "react";
import LayoutWeb from "../../../layouts/Web";
import Slider from '../../../components/web/Slider';
import CardCategory from "../../../components/utilities/CardCategory";
import { useHistory } from "react-router-dom";

//import BASE URL API
import Api from "../../../api";

function WebIndexHome() {
  //title page
  document.title = "Travelin";

  //history
  const history = useHistory();

  //state categories
  const [categories, setCategories] = useState([]);

  //state keyword
  const [keyword, setKeyword] = useState("");

  //function "fetchDataCategories"
  const fetchDataCategories = async () => {
    //fetching Rest API
    await Api.get('/api/web/categories')
      .then((response) => {
        //set data to state
        setCategories(response.data.data)
      })
  }

  //hook
  useEffect(() => {
    //call function "fetchDataCategories"
    fetchDataCategories();
  }, []);

  //function "searchHandler"
  const searchHandler = () => {
    //redirect with params "keyword"
    history.push(`/search?q=${keyword}`);
  }

  return (
    <React.Fragment>
      <LayoutWeb>

        <Slider />

        <div className="container mb-5">
          <div className="row mt-minus-87">
            <div className="col-md-2"></div>
            {/* FORM SEARCHING */} 
            <div className="col-md-8">
              <div className="card border-0 rounded-4 shadow-sm">
                <div className="card-body py-5 px-5">
                  <h5>
                    <i className="fas fa-search me-2"></i>Cari Tempat Pilihan Kamu
                  </h5>
                  <br />
                  <input type="text" className="form-control form-control-lg" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchHandler()} placeholder="....." />
                </div>
              </div>
            </div>
            {/* END FORM SEARCHING */}
            <div className="col-md-2"></div>
          </div>
          {/* TITLE KATEGORI */}
          <div className="col-md-12 mt-5 text-center">
            <h4 className="fw-semibold">Kategori</h4>
            <br />
          </div>
          {/* END TITLE KATEGORI */}
          {/* KATEGORI */}
          <div className="row justify-content-center mt-4">
            {
              categories.map((category) => (
                <CardCategory
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  slug={category.slug}
                  image={category.image}
                />
              ))
            }
          </div>
          {/* END KATEGORI */}
        </div>

      </LayoutWeb>
    </React.Fragment>
  );
}

export default WebIndexHome;