import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Api from "../../api";
import Cookies from "js-cookie";

function Header() {
    //state categories
    const [categories, setCategories] = useState([]);

    //modal search
    const [modal, setModal] = useState(false);

    //state keyword
    const [keyword, setKeyword] = useState("");

    //state user logged in
    const [user, setUser] = useState({});

    //history
    const history = useHistory();

    //token
    const token = Cookies.get("token");

    //function "fetchDataCategories"
    const fetchDataCategories = async () => {
        //fetching Rest API "categories"
        await Api.get('/api/web/categories')
            .then((response) => {
                //set data to state
                setCategories(response.data.data);
            });
    }

    //function "fetchDataUser"
    const fetchDataUser = async () => {

        //fetching Rest API "user"
        await Api.get('/api/admin/user', {
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            //set data to state
            setUser(response.data);
        });
    }

    //hook
    useEffect(() => {
        //call function "fetchDataCategories"
        fetchDataCategories();

        //if token already exists
        if(token) {
            //call function "fetchDataUser"
            fetchDataUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //function "searchHandler"
    const searchHandler = () => {
        //redirect with params "keyword"
        history.push(`/search?q=${keyword}`);
        //set state modal
        setModal(false);
    }

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
                            <Nav.Link onClick={() => setModal(true)} className="fw-semibold text-white me-4"><i className="fas fa-search me-2 mx-5"></i>Pencarian</Nav.Link>
                        </Nav>
                        <Nav>
                        {token 
                            ? <Link to="/admin/dashboard" className="btn btn-md btn-light fw-semibold"><i className="fa fa-user-circle mx-1"></i> {user.name}</Link>
                            : <Link as={Link} to="/admin/login" className="btn btn-md btn-light fw-semibold"><i className="fas fa-lock mx-1"></i>Login</Link>
                        }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal
                size="lg"
                show={modal}
                onHide={() => setModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    <i className="fas fa-search me-2"></i>Pencarian
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchHandler()} placeholder="..." />
                        <button onClick={searchHandler} type="submit" className="btn btn-md btn-success"><i className="fa fa-search"></i> SEARCH</button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default Header;