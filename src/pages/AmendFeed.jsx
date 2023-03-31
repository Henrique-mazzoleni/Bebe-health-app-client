import React from 'react'
import { Form, Table } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Alert, Button } from 'react-bootstrap'

function AmendFeed() {
  return (
    <div><aside>
    <Sidebar/>
  </aside>
  <main>
  <div className='addNew'>

<h3>Amend a Feed Entry</h3>
<Form 
// onSubmit={submitHandler}
>
<Form.Group className="mb-3" controlId="formGroupDateAndTime">
          <Form.Label>Date and Time</Form.Label>
          <Form.Control
            type="datetime-local"
            placeholder="Date and Time"
            // onChange={dateAndTimeHandler}
            // value={dateAndTime}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupKind">
            <Form.Label>Kind</Form.Label>
            <Form.Select aria-label="kind" 
            // onChange={kindHandler}
            >
              <option>Feed Kind</option>
              
                <option className="dropDown" value="breast">Breast</option>
                <option className="dropDown" value="bottle">Bottle</option>
             
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupRightBreastDuration">
          <Form.Label>Right Breast Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Duration"
            // onChange={rightBreastDurationHandler}
            // value={rightBreastDuration}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupleftBreastDuration">
          <Form.Label>Left Breast Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Duration"
            // onChange={leftBreastDurationHandler}
            // value={leftBreastDuration}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupBottleVolume">
          <Form.Label>Bottle Volume</Form.Label>
          <Form.Control
            type="number"
            placeholder="Bottle Volume"
            // onChange={bottleVolumeHandler}
            // value={bottleVolume}
          />
          </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGroupThrowUp">
        <Form.Label>Throw Up</Form.Label>
        <Form.Select aria-label="throwup" 
        // onChange={throwUpHandler}
        >
              <option>Throw Up</option>
              
                <option className="dropDown" value={true}>Yes</option>
                <option className="dropDown" value={false}>No</option>
             
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

export default AmendFeed