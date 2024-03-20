import React, { useState, useEffect } from 'react';
import Layout from '../../../../Layout';
import { AppBar, Toolbar, Button, Box, Tab, Grid } from '@mui/material';
import './Index.css'

import { Tabs } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import GeneralForm from '../../../../components/common/forms/GeneralForm';
import OrganizationInfo from '../../../AMChatAdmin/AddOrganizationAdmin/AddOrganizationTabNavigation/OrganizationInfo';
import OrganizationAdmin from '../../../AMChatAdmin/AddOrganizationAdmin/AddOrganizationTabNavigation/OrganizationAdmin';
import OrganizationDomains from '../../../AMChatAdmin/EditOrganizationAdmin/AddOrganizationTabNavigation/OrganizationDomains';
import SubscriptionPlan from '../../../AMChatAdmin/AddOrganizationAdmin/AddOrganizationTabNavigation/SubscriptionPlan';
import GeneralButton from '../../../../components/common/buttons/GeneralButton';
import axios from 'axios';
import {
  selectUser,
  selectOrganisation,
  setOrganisationData,
  setErrorMsg,
} from '../../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import * as constants from '../../../../constants/Constant';
import { useMessageState } from '../../../../hooks/useapp-message';
import { tokenDecodeJWT } from '../../../../utils/authUtils';
import AMChatHeader from '../../../AMChatAdmin/AMChatHeader/AMChatHeader';
import SuperAdminHeader from '../../../AMChatAdmin/SuperAdminHeader/SuperAdminHeader';
import PageLoader from '../../../../components/loader/loader';
import OrganizationInfoForm from '../../../../components/super-admin/organisation-info';
import UserInfoForm from '../../../../components/super-admin/userInfo';
import {
  validatePersonalInfoForm,
  validateUserInfoForm,
} from '../../../../components/super-admin/validation';
import { extractDomain } from '../../../../utils/generalUtils';
// import TabNavigation from './TabNavigation';
// import TabNavigationMui from './TabNavigationmui';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function Organisation() {
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
  const dispatch = useDispatch();
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
            countryCode:
              organisation?.organisationData?.address?.country?.countryCode,
            stateCode:
              organisation?.organisationData?.address?.state?.stateCode,
          },
          name: organisation?.organisationData?.name,
          contact: {
            firstName: organisation?.organisationData?.contact?.firstName,
            lastName: organisation?.organisationData?.contact?.lastName,
            email: organisation?.organisationData?.contact?.email,
          },
          metaData: organisation?.organisationData?.metadata,
        }
      : {
          address: {
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            postCode: '',
          },
          name: '',
          contact: {
            firstName: '',
            lastName: '',
            email: '',
          },
          metaData: [
            {
              typeDetails: '',
              typeId: '20',
              status: 'ACTIVE',
            },
          ],
        }
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
          countryCode:
            organisation?.organisationData?.address?.country?.countryCode,
          stateCode: organisation?.organisationData?.address?.state?.stateCode,
        }
      : {
          country: '',
          state: '',
          city: '',
        }
  );
  const [cities, setCities] = useState([]);
  const [firstNamelocal, setFirstName] = useState('');
  const [backDropLoading, setBackDropLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [orgInfoErrors, setOrgInfoErrors] = useState({});
  const [userInfoErrors, setUserInfoErrors] = useState({});

  const [value, setValue] = useState('1');
  const orgStatus = organisation?.organisationStatus || null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName);
    const storedfullName = localStorage.getItem('fullName');
    setFullName(storedfullName);
  }, [organisation]);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName);
    const storedfullName = localStorage.getItem('fullName');
    setFullName(storedfullName);
  }, [organisation]);

  const messageHandler = () => {
    hideNotifyMessage();
  };

  const handleVerification = () => {
    const isValidJwtToken = true;
    if (isValidJwtToken) {
      // navigate("/dashboardadmin")
      console.log('valid jwt token');
      // verify jwt token
      navigate('/dashboardadmin');
    } else {
      localStorage.clear();
      navigate('/signin');
    }
  };

  const addOrganisation = async () => {
    let body = orgData;
    if (body.hasOwnProperty('plan')) {
      delete body['plan'];
    }
    setBackDropLoading(true);
    try {
      const response = await axios.post(
        `${constants.BASE_ORG_API_URL}`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setBackDropLoading(false);
      // setIsReset(true);
      showNotifyMessage('success', response?.data?.message, messageHandler);
      console.log('API Response:', response.data);
      navigate('/organisations');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        const errorMsgprops = {
          message: {
            title: 'Something went wrong',
            content: 'Please contact our customer support team',
          },
          handleVerification: handleVerification,
          onOkButtonText: 'Retry',
        };
        dispatch(setErrorMsg({ ...errorMsgprops }));
      }
      setBackDropLoading(false);
      console.log(error);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
    }
  };
  const editOrganisation = async (editedData) => {
    let body = editedData;
    if (body.hasOwnProperty('plan')) {
      delete body['plan'];
    }
    setButtonLoading(true);
    try {
      const response = await axios.put(
        `${constants.BASE_ORG_API_URL}`,
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
      dispatch(setOrganisationData(response.data?.data));
      // navigate('/dashboardadmin/organizationlist');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        // navigate('/customerSupport');
        const errorMsgprops = {
          message: {
            title: 'Something went wrong',
            content: 'Please contact our customer support team',
          },
          // handleCancelVerification: handleCancelVerification,
          handleVerification: handleVerification,
          onOkButtonText: 'Retry',
        };
        dispatch(setErrorMsg({ ...errorMsgprops }));
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

  const handleTabChange = (event, newValue) => {
    console.log('form change');
    console.log('tab value--->', newValue);
    const normalizedTab = newValue;
    // const normalizedTab = tab.toLowerCase(); // Normalize to lowercase
    personalInformationHandler(newValue);
    // if (normalizedTab !== selectedTab) {
    //   setSelectedTab(normalizedTab);
    // }
  };

  const handleSubmit = () => {
    // Add logic for handling form submission
    console.log('Submitting form');
  };

  const handleCancel = () => {
    // Add logic for handling form cancellation
    console.log('Cancelling form');
  };
  const personalInformationHandler = (tab) => {
    console.log('orgData', orgData, 'tabData', selectedTab, 'tab', tab);

    if (selectedTab == 'personalinformation') {
      const errors = validatePersonalInfoForm(orgData);
      if (Object.keys(errors).length === 0) {
        setOrgInfoErrors({});
        // handleTabChange(tab);
        setSelectedTab(tab);
        return;
      } else {
        setOrgInfoErrors(errors);
        // showNotifyMessage(
        //   'error',
        //   'Please add the required fields with valid data',
        //   messageHandler
        // );
        return;
      }
    }
    if (selectedTab == 'organizationadmin') {
      const usererrors = validateUserInfoForm(orgData);
      if (Object.keys(usererrors).length === 0) {
        setUserInfoErrors({});
        // handleTabChange(tab);
        setSelectedTab(tab);
      } else {
        setUserInfoErrors(usererrors);
        // showNotifyMessage(
        //   'error',
        //   'Please add the required fields with valid data',
        //   messageHandler
        // );
        return;
      }
      return;
    }
    if (selectedTab == 'organizationdomains') {
      if (!domainNameValidation(orgData?.metaData)) {
        showNotifyMessage(
          'warn',
          'At least one domain name should match the organisation domain',
          messageHandler
        );
        return;
      }
      if (hasRepeatingValues(orgData?.metaData, 'typeDetails')) {
        showNotifyMessage(
          'warn',
          'Duplicate domains are not allowed',
          messageHandler
        );
        return;
      }
      if (domainNameValidation(orgData?.metaData)) {
        // handleTabChange(tab);
        setSelectedTab(tab);
      }
    }
    if (selectedTab == 'subscriptionplan') {
      // handleTabChange(tab);
      setSelectedTab(tab);
    }

    // handleTabChange(tab);
  };

  const domainNameValidation = (domainArray) => {
    if (orgData?.contact?.email.length > 0) {
      let isDomainValid = domainArray.find(
        (obj) => obj['typeDetails'] == extractDomain(orgData?.contact?.email)
      );
      console.log('isDomainValid', !!isDomainValid);
      return !!isDomainValid;
    }
  };

  function hasRepeatingValues(arr, prop) {
    const uniqueValues = new Set();

    for (const obj of arr) {
      uniqueValues.add(obj[prop]);
    }

    return uniqueValues.size !== arr.length;
  }

  return (
    <Layout componentName="Add Organistaion">
      <Box>
        <TabContext value={selectedTab}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              boxShadow: '0px 2.789px 6.972px 3.486px rgba(0, 0, 0, 0.09)',
              borderRadius: 3,
              marginBottom: '1rem',
            }}
          >
            <TabList
              onChange={handleTabChange}
              aria-label="organisation tabs"
              variant="scrollable"
              scrollButtons={false}
              allowScrollButtonsMobile
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                '& .MuiTab-root': {
                  minWidth: 'auto',
                },
              }}
            >
              <Tab label={'Organisation Info'} value="personalinformation">
                Organisation Info
              </Tab>
              <Tab
                label="Organisation Admin"
                value="organizationadmin"

                // disabled = {Object.keys(orgInfoErrors).length === 0 ? false : true}
              >
                Organisation Admin
              </Tab>
              <Tab
                label="Organisation Domains"
                // disabled = { Object.keys(userInfoErrors)?.length === 0 ? false : true}

                value="organizationdomains"
              >
                Organisation Domains
              </Tab>
              <Tab label="Subscription Plan" value="subscriptionplan">
                Subscription Plan
              </Tab>
            </TabList>
          </Box>
          <Box
            sx={{
              borderWidth: '1px',
              boxShadow: '0px 2.789px 6.972px 3.486px rgba(0, 0, 0, 0.09)',
              borderRadius: 3,
            }}
          >
            <TabPanel value="personalinformation">
              <OrganizationInfoForm
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
                setBackDropLoading={setBackDropLoading}
                errors={orgInfoErrors}
                setErrors={setOrgInfoErrors}
                personalInformationHandler={personalInformationHandler}
              />
            </TabPanel>
            <TabPanel value="organizationadmin">
              <UserInfoForm
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                organisation={organisation}
                editOrganisation={editOrganisation}
                buttonLoading={buttonLoading}
                showNotifyMessage={showNotifyMessage}
                messageHandler={messageHandler}
                jwt={jwt}
                formData={orgData.contact}
                setFormData={selectOrgData}
                errors={userInfoErrors}
                setErrors={setUserInfoErrors}
                personalInformationHandler={personalInformationHandler}
                orgStatus={orgStatus}
              />
            </TabPanel>
            <TabPanel value="organizationdomains">
              <OrganizationDomains
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                organisation={organisation}
                editOrganisation={editOrganisation}
                buttonLoading={buttonLoading}
                showNotifyMessage={showNotifyMessage}
                messageHandler={messageHandler}
                jwt={jwt}
                setButtonLoading={setButtonLoading}
                setBackDropLoading={setBackDropLoading}
                personalInformationHandler={personalInformationHandler}
              />
            </TabPanel>
            <TabPanel value="subscriptionplan">
              <SubscriptionPlan
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                addOrganisation={addOrganisation}
                buttonLoading={buttonLoading}
                organisation={organisation}
                editOrganisation={editOrganisation}
                personalInformationHandler={personalInformationHandler}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={'0.3rem'}
      >
        <Grid item>
          <Button
            onClick={() => {
              if (organisation?.organisationStatus == 'edit') {
                editOrganisation(orgData);
                return;
              }
              addOrganisation();
            }}
            style={{
              display: 'flex',
              width: '130px',
              height: '50px',
              padding: '10px 16px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              flexShrink: '0',
              borderRadius: '30px',
              backgroundColor: 'var(--Brand-500, #6366F1)',
              color: '#FFFFFF',
              fontFamily: 'Into Lato',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '24px',
            }}
            loading={buttonLoading}
          >
            {'Save'}
          </Button>
        </Grid>
        <Grid item>
          <Link to="/organisations" style={{ textDecoration: 'none' }}>
            <div>
              <GeneralButton
                name="Cancel"
                buttonProps={{}}
                type="default"
                color="#334155"
                backgroundColor="transparent"
                width="130px"
                height="50px"
                borderRadius="30px"
                buttonHandler={handleCancel}
              />
            </div>
          </Link>
        </Grid>
      </Grid>
      {/* <TabNavigation
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
            setOrgInfoErrors={setOrgInfoErrors}
            orgData={orgData}
            setUserInfoErrors={setUserInfoErrors}
            personalInformationHandler={personalInformationHandler}
          /> */}
    </Layout>
  );
}

export default Organisation;
