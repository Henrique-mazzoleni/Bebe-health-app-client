import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function NewChild() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [weightAtBirth, setWeightAtBirth] = useState("");
  const [sizeAtBirth, setSizeAtBirth] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const nameHandler = (e) => setName(e.target.value);
  const dateOfBirthHandler = (e) => setDateOfBirth(e.target.value);
  const genderHandler = (e) => setGender(e.target.value);
  const weightAtBirthHandler = (e) => setWeightAtBirth(e.target.value);
  const sizeAtBirthHandler = (e) => setSizeAtBirth(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/child`,
        {
          name,
          dateOfBirth,
          gender,
          weightAtBirth,
          sizeAtBirth,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <Fragment>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <h1>Add a Child</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Childs Name"
              onChange={nameHandler}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupdateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              onChange={dateOfBirthHandler}
              value={dateOfBirth}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Gender"
              onChange={genderHandler}
              value={gender}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupWeightAtBirth">
            <Form.Label>Weight at Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="Weight at Birth"
              onChange={weightAtBirthHandler}
              value={weightAtBirth}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupSizeAtBirth">
            <Form.Label>Size at Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="Size at Birth"
              onChange={sizeAtBirthHandler}
              value={sizeAtBirth}
            />
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

export default NewChild;
