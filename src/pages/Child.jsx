import React from 'react'
import { useState, useEffect } from 'react'
import  axios  from 'axios'
import { useParams } from 'react-router-dom'
import HomeNavCards from '../components/HomeNavCards'


function Child() {

  const [child, setChild] = useState()

  const {childId} = useParams()

  const storedToken = localStorage.getItem("authToken")
  useEffect(()=>{axios.get(`http://localhost:5005/api/child/${childId}`,
  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    // setUser(response.data)
    setChild(response.data)
    console.log(response.data)
  })},[])
  return (
    <div className="contentContainer">
    <HomeNavCards />
        <div className='details'>
            <ul>
            <li>{child?.name}</li>
            <li>{child?.dateOfBirth}</li>
            <li>{child?.gender}</li>
            <li>{child?.weightAtBirth}</li>
            <li>{child?.sizeAtBirth}</li>
            </ul>

        </div>
    </div>
  )
}

export default Child