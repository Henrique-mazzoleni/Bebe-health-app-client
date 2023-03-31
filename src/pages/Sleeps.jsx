import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Form, Table } from "react-bootstrap";
import { Alert, Button } from "react-bootstrap";

import Sidebar from "../components/Sidebar";

import axios from "axios";

function Sleeps() {
  const { childId } = useParams();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [sleeps, setSleeps] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getAllSleeps = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/sleeps/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setSleeps(response.data);
      });
  };

  useEffect(() => {
    getAllSleeps();
  }, []);

  const startTimeHandler = (e) => setStartTime(e.target.value);
  const endTimeHandler = (e) => setEndTime(e.target.value);
  const locationHandler = (e) => setLocation(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/sleeps/${childId}`,
        {
          startTime,
          endTime,
          location,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        getAllSleeps();
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div>
      <aside>
        <Sidebar childId={childId} />
      </aside>
      <main>
        <h1>Sleeps</h1>
        <div className="columnContainer">
          <div className="col1">
            <Table className="details" striped bordered hover>
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {sleeps.map((sleep) => {
                  const startTime = new Date(sleep.startTime);
                  const endTime = new Date(sleep.endTime);

                  return (
                    <tr key={sleep._id}>
                      <td>
                        {startTime.toLocaleDateString()}
                        {startTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        {endTime.toLocaleDateString()}
                        {endTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{sleep.duration} Hours</td>
                      <td>{sleep.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="addNew">
            <h3>Add new Feed</h3>
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
                <Form.Select aria-label="location" onChange={locationHandler}>
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
              <Button type="submit">
                Submit
              </Button>
              {error && (
                <Alert key="danger" variant="danger">
                  {error}
                </Alert>
              )}
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sleeps;
