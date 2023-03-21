import React from 'react'
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


function Footer() {
  return (
   
    <Navbar className='footer' fixed="bottom" bg="dark" variant="dark">
    <Container>
    <div className='footerCell'>Bebe Health Tracker</div>
    <div className='footerCell'>Navigation Link</div>
    <div className='footerCell'>Contact</div>
    </Container>

    </Navbar>
    
  )
}

export default Footer