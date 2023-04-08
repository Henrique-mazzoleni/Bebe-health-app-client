import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Form, Table } from "react-bootstrap";
import { Alert, Button } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import PaginationUI from "../components/UI/Pagination";

import axios from "axios";

function Sleeps() {
  const navigate = useNavigate();
  const { childId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [sleeps, setSleeps] = useState([]);
  const [average, setAverage] = useState(0);
  const [window, setWindow] = useState(0);
  const [goal, setGoal] = useState({})

  // Pagination Code

  const [activePage, setActivePage] = useState(1);
  const [noOfItems, setNoOfItems] = useState(1);

  const getPageSleeps = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/sleeps/${childId}?page=${activePage}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setSleeps(response.data.sleeps);
        setNoOfItems(response.data.noOfItems);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const weekDailyAverage = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/sleeps/average/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAverage(response.data.dailyAverage);
        setWindow(response.data.window);
        setGoal(response.data.goal);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    getPageSleeps();
    weekDailyAverage();
  }, [activePage]);

  const changePageHandler = (page) => setActivePage(page);

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
        setError("");
        getPageSleeps();
        weekDailyAverage();
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
        <h1>Sleeps</h1>


        <div className="statsContainer">
          <div className="stat">
            <h3>Day Average</h3>
            <h1>{average.toFixed(2)} Hours</h1>
            </div>
          <div className="stat">
            <h3>Sleep Window</h3>
            <h1>{window.toFixed(2)} Hours</h1>
            </div>
          {/* If statement to decide which styling to use */}
          {/* <div className="inRange">
            <div className="outRange"> */}


            <div className="stat">
            <h3>Goal</h3>
            <h1>{goal.min}-{goal.max} Hours</h1>
            </div>

            


          
          


        </div>

        <PaginationUI
          noOfItems={noOfItems}
          activePage={activePage}
          onPageClick={changePageHandler}
        />

        <div className="columnContainer">
          <div className="col1">
            <Table className="details" striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {sleeps?.map((sleep) => {
                  const startTime = new Date(sleep.startTime);
                  const endTime = new Date(sleep.endTime);

                  return (
                    <tr
                      key={sleep._id}
                      onClick={() =>
                        navigate(`/sleeps/${childId}/${sleep._id}`)
                      }
                    >
                      <td>
                        {startTime.toLocaleDateString()}{" "}
                        {startTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        {endTime.toLocaleDateString()}{" "}
                        {endTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{sleep.duration} Hours</td>
                      <td>{sleep.location}</td>
                      <td>
                        <Button
                          href={`/sleeps/${childId}/${sleep._id}`}
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
            <h3>Add new Sleep</h3>
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
              <Button type="submit">Submit</Button>
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
