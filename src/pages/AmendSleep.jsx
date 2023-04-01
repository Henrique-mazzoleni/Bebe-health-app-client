import React from "react";
import { Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";

const dateTimeTransform = (datetime) => {
  const datetimeDb = new Date(datetime).toLocaleString().split(", ");
  const date = datetimeDb[0].split(".");
  return `${date[2]}-${date[1].padStart(2, "0")}-${date[0].padStart(2, "0")}T${
    datetimeDb[1]
  }`;
};

function AmendSleep() {
  const navigate = useNavigate();

  const { childId, sleepId } = useParams();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const getSleep = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/sleeps/${childId}/${sleepId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const { startTime, endTime, location } = response.data;
        setStartTime(dateTimeTransform(startTime));
        setEndTime(dateTimeTransform(endTime));
        setLocation(location);
      });
  };

  useEffect(() => {
    getSleep();
  }, []);

  const startTimeHandler = (e) => setStartTime(e.target.value);
  const endTimeHandler = (e) => setEndTime(e.target.value);
  const locationHandler = (e) => setLocation(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/sleeps/${childId}/${sleepId}`,
        {
          startTime,
          endTime,
          location,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/sleeps/${childId}`);
      })
      .catch((error) => setError(error.response.data.message));
  };

  const deleteHandler = () => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/sleeps/${childId}/${sleepId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/sleeps/${childId}`);
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <div className="addNew">
          <h3>Amend a Sleep Entry</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={startTimeHandler}
                value={startTime}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={endTimeHandler}
                value={endTime}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLocation">
              <Form.Label>Location</Form.Label>
              <Form.Select
                aria-label="location"
                onChange={locationHandler}
                value={location}
              >
                <option>Location</option>
                <option className="dropDown" value="Parents Bed">
                  Parents Bed
                </option>
                <option className="dropDown" value="Crib">
                  Crib
                </option>
                <option className="dropDown" value="Stroller">
                  Stroller
                </option>
                <option className="dropDown" value="Car">
                  Car
                </option>
              </Form.Select>
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

export default AmendSleep;
