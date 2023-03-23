import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Sleep from '../assets/images/sleep.jpg'

function Profile() {

  

  const [user, setUser] = useState()

  const storedToken = localStorage.getItem("authToken")
  useEffect(()=>{axios.get("http://localhost:5005/api/parent",
  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    // setUser(response.data)
    setUser(response.data)
  })},[])

  
 

    
    
  return (
    <div>
    <h1>{user?.name}</h1>
    <div className='homeCards'>
    {user?.children.map((singleChild)=>{
      return(

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={Sleep} />
          <Card.Body>
            <Card.Title>{singleChild.name}</Card.Title>
            <Card.Text>
            {singleChild.dateOfBirth}
            </Card.Text>
            <Button href={`child/${singleChild._id}`} variant="primary">Go to {singleChild.name}</Button>
          </Card.Body>
        </Card>
        )
    })}
    </div>
    
    
   
    <a href='/newchild'>Add a Child</a>
    </div>
  )
}

export default Profile