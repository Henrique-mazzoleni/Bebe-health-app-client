import React from 'react'
import Nav from 'react-bootstrap/Nav';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Sleeps</Nav.Link>
          <Nav.Link eventKey="link-1">Changes</Nav.Link>
          <Nav.Link eventKey="link-2">Feeds</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Coming Soon
          </Nav.Link>
        </Nav>
      </div>
  )
}

export default Sidebar