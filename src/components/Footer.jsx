import React from "react";
import Logo from "../assets/images/bebehealthlogo.png";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect, Fragment } from "react";
const API_URL = "http://localhost:5005";
import axios from "axios";

function Footer() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
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
  return (
    <div className="footer">
      <nav className="navbar fixed-bottom bg-dark">
        <Container>
          <div class="container-fluid">
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
