import React from 'react'
import Nav from 'react-bootstrap/Nav';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/sleeps">Sleeps</Nav.Link>
          <Nav.Link href="/changes">Changes</Nav.Link>
          <Nav.Link href="/feeds">Feeds</Nav.Link>
          <Nav.Link href="disabled" disabled>
            Coming Soon
          </Nav.Link>
        </Nav>
      </div>
  )
}

export default Sidebar