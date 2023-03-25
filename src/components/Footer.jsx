import React from 'react'
import Logo from '../assets/images/bebehealthlogo.jpg'



function Footer() {
  return (
   
    <nav class="navbar fixed-bottom bg-light">
  <div class="container-fluid">
  <div className='footerCell'>Bebe Health Tracker</div>
    <div className='footerCell'>Navigation Link</div>
    <div className='footerCell'>Contact</div>
    <div className='footerCell'><img src={Logo}/></div>
  </div>
</nav>
 
    
  )
}

export default Footer