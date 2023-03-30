import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Sleep from "../assets/images/sleep.jpg";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Profile() {
  const [user, setUser] = useState();

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const loadUser = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/parent`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const acceptInviteHandler = (inviteId) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/parent/invite/accept/${inviteId}`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        const child = response.data;

        navigate(`/child/${child._id}`);
      });
  };

  const denyInviteHandler = async (inviteId) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/parent/invite/deny/${inviteId}`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );
    loadUser();
  };

  return (
    <Fragment>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <h1>Your Profile</h1>
        <div className="homeCards">
          {user?.children.map((singleChild) => {
            const dateObj = new Date(singleChild?.dateOfBirth);

            const dob = dateObj.toDateString();

            return (
              <Card style={{ width: "15rem" }} key={singleChild._id}>
                <Card.Img variant="top" src={Sleep} />
                <Card.Body>
                  <Card.Title>{singleChild.name}</Card.Title>
                  <Card.Text>{dob}</Card.Text>
                  <Button href={`child/${singleChild._id}`} variant="primary">
                    Go to {singleChild.name}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        {/* Invitations will be displayed here if any*/}

        {user?.invitations.length !== 0 && <h3>Your Invitations</h3>}
        {user?.invitations.map((invite) => {
          return (
            <Card style={{ width: "15rem" }} key={invite._id}>
              <Card.Body>
                <Card.Title>{invite.childToAdd.name}</Card.Title>
                <Card.Text>invite from {invite.invitationFrom.name}</Card.Text>
                <Button
                  onClick={acceptInviteHandler.bind(null, invite._id)}
                  variant="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={denyInviteHandler.bind(null, invite._id)}
                  variant="primary"
                >
                  Decline
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </main>
    </Fragment>
  );
}

export default Profile;