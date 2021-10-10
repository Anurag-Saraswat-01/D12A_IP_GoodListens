import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


const Header = ({ logo }) => {

    return (
        <Navbar className="navbar" bg="dark" variant="dark">
            <Container className="container-fluid">
                <Navbar.Brand className="navbar-brand" href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="100"
                        height="100"
                        className="d-inline-block align-center"
                    />{' '}
                    GoodListens
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav className="nav justify-content-end" >
                        <Nav.Link className="nav-link" href="#home" >Home</Nav.Link>
                        <Nav.Link className="nav-link" href="#link" >About</Nav.Link>
                        <Nav.Link className="nav-link" href="#home" >SignIn</Nav.Link>
                        <Form className="d-flex" >
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    )
}

export default Header
