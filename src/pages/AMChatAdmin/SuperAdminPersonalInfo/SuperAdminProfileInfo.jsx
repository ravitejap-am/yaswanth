import React, { useEffect, useState } from 'react';
import './SuperAdminPersonalInfo.css';

import base from '../../../asset/Base.png';
// import TabNavigation from "../../tabNaviagation";
import SuperAdminPersonalInfo from './SuperAdminPersonalInfo';
import SuperAdminPersonalInfoChangePassword from './SuperAdminPersonalInfoChangePassword';
import SuperAdminPersonalPlan from './SuperAdminPersonalPlan';
import AMChatHeader from '../AMChatHeader/AMChatHeader';
import TabNavigation from '../../chatmain/tabNaviagation';
import PersonalInformation from '../../chatmain/PersonalInformation';
import ChangePassword from '../../chatmain/ChangePassword';
import Plans from '../../chatmain/Plans';
import SuperAdminHeader from '../SuperAdminHeader/SuperAdminHeader';
import SuperAdminPersonalInfoTab from './SuperAdminPersonalInfo';
import PersonalInfo from '../../../components/personalInfo/page';
function SuperAdminProfileInfo() {
  const [selectedTab, setSelectedTab] = useState('personalinformation');
  const firstName = localStorage.getItem('firstName')
  const fullName = localStorage.getItem('fullName')

  const handleTabChange = (tab) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  };

  return (
    <div className="userprofile-screen" style={{height:'100vh'}}>
      <div className="userprofile-main">
        <div className="userprofile-pofilecontainer">
          <div className="userprofile-header">
            <SuperAdminHeader
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
            {selectedTab === "personalinformation" && (
              <SuperAdminPersonalInfoTab />
            )}
            {selectedTab === "changepassword" && (
              <SuperAdminPersonalInfoChangePassword />
            )}
            {selectedTab === "plans" && <SuperAdminPersonalPlan />}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminProfileInfo;
