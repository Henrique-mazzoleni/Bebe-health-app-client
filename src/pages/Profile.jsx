import React from 'react'

function Profile({user}) {
    console.log(user)

    
    
  return (
    <div>{user.name}</div>
  )
}

export default Profile