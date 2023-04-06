import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import axios from "axios";

import NavCards from "../components/NavCards";
import Sidebar from "../components/Sidebar";

function Child() {
  const navigate = useNavigate();

  const [child, setChild] = useState();
  const { childId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/child/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setChild(response.data);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  // Convert DateTime to Date only

  const dateObj = new Date(child?.dateOfBirth);

  const dob = dateObj.toDateString();

  return (
    <div>
      <aside>
        <Sidebar childId={childId} />
      </aside>
      <main>
        {/* Children Details Table */}

        <h1>Details for {child?.name}</h1>
        <div className="columnContainer">
          <div className="col1">
        <Table className="details" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Weight at Birth</th>
              <th>Size at Birth</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={() => {
                navigate(`/ammendChild/${child?._id}`);
              }}
            >
              <td>{child?.name}</td>
              <td>{dob}</td>
              <td>{child?.gender}</td>
              <td>{child?.weightAtBirth}</td>
              <td>{child?.sizeAtBirth}</td>
              <td>
                <Button
                  href={`/ammendChild/${child?._id}`}
                  className="btnDelete"
                >
                  Amend/Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>

        {/* Navigation cards section */}

        <div>
          <NavCards childId={childId} />
        </div>
        </div>
        </div>
      </main>
    </div>
  );
}

export default Child;
