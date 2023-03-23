import React from 'react'
import { Form } from 'react-bootstrap'

function Invite() {

    const [email, setEmail] = useState();
    const [child, setChild] = useState();


    const emailHandler = (e) => setEmail(e.target.value);
    const childHandler = (e) => setChild(e.target.value);


  return (
    <>
    <div><h1>Invite</h1>
    
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email to invite</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter other gaurdians email"
            onChange={emailHandler}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupChild">
          <Form.Label>Children</Form.Label>
          <Form.Select aria-label="children">
          
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Form.Group>
        </Form>
    
    </div>


    </>
  )
}

export default Invite