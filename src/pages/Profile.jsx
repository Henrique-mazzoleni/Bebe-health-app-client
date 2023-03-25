import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Sleep from "../assets/images/sleep.jpg";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Container } from "react-bootstrap";
import SideButtons from "../components/SideButtons";

const API_URL = "http://localhost:5005";

function Profile() {
  const [user, setUser] = useState();

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    axios
      .get("http://localhost:5005/api/parent", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const acceptInviteHandler = (inviteId) => {
    axios
      .post(
        `${API_URL}/api/parent/accept`,
        { inviteId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        const child = response.data;

        navigate(`/child/${child._id}`);
      });
  };

  return (
    <>
    <aside> 
      <Sidebar />
    </aside>
    <main>
      <h1>My Profile</h1>
      <div className="homeCards">
        {user?.children.map((singleChild) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Sleep} />
              <Card.Body>
                <Card.Title>{singleChild.name}</Card.Title>
                <Card.Text>{singleChild.dateOfBirth}</Card.Text>
                <Button href={`child/${singleChild._id}`} variant="primary">
                  Go to {singleChild.name}
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>


      
      

      {user?.invitations.length !== 0 && <h3>Your Invitations</h3>}
      {user?.invitations.map((invite) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{invite.childToAdd.name}</Card.Title>
              <Card.Text>invite from {invite.invitationFrom.name}</Card.Text>
              <Button
                onClick={acceptInviteHandler.bind(null, invite._id)}
                variant="primary">
                Accept
              </Button>
            </Card.Body>
          </Card>
        );
      })}
      </main>
      </>
  );
}

export default Profile;
