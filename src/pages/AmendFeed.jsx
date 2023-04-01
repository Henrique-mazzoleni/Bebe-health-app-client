import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Form, Alert, Button } from "react-bootstrap";

import Sidebar from "../components/Sidebar";

import axios from "axios";

import dateTimeTransform from "../helpers/dateTimeTransform";

function AmendFeed() {
  const navigate = useNavigate();

  const { childId, feedId } = useParams();

  const [dateAndTime, setDateAndTime] = useState("");
  const [kind, setKind] = useState("");
  const [rightBreastDuration, setRightBreastDuration] = useState("");
  const [leftBreastDuration, setLeftBreastDuration] = useState("");
  const [bottleVolume, setBottleVolume] = useState("");
  const [throwUp, setThrowUp] = useState("");
  const [error, setError] = useState("");
  
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/feeds/${childId}/${feedId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const {
          dateAndTime,
          kind,
          rightBreastDuration,
          leftBreastDuration,
          bottleVolume,
          throwUp,
        } = response.data;

        setDateAndTime(dateTimeTransform(dateAndTime));
        setKind(kind);
        setRightBreastDuration(rightBreastDuration);
        setLeftBreastDuration(leftBreastDuration);
        setBottleVolume(bottleVolume);
        setThrowUp(throwUp);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const dateAndTimeHandler = (e) => setDateAndTime(e.target.value);
  const kindHandler = (e) => setKind(e.target.value);
  const rightBreastDurationHandler = (e) =>
    setRightBreastDuration(e.target.value);
  const leftBreastDurationHandler = (e) =>
    setLeftBreastDuration(e.target.value);
  const bottleVolumeHandler = (e) => setBottleVolume(e.target.value);
  const throwUpHandler = (e) => setThrowUp(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/feeds/${childId}/${feedId}`,
        {
          dateAndTime,
          kind,
          rightBreastDuration,
          leftBreastDuration,
          bottleVolume,
          throwUp,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/feeds/${childId}`);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const deleteHandler = () => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/feeds/${childId}/${feedId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/feeds/${childId}`);
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
          <h3>Amend a Feed Entry</h3>
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
                <option>Feed Kind</option>

                <option className="dropDown" value="breast">
                  Breast
                </option>
                <option className="dropDown" value="bottle">
                  Bottle
                </option>
              </Form.Select>
            </Form.Group>
            {kind === "breast" ? (
              <Fragment>
                <Form.Group
                  className="mb-3"
                  controlId="formGroupRightBreastDuration"
                >
                  <Form.Label>Right Breast Duration</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Duration"
                    onChange={rightBreastDurationHandler}
                    value={rightBreastDuration}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formGroupleftBreastDuration"
                >
                  <Form.Label>Left Breast Duration</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Duration"
                    onChange={leftBreastDurationHandler}
                    value={leftBreastDuration}
                  />
                </Form.Group>
              </Fragment>
            ) : (
              <Form.Group className="mb-3" controlId="formGroupBottleVolume">
                <Form.Label>Bottle Volume</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Bottle Volume"
                  onChange={bottleVolumeHandler}
                  value={bottleVolume}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formGroupThrowUp">
              <Form.Label>Throw Up</Form.Label>
              <Form.Select
                aria-label="throwup"
                onChange={throwUpHandler}
                value={throwUp}
              >
                <option>Throw Up</option>

                <option className="dropDown" value={true}>
                  Yes
                </option>
                <option className="dropDown" value={false}>
                  No
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

export default AmendFeed;
