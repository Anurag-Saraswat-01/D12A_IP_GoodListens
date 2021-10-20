import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar'

const Header = ({ logo, user, login, logout, setlang, searchTerm, setSearchTerm, search }) => {
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
                        <Link className="nav-link" to="/" > Home </Link>
                        <Link className="nav-link" to="/about" > About </Link>
                        {/* <Nav.Link className="nav-link" href="#home" >Home</Nav.Link>
                        <Nav.Link className="nav-link" href="#link" >About</Nav.Link> */}
                        {user ?
                            <Nav.Link className="nav-link" onClick={logout} > Sign Out </Nav.Link> :
                            <Nav.Link className="nav-link" onClick={login} > Sign In </Nav.Link>
                        }
                        <form >
                            <SearchBar SearchBar={SearchBar} term={searchTerm} setTerm={setSearchTerm} />
                        </form>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default Header
