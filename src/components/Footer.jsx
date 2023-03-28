import React from 'react'
import Logo from '../assets/images/bebehealthlogo.jpg'
import { Container } from 'react-bootstrap'



function Footer() {
  return (
    <div className='footer'>
   
    <nav className="navbar fixed-bottom bg-light" >
    <Container>
  <div class="container-fluid">
    <div className='footerCell'>Bebe Health Tracker</div>
    <div className='footerCell'>Navigation Link</div>
    <div className='footerCell'>Contact</div>
    <div className='footerCell'><img src={Logo}/></div>
  </div>
  </Container>
</nav>
</div>
 
    
  )
}

export default Footer