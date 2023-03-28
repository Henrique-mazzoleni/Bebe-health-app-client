import React from 'react'
import { Button } from 'react-bootstrap'

function SideButtons() {
  return (

    // Buttons to add a child or invite a parent. Will only appear when logged in.

    <div className="buttons">
      <hr />
      <Button href="/newchild" variant="outline-success">Add a child</Button>
      <Button href="/invite" variant="outline-success">Invite a Parent</Button>
    </div>
  )
}

export default SideButtons