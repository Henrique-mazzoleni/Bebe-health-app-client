import React from 'react'
import { Form, Table } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Alert, Button } from 'react-bootstrap'

function AmendSleep() {
  return (
    <div><aside>
    <Sidebar/>
  </aside>
  <main>
  <div className='addNew'>

<h3>Amend a Sleep Entry</h3>
<Form 
// onSubmit={submitHandler}
>
        <Form.Group className="mb-3" controlId="formGroupStartTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            // onChange={startTimeHandler}
            // value={startTime}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
            type="datetime-local"
            // onChange={endTimeHandler}
            // value={endTime}
          />
        </Form.Group>
              
        <Form.Group className="mb-3" controlId="formGroupLocation">
        <Form.Label>Location</Form.Label>
        <Form.Select aria-label="location" 
        // onChange={locationHandler}
        >
              <option>Location</option>
                <option className="dropDown" value="Parents Bed">Parents Bed</option>
                <option className="dropDown" value="Crib">Crib</option>
                <option className="dropDown" value="Stroller">Stroller</option>
                <option className="dropDown" value="Car">Car</option>
        </Form.Select>
        </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <br />
              <Button type="submit"  className="btnDelete">
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

export default AmendSleep