import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5005/auth/login", {
        email,
        password,
       })
      .then((response) => {
        console.log(response.data);
        navigate("/Profile");
      })
      .catch((error) => setError(error.response.data.message));
  };

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  
  return (
    <div className="contentContainer">
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


        <Button type="submit" variant="primary">
          Submit
        </Button>
        {error && (
          <Alert key="danger" variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default Login;
