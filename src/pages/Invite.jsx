import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Invite() {
  const [email, setEmail] = useState("");
  const [childId, setChildId] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/parent`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const emailHandler = (e) => setEmail(e.target.value);
  const childHandler = (e) => setChildId(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const invite = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/parent/invite`,
        { emailToInvite: email, childId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <aside>
        <Sidebar />
      </aside>

      <main>
        <h1>Invite</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email to invite</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter other gaurdians email"
              onChange={emailHandler}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupChild">
            <Form.Label>Children</Form.Label>
            <Form.Select aria-label="children" onChange={childHandler}>
              <option>Choose a Child</option>
              {user?.children.map((child) => (
                <option className="dropDown" value={child._id} key={child._id}>
                  {child.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          {error && (
            <Alert key="danger" variant="danger">
              {error}
            </Alert>
          )}
        </Form>
      </main>
    </Fragment>
  );
}

export default Invite;
