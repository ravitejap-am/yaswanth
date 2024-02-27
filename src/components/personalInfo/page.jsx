import React, { useState } from 'react';
import TabNavigation from './tabNavigation/page';
import Information from './tabPages/information';
import PersonalPlans from './tabPages/plan';
import ChangePassword from './tabPages/changePassword';
const PersonalInfo = () => {
  const [selectedTab, setSelectedTab] = useState('personalinformation');

  const handleTabChange = (tab) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  };
  return (
    <>
      <TabNavigation
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />
      <div>
        {selectedTab === 'personalinformation' && <Information />}
        {selectedTab === 'changepassword' && <ChangePassword />}
        {selectedTab === 'plans' && <PersonalPlans />}
      </div>
    </>
  );
};

export default PersonalInfo;
