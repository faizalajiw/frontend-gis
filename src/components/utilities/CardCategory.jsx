import { Link } from "react-router-dom";

function CardCategory(props) {

    return (
        <div className="col-6 col-md-3 mb-5" key={props.id}>
            <Link to={`/category/${props.slug}`} className="text-decoration-none text-dark">
                <div className="card h-100 border-0 rounded-3 shadow-sm">
                    <div className="card-body text-center">
                        <img src={props.image} style={{ width: "80px" }} alt=""/>
                        <br/>
                        <br/>
                        <h5>{props.name.toUpperCase()}</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardCategory;