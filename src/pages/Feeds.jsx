import { Alert, Button, Form, Table } from "react-bootstrap";

import { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import axios from "axios";

function Feeds() {
  const navigate = useNavigate();

  const { childId } = useParams();

  const [dateAndTime, setDateAndTime] = useState("");
  const [kind, setKind] = useState("breast");
  const [rightBreastDuration, setRightBreastDuration] = useState("");
  const [leftBreastDuration, setLeftBreastDuration] = useState("");
  const [bottleVolume, setBottleVolume] = useState("");
  const [throwUp, setThrowUp] = useState("");
  const [error, setError] = useState("");
  const [feeds, setFeeds] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getAllFeeds = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/feeds/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  useEffect(() => {
    getAllFeeds();
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
      .post(
        `${import.meta.env.VITE_API_URL}/api/feeds/${childId}`,
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
        getAllFeeds();
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <aside>
        <Sidebar childId={childId} />
      </aside>
      <main>
        <h1>Feeds</h1>
        <div className="columnContainer">
          <div className="col1">
            <Table className="details" striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Kind</th>
                  <th>Right Breast Duration</th>
                  <th>Left Breast Duration</th>
                  <th>Bottle Volume</th>
                  <th>Throw Up</th>
                </tr>
              </thead>
              <tbody>
                {feeds.map((feed) => {
                  const date = new Date(feed.dateAndTime);

                  return (
                    <tr
                      key={feed._id}
                      onClick={() => {
                        navigate(`/feeds/${childId}/${feed._id}`);
                      }}
                    >
                      <td>
                        {date.toLocaleDateString()} {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{feed.kind}</td>
                      <td>
                        {feed.rightBreastDuration
                          ? feed.rightBreastDuration
                          : "N/A"}
                      </td>
                      <td>
                        {feed.leftBreastDuration
                          ? feed.leftBreastDuration
                          : "N/A"}
                      </td>
                      <td>{feed.bottleVolume ? feed.bottleVolume : "N/A"}</td>
                      <td>{feed.throwUp ? "Yes" : "No"}</td>
                      <td>
                        <Button
                          href={`/feeds/${childId}/${feed._id}`}
                          className="btnDelete"
                        >
                          Amend/Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="addNew">
            <h3>Add new Feed</h3>
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

export default Feeds;
