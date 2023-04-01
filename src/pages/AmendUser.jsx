import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/auth.context";

import axios from "axios";

function AmendUser() {
  const navigate = useNavigate();
  const { logOutUser } = useContext(AuthContext);

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/parent`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const { name, email } = response.data;
        setNewEmail(email);
        setNewName(name);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const newEmailHandler = (e) => setNewEmail(e.target.value);
  const oldPasswordHandler = (e) => setOldPassword(e.target.value);
  const newPasswordHandler = (e) => setNewPassword(e.target.value);
  const newNameHandler = (e) => setNewName(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/parent`,
        {
          newEmail,
          oldPassword,
          newPassword,
          newName,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const deleteHandler = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/parent`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        logOutUser();
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <div className="addNew">
          <h3>Amend Your Details</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={newEmailHandler}
                value={newEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                onChange={oldPasswordHandler}
                value={oldPassword}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={newPasswordHandler}
                value={newPassword}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={newNameHandler}
                value={newName}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <br />
            <Button onClick={deleteHandler} className="btnDelete">
              Delete Account Permanently
            </Button>
            <br />
            <Alert variant="danger">
              <center>
                <h4>Warning</h4> Deleting account cannot be reversed
              </center>
            </Alert>

            {/* Error Handling */}

            {error && (
              <Alert key="danger" variant="danger">
                {error}
              </Alert>
            )}
          </Form>
        </div>
      </main>
    </div>
  );
}

export default AmendUser;
