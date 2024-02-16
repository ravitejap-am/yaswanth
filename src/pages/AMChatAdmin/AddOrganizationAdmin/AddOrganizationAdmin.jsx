import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { selectUser, selectOrganisation } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import * as constants from '../../../constants/Constant';
import { useMessageState } from '../../../hooks/useapp-message';
import { tokenDecodeJWT } from '../../../utils/authUtils';
import AMChatHeader from '../AMChatHeader/AMChatHeader';
import SuperAdminHeader from '../SuperAdminHeader/SuperAdminHeader';

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
  plan: 'standard',
};

function AddOrganizationAdmin() {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const user = useSelector(selectUser);
  const organisation = useSelector(selectOrganisation);
  console.log('organisation', organisation);
  const jwt = user.userToken;
  const navigate = useNavigate();
  const decodedToken = tokenDecodeJWT(jwt);
  console.log('decoded token', decodedToken);
  const [selectedTab, setSelectedTab] = useState('personalinformation');
  const [orgData, selectOrgData] = useState(
    organisation?.organisationStatus == 'edit'
      ? {
          orgId: organisation?.organisationData?.id,
          address: {
            name: organisation?.organisationData?.name,
            address1: organisation?.organisationData?.address?.address1,
            address2: organisation?.organisationData?.address?.address2,
            country:
              organisation?.organisationData?.address?.country?.countryName,
            state: organisation?.organisationData?.address?.state?.stateName,
            city: organisation?.organisationData?.address?.city,
            postCode: organisation?.organisationData?.address?.postCode,
            landmark: '',
          },
          name: organisation?.organisationData?.name,
          contact: {
            firstName: organisation?.organisationData?.contact?.firstName,
            lastName: organisation?.organisationData?.contact?.lastName,
            email: organisation?.organisationData?.contact?.email,
          },
          metaData: organisation?.organisationData?.metadata,
        }
      : ''
  );
  const [isEdit, setIsEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [localState, setLocalState] = useState(
    organisation?.organisationStatus == 'edit'
      ? {
          country:
            organisation?.organisationData?.address?.country?.countryName,
          state: organisation?.organisationData?.address?.state?.stateName,
          city: organisation?.organisationData?.address?.city,
        }
      : {
          country: '',
          state: '',
          city: '',
        }
  );
  const [cities, setCities] = useState([]);
  const [firstNamelocal, setFirstName] = useState('');
  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName);
  }, []);

  const messageHandler = () => {
    hideNotifyMessage();
  };

  const addOrganisation = async () => {
    let body = orgData;
    if (body.hasOwnProperty('plan')) {
      delete body['plan'];
    }
    setButtonLoading(true);
    try {
      const response = await axios.post(
        `${constants.BASE_API_URL}/organisation`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setButtonLoading(false);
      // setIsReset(true);
      showNotifyMessage('success', response?.data?.message, messageHandler);
      console.log('API Response:', response.data);
      navigate('/dashboardadmin/organizationlist');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/internal500');
      }
      setButtonLoading(false);
      console.log(error);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
    }
  };
  const editOrganisation = async () => {
    let body = orgData;
    if (body.hasOwnProperty('plan')) {
      delete body['plan'];
    }
    setButtonLoading(true);
    try {
      const response = await axios.put(
        `${constants.BASE_API_URL}/organisation`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setButtonLoading(false);
      // setIsReset(true);
      showNotifyMessage('success', response?.data?.message, messageHandler);
      console.log('API Response:', response.data);
      // navigate('/dashboardadmin/organizationlist');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/internal500');
      }
      setButtonLoading(false);
      console.log(error);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
    }
  };

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
          <SuperAdminHeader
            componentName={`${
              organisation?.organisationStatus == 'add' ? 'Add' : 'Edit'
            } Organization`}
            name={firstNamelocal || ''}
            profileImageSrc={profile}
            customStyle={{
              containerStyle: {
                display: 'flex',
                borderRadius: '8px',
              },
              imageStyle: {
                width: '50%',
                height: '70%',
              },
              textStyle: {
                color: 'blue',
                fontWeight: 'bold',
              },
            }}
          />
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
              buttonLoading={buttonLoading}
              setButtonLoading={setButtonLoading}
              countries={countries}
              states={states}
              localState={localState}
              setLocalState={setLocalState}
              cities={cities}
              setCities={setCities}
              setCountries={setCountries}
              setStates={setStates}
              organisation={organisation}
              editOrganisation={editOrganisation}
            />
          )}
          {selectedTab === 'organizationadmin' && (
            <OrganizationAdmin
              orgData={orgData}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              selectOrgData={selectOrgData}
              organisation={organisation}
              editOrganisation={editOrganisation}
            />
          )}
          {selectedTab === 'subscriptionplan' && (
            <SubscriptionPlan
              orgData={orgData}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              selectOrgData={selectOrgData}
              addOrganisation={addOrganisation}
              buttonLoading={buttonLoading}
              organisation={organisation}
              editOrganisation={editOrganisation}
            />
          )}
          {selectedTab === 'organizationdomains' && (
            <OrganizationDomains
              orgData={orgData}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              selectOrgData={selectOrgData}
              organisation={organisation}
              editOrganisation={editOrganisation}
            />
          )}
        </div>
        <div className={Styles.generalButtonStyle}>
          {/* <div>
            <GeneralButton
              name="Submit"
              buttonProps={
                {
                 
                }
              }
              type="primary"
              color="#FFFFFF"
              backgroundColor="#6366F1"
              width="130px"
              height="50px"
              borderRadius="30px"
             
              buttonHandler={handleSubmit}
            />
          </div> */}
          {/* <Link
            to="/dashboardadmin/organizationlist"
            style={{ textDecoration: "none" }}
          >
            <div>
              <GeneralButton
                name="Cancel"
                buttonProps={
                  {
                    
                  }
                }
                type="default"
                color="#334155"
                backgroundColor="transparent"
                width="130px"
                height="50px"
                borderRadius="30px"
              
                buttonHandler={handleCancel}
              />
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default AddOrganizationAdmin;
