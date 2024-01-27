import React from 'react';
import { Link } from 'react-router-dom';

const tabNavigation = ({ selectedTab, handleTabChange }) => {
  return (
    <div className='info-bar-main'>
      <div className="info-bar">
        <div className="info-bar-content">
          <div className='user-personal-information'>
            <Link
              to="#"
              className={`barinfo-personalinfo ${selectedTab === 'personalinformation' ? 'active-link' : ''}`}
              onClick={() => handleTabChange('personalinformation')}
            >
              Personal Info
            </Link>
          </div>
          <div className='user-change-password'>
            <Link
              to="#"
              className={`barinfo-changepassword ${selectedTab === 'changepassword' ? 'active-link' : ''}`}
              onClick={() => handleTabChange('changepassword')}
            >
              Change Password
            </Link>
          </div>
          <div className='user-plans'>
            <Link
              to="#"
              className={`barinfo-plans ${selectedTab === 'plans' ? 'active-link' : ''}`}
              onClick={() => handleTabChange('plans')}
            >
              Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tabNavigation;
