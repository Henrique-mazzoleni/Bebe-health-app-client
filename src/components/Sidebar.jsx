import React from 'react'
import Nav from 'react-bootstrap/Nav';
import SideButtons from './SideButtons';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link href="/sleeps">Sleeps</Nav.Link>
          </Nav.Item>
          <Nav.Link href="/changes">Changes</Nav.Link>
          <Nav.Link href="/feeds">Feeds</Nav.Link>
          <Nav.Link href="disabled" disabled>
            Coming Soon
          </Nav.Link>
        </Nav>
        <SideButtons/>
      </div>

  )
}

export default Sidebar