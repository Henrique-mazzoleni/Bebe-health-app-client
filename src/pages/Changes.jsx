import { Form, Table, Alert, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import PaginationUI from "../components/UI/Pagination";

import axios from "axios";

function Changes() {
  const navigate = useNavigate();
  const { childId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  // New change useStates

  const [dateAndTime, setDateAndTime] = useState("");
  const [kind, setKind] = useState("");
  const [consistency, setConsistency] = useState("");
  const [error, setError] = useState("");
  const [changes, setChanges] = useState([]);
  const [weekAverage, setWeekAverage] = useState(0);
  const [monthAverage, setMonthAverage] = useState(0);
  const [allTimeAverage, setAllTimeAverage] = useState(0);

  // Pagination Code

  const [activePage, setActivePage] = useState(1);
  const [noOfItems, setNoOfItems] = useState(1);

  const getPageChanges = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/changes/${childId}?page=${activePage}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setChanges(response.data.changes);
        setNoOfItems(response.data.noOfItems);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const getAverages = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/changes/average/${childId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setWeekAverage(response.data.weeksDailyAverage)
        setMonthAverage(response.data.monthsDailyAverage)
        setAllTimeAverage(response.data.allTimeAverage)
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  useEffect(() => {
    getPageChanges();
    getAverages();
  }, [activePage]);

  const changePageHandler = (page) => {
    setActivePage(page);
  };

  const dateAndTimeHandler = (e) => setDateAndTime(e.target.value);
  const kindHandler = (e) => setKind(e.target.value);
  const consistencyHandler = (e) => setConsistency(e.target.value);

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
        getPageChanges();
        getAverages();
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
        <h1>Changes</h1>

        <div className="statsContainer">
          <div className="stat">
            <h3>Week Average</h3>
            <h2>{weekAverage.toFixed(1)} Dirty dipers / day</h2>
            </div>
          <div className="stat">
            <h3>Month Average</h3>
            <h2>{monthAverage.toFixed(1)} Dirty dipers / day</h2>
            </div>
          <div className="stat">
            <h3>All Average</h3>
            <h2>{allTimeAverage.toFixed(1)} Dirty dipers / day</h2>
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
                  <th>Date and Time</th>
                  <th>Kind</th>
                  <th>consistency</th>
                  <th></th>
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
                        {date.toLocaleDateString()}{" "}
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{change.kind}</td>
                      <td>{change.consistency ? change.consistency : "N/A"}</td>
                      <td>
                        <Button
                          className="btnDelete"
                          href={`/changes/${childId}/${change._id}`}
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
