import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import axios from "axios";
import { AuthContext } from "../context/auth.context";

function Login() {
  // Form useStates

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useNavigate for redirect once logged in

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  // Handler for submission of login forms

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        storeToken(response.data.authToken);
        return authenticateUser();
      })
      .then(() => navigate("/profile"))
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    // Login Form

    <main>
    <h1>Login</h1>
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

export default Login;
