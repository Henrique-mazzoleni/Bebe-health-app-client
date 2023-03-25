import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, Fragment } from 'react';
import { AuthContext } from '../context/auth.context';
import Logo from '../assets/images/bebehealthlogo.jpg'

function HeaderNav() {
  const {isLoggedIn, logOutUser} = useContext(AuthContext)
  
  return (
    <>
    <div className='logo'><img src={Logo}/><Navbar.Brand href="/">Bebe Health Tracker</Navbar.Brand></div>
    <Navbar className="headerNav" collapseOnSelect expand="lg">
      <Container>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Parents" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">All Parents</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Parent 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Child 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/invite">
                Add another parent
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Children" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">All Children</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Child 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Child 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/newchild">
                Add another child
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>

         {isLoggedIn && <Fragment>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
            </Fragment>}

            {!isLoggedIn && <Fragment>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Fragment>}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default HeaderNav;