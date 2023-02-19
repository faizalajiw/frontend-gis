import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
//import BASE URL API
import Api from "../../api";

function Header() {
    //state categories
    const [categories, setCategories] = useState([]);

    //function "fetchDataCategories"
    const fetchDataCategories = async () => {
        //fetching Rest API "categories"
        await Api.get('/api/web/categories')
            .then((response) => {
                //set data to state
                setCategories(response.data.data);
            });
    }

    //hook
    useEffect(() => {
        //call function "fetchDataCategories"
        fetchDataCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" className="navbar-custom shadow-sm" fixed="top">
                <Container className="py-2">
                    <Navbar.Brand as={Link} to="/" className="fw-semibold text-white me-5"><i className="fas fa-road me-1"></i>TRAVELIN</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title={<span><i className="fas fa-bars me-2 mx-5"></i>Kategori</span>} id="collasible-nav-dropdown" className="fw-semibold text-white">
                                {
                                    categories.map((category) => (
                                        <NavDropdown.Item as={Link} to={`/category/${category.slug}`} key={category.id}><img src={category.image} style={{ width: "35px" }} alt="" /> {category.name.toUpperCase()}</NavDropdown.Item>
                                    ))
                                }
                                <NavDropdown.Divider />
                                {/* <NavDropdown.Item as={Link} to="/posts/direction">Lainnya<i className="fas fa-long-arrow-alt-right ms-2"></i></NavDropdown.Item> */}
                            </NavDropdown>
                            <Nav.Link as={Link} to="/places" className="fw-semibold text-white"><i className="fas fa-place-of-worship me-2 mx-5"></i>Tempat</Nav.Link>
                            <Nav.Link as={Link} to="/maps" className="fw-semibold text-white"><i className="fas fa-map-marker-alt me-2 mx-5"></i>Maps</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className="fw-semibold text-white me-4"><i className="fas fa-search me-2 mx-5"></i>Pencarian</Nav.Link>
                            {/* <Link to="/admin/login" className="btn btn-md btn-light"><i className="fa fa-lock me-2 mx-5"></i> LOGIN</Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default Header;