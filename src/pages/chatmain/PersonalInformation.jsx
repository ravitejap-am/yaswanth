import React from 'react'
import './UserProfile.css'
import editprofilepic from '../../asset/editprofilepic.png'


const PersonalInformation = () => {
  return (
    <div className='personal-contentcard' >
      <div className='user-profile-content'>
        <div className='user-profile-img'>
          <img className='edit-profilepic' src={editprofilepic} alt="" />
        </div>
        <div className='user-profle-name'>
          <h2>Clayton Santos</h2>
          <div className='personalinfo-user-Status'>
            <p>Active User</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PersonalInformation