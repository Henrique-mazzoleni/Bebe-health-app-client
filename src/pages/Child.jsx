import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavCards from "../components/NavCards";
import Sidebar from "../components/Sidebar";
import { Table } from "react-bootstrap";

function Child() {
  const [child, setChild] = useState();
  const { childId } = useParams();
  const storedToken = localStorage.getItem("authToken");
  
  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/child/${childId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        
        setChild(response.data);
     
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

        <Table className="details" striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Weight at Birth</th>
              <th>Size at Birth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{child?.name}</td>
              <td>{dob}</td>
              <td>{child?.gender}</td>
              <td>{child?.weightAtBirth}</td>
              <td>{child?.sizeAtBirth}</td>
            </tr>
          </tbody>
        </Table>

        {/* Navigation cards section */}

        <div>
          <NavCards childId={childId} />


        </div>
      </main>
    </div>
  );
}

export default Child;
