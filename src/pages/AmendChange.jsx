import React from "react";
import { Form, Alert, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AmendChange() {
  const navigate = useNavigate();

  const { childId, changeId } = useParams();

  const [dateAndTime, setDateAndTime] = useState("");
  const [kind, setKind] = useState("");
  const [consistency, setConsistency] = useState("");
  const [error, setError] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const getChange = () => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/changes/${childId}/${changeId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        const { dateAndTime, kind, consistency } = response.data;

        const datetimeDb = new Date(dateAndTime).toLocaleString().split(", ");
        const date = datetimeDb[0].split(".");

        setDateAndTime(
          `${date[2]}-${date[1].padStart(2, "0")}-${date[0].padStart(2, "0")}T${
            datetimeDb[1]
          }`
        );
        setKind(kind);
        setConsistency(consistency);
      });
  };

  useEffect(() => {
    getChange();
  }, []);

  const dateAndTimeHandler = (e) => setDateAndTime(e.target.value);
  const kindHandler = (e) => setKind(e.target.value);
  const consistencyHandler = (e) => setConsistency(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/changes/${childId}/${changeId}`,
        {
          dateAndTime,
          kind,
          consistency,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/changes/${childId}`);
      })
      .catch((error) => setError(error.response.data.message));
  };

  const deleteHandler = () => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/changes/${childId}/${changeId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/changes/${childId}`);
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
          <h3>Amend a Change Entry</h3>
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
              <Form.Select
                aria-label="kind"
                onChange={kindHandler}
                value={kind}
              >
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
              <Form.Select
                aria-label="kind"
                onChange={consistencyHandler}
                value={consistency}
              >
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

export default AmendChange;
