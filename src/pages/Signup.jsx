import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";

import axios from "axios";

function Signup() {
  // Form useStates

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // useNavigate for redirect once signed up

  const navigate = useNavigate();

  // Handlers for submission of signup forms

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const nameHandler = (e) => setName(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password,
        name,
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

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
        <Button type="submit" className="btn">
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
