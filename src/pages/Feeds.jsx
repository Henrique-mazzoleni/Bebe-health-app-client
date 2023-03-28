import React from 'react'
import { Form, Table } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Alert, Button } from 'react-bootstrap'



function Feeds() {

    const [dateAndTime, setDateAndTime] = useState("");
    const [kind, setKind] = useState("");
    const [rightBreastDuration, setRightBreastDuration] = useState("");
    const [leftBreastDuration, setLeftBreastDuration] = useState("");
    const [bottleVolume, setBottleVolume] = useState("");
    const [throwUp, setThrowUp] = useState("");
    const [error, setError] = useState("");
  
    const storedToken = localStorage.getItem("authToken")
  
    const submitHandler = (e) => {
      e.preventDefault();
      axios
        .post(`http://localhost:5005/api/feeds/${childId}`, {
          dateAndTime,
          kind,
          rightBreastDuration,
          leftBreastDuration,
          bottleVolume,
          throwUp
        },
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          getAllFeeds()
        })
        .catch((error) => setError(error.response.data.message));
    };
  

    const dateAndTimeHandler = (e) => setDateAndTime(e.target.value);
    const kindHandler = (e) => setKind(e.target.value);
    const rightBreastDurationHandler = (e) => setRightBreastDuration(e.target.value);
    const leftBreastDurationHandler = (e) => setLeftBreastDuration(e.target.value);
    const bottleVolumeHandler = (e) => setBottleVolume(e.target.value);
    const throwUpHandler = (e) => setThrowUp(e.target.value);

  
  const [feeds, setFeeds] = useState([])

  const {childId} = useParams()

  const getAllFeeds = ()=>{axios.get(`http://localhost:5005/api/feeds/${childId}`,
  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    // setUser(response.data)
    setFeeds(response.data)
    console.log(response.data)
  })}
  useEffect(()=>{getAllFeeds()},[])

 

  return (
    <div><aside>
    <Sidebar childId={childId}/>
  </aside>
  <main>
    <h1>Feeds</h1>
<div className='columnContainer'>
  <div className='col1'>
  <Table className='details' striped bordered hover >
  <thead>
	<tr>
		<th>Date and Time</th>
		<th>Kind</th>
		<th>Right Breast Duration</th>
		<th>Left Breast Duration</th>
		<th>Bottle Volume</th>
    <th>Throw Up</th>
	</tr>
	</thead>
	<tbody>
  {feeds.map((feed)=>{
    const date = new Date (feed.dateAndTime)
    
    return(
    <tr>
		<td>{date.toLocaleDateString()} { date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
		<td>{feed.kind}</td>
		<td>{feed.rightBreastDuration?feed.rightBreastDuration:"N/A"}</td>
		<td>{feed.leftBreastDuration?feed.leftBreastDuration:"N/A"}</td>
		<td>{feed.bottleVolume?feed.bottleVolume:"N/A"}</td>
    <td>{feed.throwUp?"Yes":"No"}</td>
	</tr>


  )})}
	
	</tbody>
</Table>


  </div>
<div className='addNew'>

<h3>Add new Feed</h3>
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
            <Form.Select aria-label="kind" onChange={kindHandler}>
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
            onChange={rightBreastDurationHandler}
            value={rightBreastDuration}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupleftBreastDuration">
          <Form.Label>Left Breast Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Duration"
            onChange={leftBreastDurationHandler}
            value={leftBreastDuration}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupBottleVolume">
          <Form.Label>Bottle Volume</Form.Label>
          <Form.Control
            type="number"
            placeholder="Bottle Volume"
            onChange={bottleVolumeHandler}
            value={bottleVolume}
          />
          </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGroupThrowUp">
        <Form.Label>Throw Up</Form.Label>
        <Form.Select aria-label="throwup" onChange={throwUpHandler}>
              <option>Throw Up</option>
              
                <option className="dropDown" value={true}>Yes</option>
                <option className="dropDown" value={false}>No</option>
             
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
  )
}

export default Feeds