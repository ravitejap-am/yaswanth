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
import {
  selectUser,
  selectOrganisation,
  setOrganisationData,
} from '../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import * as constants from '../../../constants/Constant';
import { useMessageState } from '../../../hooks/useapp-message';
import { tokenDecodeJWT } from '../../../utils/authUtils';
import AMChatHeader from '../AMChatHeader/AMChatHeader';
import SuperAdminHeader from '../SuperAdminHeader/SuperAdminHeader';
import PageLoader from '../../../components/loader/loader';
import OrganizationInfoForm from '../../../components/super-admin/organisation-info';
import UserInfoForm from '../../../components/super-admin/userInfo';
import {
  validatePersonalInfoForm,
  validateUserInfoForm,
} from '../../../components/super-admin/validation';
import { extractDomain } from '../../../utils/generalUtils';
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

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName);
    const storedfullName = localStorage.getItem('fullName');
    setFullName(storedfullName);
  }, [organisation]);

  const messageHandler = () => {
    hideNotifyMessage();
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
      navigate('/dashboardadmin/organizationlist');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/customerSupport');
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
        navigate('/customerSupport');
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
  const personalInformationHandler = (tab) => {
    console.log('orgData', orgData, 'tabData', selectedTab, 'tab', tab);

    if (selectedTab == 'personalinformation') {
      const errors = validatePersonalInfoForm(orgData);
      if (Object.keys(errors).length === 0) {
        setOrgInfoErrors({});
        handleTabChange(tab);
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
        handleTabChange(tab);
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
        handleTabChange(tab);
      }
    }
    if (selectedTab == 'subscriptionplan') {
      handleTabChange(tab);
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
    <>
      {backDropLoading && <PageLoader loadingStatus={backDropLoading} />}

      <div className={Styles.superAdminMainCardDivStyle}>
        <div
          className={Styles.superAdminMiddleParentDiv}
          style={{ height: '104%' }}
        >
          <div className={Styles.superAdminProfileCardStyle}>
            <SuperAdminHeader
              componentName={`${
                organisation?.organisationStatus == 'add' ? 'Add' : 'Edit'
              } Organization`}
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

          <TabNavigation
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
            setOrgInfoErrors={setOrgInfoErrors}
            orgData={orgData}
            setUserInfoErrors={setUserInfoErrors}
            personalInformationHandler={personalInformationHandler}
          />
          <br />
          <div
            className={Styles.superAdminTabChildCardStyle}
            style={{ height: '70%', overflowY: 'auto' }}
          >
            {selectedTab === 'personalinformation' && (
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
              // <OrganizationInfo
              //   orgData={orgData}
              //   setSelectedTab={setSelectedTab}
              //   selectedTab={selectedTab}
              //   selectOrgData={selectOrgData}
              //   buttonLoading={buttonLoading}
              //   setButtonLoading={setButtonLoading}
              //   countries={countries}
              //   states={states}
              //   localState={localState}
              //   setLocalState={setLocalState}
              //   cities={cities}
              //   setCities={setCities}
              //   setCountries={setCountries}
              //   setStates={setStates}
              //   organisation={organisation}
              //   editOrganisation={editOrganisation}
              //   setBackDropLoading={setBackDropLoading}
              // />
            )}
            {selectedTab === 'organizationadmin' && (
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
              />
              // <OrganizationAdmin
              //   orgData={orgData}
              //   setSelectedTab={setSelectedTab}
              //   selectedTab={selectedTab}
              //   selectOrgData={selectOrgData}
              //   organisation={organisation}
              //   editOrganisation={editOrganisation}
              //   buttonLoading={buttonLoading}
              //   showNotifyMessage={showNotifyMessage}
              //   messageHandler={messageHandler}
              //   jwt={jwt}
              // />
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
                personalInformationHandler={personalInformationHandler}
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
                buttonLoading={buttonLoading}
                showNotifyMessage={showNotifyMessage}
                messageHandler={messageHandler}
                jwt={jwt}
                setButtonLoading={setButtonLoading}
                setBackDropLoading={setBackDropLoading}
                personalInformationHandler={personalInformationHandler}
              />
            )}
          </div>
          <div className={Styles.generalButtonStyle}>
            <div>
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
                Save
              </Button>
            </div>
            <Link
              to="/dashboardadmin/organizationlist"
              style={{ textDecoration: 'none' }}
            >
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
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrganizationAdmin;
