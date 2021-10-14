import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar'

const Header = ({logo, user, login, logout, setInput, search}) => {
    return (
        <Navbar className="navbar" bg="dark" variant="dark">
            <Container className="container-fluid">
                <Navbar.Brand className="navbar-brand" href="#home">
                    <img alt="Good Listens Logo" src={logo} width="100" height="100" className="d-inline-block align-center" />
                    {' '}
                    GoodListens
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav className="nav justify-content-end" >
                        <Nav.Link className="nav-link" href="#home" >Home</Nav.Link>
                        <Nav.Link className="nav-link" href="#link" >About</Nav.Link>
                        {user ?
                            // <Nav.Link className="nav-link" onClick={() => logout} >SignOut</Nav.Link> 
                            <Nav.Link className="nav-link" onClick={logout} > Sign Out </Nav.Link> :
                            <Nav.Link className="nav-link" onClick={login} > Sign In </Nav.Link>
                            // <Nav.Link className="nav-link" onClick={console.log('sign out')} >SignIn</Nav.Link>
                        }
                        {/* <form onSubmit={search}> 
                            <Form className="d-flex" >
                                <FormControl onChange={(e)=>setInput(e.target.value)}
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button type="submit" variant="outline-light">Search</Button>
                            </Form>
                        </form> */}

                        <SearchBar SearchBar = {SearchBar} />
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default Header
