import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Form  from 'react-bootstrap/Form';
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import Sidebar from '../components/Sidebar';

function AmendChild() {
  return (
    <div><aside>
    <Sidebar/>
  </aside>
  <main>
  <div className='addNew'>

  <h1>Amend a Child</h1>
 
 <Form 
//  onSubmit={submitHandler}
 >
   <Form.Group className="mb-3" controlId="formGroupName">
     <Form.Label>Name</Form.Label>
     <Form.Control
       type="text"
       placeholder="Enter Childs Name"
    //    onChange={nameHandler}
    //    value={name}
     />
   </Form.Group>
   <Form.Group className="mb-3" controlId="formGroupdateOfBirth">
     <Form.Label>Date of Birth</Form.Label>
     <Form.Control
       type="date"
       placeholder="Date of Birth"
    //    onChange={dateOfBirthHandler}
    //    value={dateOfBirth}
     />
   </Form.Group>
   <Form.Group className="mb-3" controlId="formGroupGender">
     <Form.Label>Gender</Form.Label>
     <Form.Control
       type="text"
       placeholder="Gender"
    //    onChange={genderHandler}
    //    value={gender}
     />
   </Form.Group>
   <Form.Group className="mb-3" controlId="formGroupWeightAtBirth">
     <Form.Label>Weight at Birth</Form.Label>
     <Form.Control
       type="text"
       placeholder="Weight at Birth"
    //    onChange={weightAtBirthHandler}
    //    value={weightAtBirth}
     />
   </Form.Group>
   <Form.Group className="mb-3" controlId="formGroupSizeAtBirth">
     <Form.Label>Size at Birth</Form.Label>
     <Form.Control
       type="text"
       placeholder="Size at Birth"
    //    onChange={sizeAtBirthHandler}
    //    value={sizeAtBirth}
     />
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

export default AmendChild