import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Plans from './Plans';
import PersonalInformation from './PersonalInformation';
import ChangePassword from './ChangePassword';
import TabNavigation from './tabNaviagation';
import base from '../../asset/Base.png';
import AMChatHeader from '../AMChatAdmin/AMChatHeader/AMChatHeader';

import PersonalInfo from '../../components/personalInfo/page';

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState('personalinformation');

  const fullName = localStorage.getItem('fullName') || '';



  const handleTabChange = (tab) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  };

  return (
    <div className="userprofile-screen">
      <div className="userprofile-main">
        <div className="userprofile-pofilecontainer" style={{flexWrap: 'wrap' , flexGrow: '1'}}>
          <div className="userprofile-header">
            {/* Display firstName in the Welcome message */}
            <AMChatHeader
              componentName={`Welcome ${fullName || ''}`}
              name={fullName || ''}
              profileImageSrc={localStorage.getItem('userImageUrl')}
              customStyle={{
                containerStyle: {
                  display: 'flex',
                  borderRadius: '8px',
                },
                imageStyle: {
                  width: '44px',
                  height: '44px',
                },
                textStyle: {
                  color: 'black',
                  fontWeight: '600',
                  fontSize: '18px',
                },
              }}
            />
          </div>
          <PersonalInfo />
          {/* <TabNavigation
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
          />
          <div>
            {selectedTab === 'personalinformation' && <PersonalInformation />}
            {selectedTab === 'changepassword' && <ChangePassword />}
            {selectedTab === 'plans' && <Plans />}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
