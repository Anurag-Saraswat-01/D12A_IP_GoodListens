import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
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
                        <Nav.Link className="nav-link" href="#home" >Home</Nav.Link>
                        <Nav.Link className="nav-link" href="#link" >About</Nav.Link>
                        {user ?
                            // <Nav.Link className="nav-link" onClick={() => logout} >SignOut</Nav.Link> 
                            <Nav.Link className="nav-link" onClick={logout} > Sign Out </Nav.Link> :
                            <Nav.Link className="nav-link" onClick={login} > Sign In </Nav.Link>
                            // <Nav.Link className="nav-link" onClick={console.log('sign out')} >SignIn</Nav.Link>
                        }
                        <NavDropdown id="nav-dropdown-dark-example" title="Language" menuVariant="dark">
                            <NavDropdown.Item className="navbarDropdown" onClick={()=>setlang("English")}>English</NavDropdown.Item>
                            <NavDropdown.Item className="navbarDropdown" onClick={()=>setlang("Hindi")}>Hindi</NavDropdown.Item>
                        </NavDropdown>
                        <form onSubmit={() => { search(searchTerm) }}>
                            <SearchBar SearchBar={SearchBar} term={searchTerm} setTerm={setSearchTerm} />
                        </form>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default Header
