import React from 'react'
import Users from '../assets/images/users.png'
import Children from '../assets/images/children.png'
import ChangeIcon from '../assets/images/change-icon.png'
import SleepIcon from '../assets/images/sleep-icon.png'
import FeedIcon from '../assets/images/feed-icon.png'
import SignUpPrompt from './SignUpPrompt'
import { useContext, Fragment } from 'react'
import { AuthContext } from '../context/auth.context';
import { Button } from 'react-bootstrap'

function Welcome() {

    const {isLoggedIn} = useContext(AuthContext)
  return (
    <main>
    <div className="welcomeFlex">
    <div className='welcome'>
    <div className='img'><img src={ChangeIcon} /></div>
    <div className='text'>
        <h3>Track your childs changes</h3>
        <p>blah blah blah blah blah blah blah blah blah blah</p>
    </div>
    </div>

    <div className='welcome'>
    <div className='img'><img src={SleepIcon} /></div>
    <div className='text'>
        <h3>Track your childs sleeps</h3>
        <p>blah blah blah blah blah blah blah blah blah blah</p>
    </div>
    </div>

    <div className='welcome'>
    <div className='img'><img src={FeedIcon} /></div>
    <div className='text'>
        <h3>Track your childs feeds</h3>
        <p>blah blah blah blah blah blah blah blah blah blah</p>
    </div>
    </div>

    <div className='welcome'>
    <div className='img'><img src={Users}/></div>
    <div className='text'>
        <h3>Add more than 1 guardian</h3>
        <p>blah blah blah blah blah blah blah blah blah blah</p>
    </div>
    </div>

   <div className='welcome'>
    <div className='img'><img src={Children} /></div>
    <div className='text'>
        <h3>Add all your children</h3>
        <p>blah blah blah blah blah blah blah blah blah blah</p>
    </div>
    </div>
    {!isLoggedIn && <Fragment>
        <SignUpPrompt/>
            </Fragment>}
    </div>

  

    

    </main>
  )
}

export default Welcome