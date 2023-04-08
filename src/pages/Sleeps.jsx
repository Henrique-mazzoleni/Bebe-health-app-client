import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Form, Table } from "react-bootstrap";
import { Alert, Button } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import { Pagination } from "react-bootstrap";

import axios from "axios";

function Sleeps() {
  const navigate = useNavigate();
  const { childId } = useParams();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [sleeps, setSleeps] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  // Pagination Code

  const [activePage, setActivePage] = useState(1)
  const [noOfItems, setNoOfItems] = useState(1)
  const [items, setItems] = useState([])

  

  const getPageSleeps = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/sleeps/${childId}?page=${activePage}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setSleeps(response.data.sleeps);
        setNoOfItems(response.data.noOfItems)
        return
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    getPageSleeps();
    console.log(noOfItems)
    setItems(
      Array.from(
        {length : Math.ceil(noOfItems/10)},
        (_, index) => (
          <Pagination.Item key={index+1} active={index+1 === activePage} onClick={changePageHandler.bind(null, index+1)}>
            {index+1}
          </Pagination.Item>
    )))
  }, [noOfItems, activePage]);


  const changePageHandler = (page) => {
    console.log(page)
    setActivePage(page)
    getPageSleeps()

  
  };

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
            <h3>Day Total</h3>
            <h1>7 Hours</h1>
            </div>
          <div className="stat">
            <h3>Week Average</h3>
            <h1>7 Hours</h1>
            </div>
          <div className="stat">
            <h3>Goal</h3>
            <h1>7 Hours</h1>
            </div>


        </div>
        <Pagination>{items}</Pagination>
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
                        {startTime.toLocaleDateString()} {startTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        {endTime.toLocaleDateString()} {endTime.toLocaleTimeString([], {
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
