import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  // Form useStates

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState("");

  // useNavigate for redirect once signed up

  const navigate = useNavigate();

  // Handler for submission of signup forms

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5005/auth/signup", {
        email,
        password,
        name,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => setError(error.response.data.message));
  };

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const nameHandler = (e) => setName(e.target.value);

  return (

    // Signup Form

    <main>
    <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailHandler}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={nameHandler}
            value={name}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>

    {/* Error Handling */}

        {error && (
          <Alert key="danger" variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </main>
  );
}

export default Signup;
