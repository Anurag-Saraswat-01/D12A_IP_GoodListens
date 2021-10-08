import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'
import logo from './images/logo.png';
import bgimage from './images/music2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" style = {{ fontSize: "36px"}}>
            <img
              alt=""
              src={logo}
              width="120"
              height="120"
              className="d-inline-block align-center"
            />{' '}
            GoodListens

          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <Nav style = {{ gap: "25px"}} className="justify-content-end" >
              <Nav.Link href="#home" style={{ fontSize: "25px" }}>Home</Nav.Link>
              <Nav.Link href="#link" style={{ fontSize: "25px" }}>About</Nav.Link>
              <Form className="d-flex" style = {{ height: "40px", marginTop: "10px"}}>
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

      <div className="bg-image">
        <img src={bgimage} alt="" width="100%" height="auto" />
      </div>

    </div>
  );
}

export default App;
