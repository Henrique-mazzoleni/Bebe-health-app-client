import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function AmendChild() {
  const { childId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [weightAtBirth, setWeightAtBirth] = useState("");
  const [sizeAtBirth, setSizeAtBirth] = useState("");
  const [error, setError] = useState("");

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/child/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const { name, dateOfBirth, gender, weightAtBirth, sizeAtBirth } =
          response.data;

        setName(name);
        setDateOfBirth(dateOfBirth.split("T")[0]);
        setGender(gender);
        setWeightAtBirth(weightAtBirth);
        setSizeAtBirth(sizeAtBirth);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const nameHandler = (e) => setName(e.target.value);
  const dateOfBirthHandler = (e) => setDateOfBirth(e.target.value);
  const genderHandler = (e) => setGender(e.target.value);
  const weightAtBirthHandler = (e) => setWeightAtBirth(e.target.value);
  const sizeAtBirthHandler = (e) => setSizeAtBirth(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/child/${childId}`,
        {
          name,
          dateOfBirth,
          gender,
          weightAtBirth,
          sizeAtBirth,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        navigate(`/child/${childId}`);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const deleteHandler = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/child/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/profile");
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
          <h1>Amend a Child</h1>

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
            <br />
            <Button className="btnDelete" onClick={deleteHandler}>
              Delete
            </Button>
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

export default AmendChild;
