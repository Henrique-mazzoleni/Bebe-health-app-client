import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, Fragment, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import Logo from '../assets/images/bebehealthlogo.jpg'
import axios from 'axios'
const API_URL = "http://localhost:5005";
function HeaderNav() {

 
  const {isLoggedIn, logOutUser} = useContext(AuthContext)

  const [user, setUser] = useState();

  const storedToken = localStorage.getItem("authToken");

  
  const loadUser = () => {
    axios
      .get(`${API_URL}/api/parent`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  };

  useEffect(() => {
    loadUser();
    
  }, []);
  console.log(user)
  return (
    <>
    <div className='logo'><a href="/"><img src={Logo}/></a><Navbar.Brand href="/">Bebe Health Tracker</Navbar.Brand></div>
    <Navbar className="headerNav" collapseOnSelect expand="lg">
      <Container>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isLoggedIn && <Fragment>            
            <NavDropdown title="Children" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">All Children</NavDropdown.Item>
              {user?.children.map((singleChild)=>{
                return <NavDropdown.Item href={`/child/${singleChild._id}`}>
                {singleChild.name}
              </NavDropdown.Item>
            })}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/newchild">
                Add another child
              </NavDropdown.Item>
            </NavDropdown>
            </Fragment>}
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