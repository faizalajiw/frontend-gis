import { Link } from "react-router-dom";

function CardPlace(props) {

    return (
        <div className="col-md-6 mb-5" key={props.id}>
            <Link to={`/places/${props.slug}`} className="text-decoration-none text-dark">
                <div className="card border-0 rounded shadow-sm mb-3" style={{ maxWidth: "640px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            {
                                props.images.slice(0, 1).map((placeImage) => (
                                    <img src={placeImage.image} className="img-fluid rounded-start" alt="..." style={{ width: "100%", height: "100%", objectFit: "cover" }} key={placeImage.id} />
                                ))
                            }
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <br />
                                <h5 className="card-title fw-semibold">{props.title}</h5>
                                <p className="card-text"><i className="fas fa-map-marker-alt me-2"></i>{props.address}</p>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardPlace;