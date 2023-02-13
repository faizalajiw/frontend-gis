//import pagination
import Pagination from "react-js-pagination";

function PaginationComponent(props) {
  return (
    props.total > 0 && (
      <Pagination
        innerClass={`pagination justify-content-${props.position} mb-0`} //posisi halaman
        activePage={props.currentPage} //halaman yg sedang aktif
        activeClass="page-item active" 
        itemsCountPerPage={props.perPage} //jumlah data per halaman
        totalItemsCount={props.total} //total data 
        onChange={props.onChange} //mengganti halaman
        itemClass="page-item"
        linkClass="page-link"
      />
    )
  );
}

export default PaginationComponent;
