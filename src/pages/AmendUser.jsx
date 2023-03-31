import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";

import axios from "axios";

function AmendUser() {
  return (
    <div>
    <aside>
    <Sidebar/>
  </aside>
  <main>
    <div className='addNew'>
        <h3>Amend Your Details</h3>
      <Form 
      // onSubmit={submitHandler}
      >
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            // onChange={emailHandler}
            // value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            // onChange={passwordHandler}
            // value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            // onChange={nameHandler}
            // value={name}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <br />
              <Button type="submit" variant="danger">
                Delete Account Permanently
              </Button>
<br/>
              <Alert variant="danger"><center><h4>Warning</h4> Deleting account cannot be reversed</center></Alert>
              

        {/* Error Handling */}

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

export default AmendUser