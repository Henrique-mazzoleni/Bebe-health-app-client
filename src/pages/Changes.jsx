import { Form, Table, Alert, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import axios from "axios";

function Changes() {
  const navigate = useNavigate();

  const { childId } = useParams();

  // New change useStates

  const [dateAndTime, setDateAndTime] = useState("");
  const [kind, setKind] = useState("");
  const [consistency, setConsistency] = useState("");
  const [error, setError] = useState("");
  const [changes, setChanges] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const dateAndTimeHandler = (e) => setDateAndTime(e.target.value);
  const kindHandler = (e) => setKind(e.target.value);
  const consistencyHandler = (e) => setConsistency(e.target.value);

  const getAllChanges = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/changes/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setChanges(response.data);
      });
  };

  useEffect(() => {
    getAllChanges();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/changes/${childId}`,
        {
          dateAndTime,
          kind,
          consistency,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setError("");
        getAllChanges();
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div>
      <aside>
        <Sidebar childId={childId} />
      </aside>
      <main>
        <h1>Changes</h1>
        <div className="columnContainer">
          <div className="col1">
            <Table className="details" striped bordered hover>
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Kind</th>
                  <th>consistency</th>
                </tr>
              </thead>
              <tbody>
                {changes.map((change) => {
                  const date = new Date(change.dateAndTime);

                  return (
                    <tr
                      key={change._id}
                      onClick={() => {
                        navigate(`/changes/${childId}/${change._id}`);
                      }}
                    >
                      <td>
                        {date.toLocaleDateString()}
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{change.kind}</td>
                      <td>{change.consistency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <div className="addNew">
            <h3>Add new Change</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formGroupDateAndTime">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Date and Time"
                  onChange={dateAndTimeHandler}
                  value={dateAndTime}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupKind">
                <Form.Label>Kind</Form.Label>
                <Form.Select aria-label="kind" onChange={kindHandler}>
                  <option>Change Kind</option>

                  <option className="dropDown" value="wet">
                    Wet
                  </option>
                  <option className="dropDown" value="dirty">
                    Dirty
                  </option>
                  <option className="dropDown" value="nothing">
                    Nothing
                  </option>
                  <option className="dropDown" value="both">
                    Both
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupConsistency">
                <Form.Label>Consistency</Form.Label>
                <Form.Select aria-label="kind" onChange={consistencyHandler}>
                  <option>Consistency</option>

                  <option className="dropDown" value="liquid">
                    Liquid
                  </option>
                  <option className="dropDown" value="runny">
                    Runny
                  </option>
                  <option className="dropDown" value="soft">
                    Soft
                  </option>
                  <option className="dropDown" value="Solid">
                    Solid
                  </option>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default Changes;
