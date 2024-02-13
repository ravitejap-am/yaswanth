import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './AddOrganizationAdmin.module.css';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import OrganizationInfo from './AddOrganizationTabNavigation/OrganizationInfo';
import TabNavigation from './AddOrganizationTabNavigation/MainTabNavigationAddOrg';
import OrganizationAdmin from './AddOrganizationTabNavigation/OrganizationAdmin';
import OrganizationDomains from './AddOrganizationTabNavigation/OrganizationDomains';
import SubscriptionPlan from './AddOrganizationTabNavigation/SubscriptionPlan';
import GeneralButton from '../../../components/common/buttons/GeneralButton';

let feedingData = {
  name: 'skytech',

  address: {
    address1: 'Dhanbad',
    address2: 'dhanbad',
    landmark: 'xyz',
    state: 'Jharkhand',
    country: 'country1',
    postCode: '123456',
  },
  metaData: [
    {
      typeDetails: 'sky.com',
      type: '20',
    },
    {
      typeDetails: 'skytech.com',
      type: '20',
    },
  ],
  contact: {
    firstName: 'sushil',
    lastName: 'kumar',
    email: 'sushil.kumar@skytech.com',
  },
  plan: {
    id: '',
  },
};

function AddOrganizationAdmin() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('personalinformation');
  const [orgData, selectOrgData] = useState(feedingData);
  const [isEdit, setIsEdit] = useState(false);

  const handleTabChange = (tab) => {
    console.log('form change');
    const normalizedTab = tab.toLowerCase(); // Normalize to lowercase
    if (normalizedTab !== selectedTab) {
      setSelectedTab(normalizedTab);
    }
  };

  const handleSubmit = () => {
    // Add logic for handling form submission
    console.log('Submitting form');
  };

  const handleCancel = () => {
    // Add logic for handling form cancellation
    console.log('Cancelling form');
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Add Organization</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <TabNavigation
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
        />
        <br />
        <div className={Styles.superAdminTabChildCardStyle}>
          {selectedTab === 'personalinformation' && (
            <OrganizationInfo
              orgData={orgData}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              selectOrgData={selectOrgData}
            />
          )}
          {selectedTab === 'organizationadmin' && (
            <OrganizationAdmin
              orgData={orgData}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              selectOrgData={selectOrgData}  />
          )}
          {selectedTab === 'subscriptionplan' && <SubscriptionPlan />}
          {selectedTab === 'organizationdomains' && <OrganizationDomains />}
        </div>
        <div className={Styles.generalButtonStyle}>
          <div>
            <GeneralButton
              name="Submit"
              buttonProps={
                {
                  /* Add any additional button props if needed */
                }
              }
              type="primary"
              color="#FFFFFF"
              backgroundColor="#6366F1"
              width="130px"
              height="50px"
              borderRadius="30px"
              // icons={/* Add submit button icon source */}
              buttonHandler={handleSubmit}
            />
          </div>
          <Link
            to="/dashboardadmin/organizationlist"
            style={{ textDecoration: 'none' }}
          >
            <div>
              <GeneralButton
                name="Cancel"
                buttonProps={
                  {
                    /* Add any additional button props if needed */
                  }
                }
                type="default"
                color="#334155"
                backgroundColor="transparent"
                width="130px"
                height="50px"
                borderRadius="30px"
                // icons={/* Add cancel button icon source */}
                buttonHandler={handleCancel}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddOrganizationAdmin;
