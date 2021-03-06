import SearchBar from './SearchBar'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({ logo, user, login, logout, setlang, searchTerm, setSearchTerm, search }) => {
    return (
        <Navbar className="navbar" bg="dark" variant="dark" expand="lg" >
            <Container className="container-fluid">
                <Navbar.Brand className="navbar-brand" href="/D12A_IP_GoodListens">
                    <img alt="Good Listens Logo" src={logo} width="100" height="100" className="d-inline-block align-center" />
                    GoodListens
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav className="nav justify-content-end" >
                        <Link className="nav-link" to="/D12A_IP_GoodListens" > Home </Link>
                        <Link className="nav-link" to="/D12A_IP_GoodListens/about" > About </Link>
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
