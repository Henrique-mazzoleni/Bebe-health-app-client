import React from 'react'
import { Button } from 'react-bootstrap'

function SideButtons() {
  return (
    <div className="buttons">
    <hr />
    <Button href="/newchild" variant="outline-success">
                Add a child
              </Button>
              <Button href="/invite" variant="outline-success">
              Invite a Parent
              </Button>
              </div>
  )
}

export default SideButtons