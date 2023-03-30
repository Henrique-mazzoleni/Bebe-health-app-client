import React from "react";
import { Form, Alert, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AmendChange() {
  return (
    <div><aside>
    <Sidebar/>
  </aside>
  <main>
  <div className="addNew">
            <h3>Amend a Change Entry</h3>
            <Form 
            // onSubmit={submitHandler}
            >
              <Form.Group className="mb-3" controlId="formGroupDateAndTime">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Date and Time"
                //   onChange={dateAndTimeHandler}
                //   value={dateAndTime}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupKind">
                <Form.Label>Kind</Form.Label>
                <Form.Select aria-label="kind" 
                // onChange={kindHandler}
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
                <Form.Select aria-label="kind" 
                // onChange={consistencyHandler}
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
              <Button type="submit" variant="danger">
                Delete
              </Button>
              {/* {error && (
                <Alert key="danger" variant="danger">
                  {error}
                </Alert>
              )} */}
            </Form>
          </div>

  </main>
  </div>
  )
}

export default AmendChange