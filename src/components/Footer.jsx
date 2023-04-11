import { useContext, Fragment } from "react";

import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";

import Logo from "../assets/images/bebehealthlogo.png";

import { AuthContext } from "../context/auth.context";

function Footer() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="footer">
      <nav className="navbar fixed-bottom bg-dark">
        <Container>
          <div className="container-fluid">
            <div className="footerCell">
              <a href="/">Home</a>
              {isLoggedIn && (
                <Fragment>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
                </Fragment>
              )}

              {!isLoggedIn && (
                <Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Fragment>
              )}
            </div>
            <div className="footerCell">
              <img src={Logo} />
              <br />
              Bebe Health Tracker
            </div>
            <div className="footerCell">
              Created By
              <br />
              <a href="https://github.com/craigb2405">@craigb2405</a>
              <br />
              <a href="https://github.com/Henrique-mazzoleni">
                @Henrique-mazzoleni
              </a>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
}

export default Footer;
