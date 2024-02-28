import React, { useEffect, useState } from 'react';
import './information.css';
import editprofilepic from '../../../asset/editprofilepic.png';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import { setUser, selectUser } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import * as constants from '../../../constants/Constant';
import { updateAdminProfileDetails } from '../../../apiCalls/ApiCalls';
import { useMessageState } from '../../../hooks/useapp-message';
import UploadProfilePic from '../upload/page';
import PageLoader from '../../loader/loader';
function Information({ setFileSysytem, validateEmail }) {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  let { showNotifyMessage, hideNotifyMessage } = useMessageState();

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  const decodedToken = decodeJWT(jwt);
  const userId = decodedToken ? decodedToken.userId : null;

  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState('active');
  const [error, setError] = useState(null);
  const [organisationName, setOrganisationName] = useState('');
  const [amChatUserStatus, setamChatUserStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    } else {
      setError('User ID is missing or invalid.');
    }
  }, [userId]);

  const messageHandler = () => {
    hideNotifyMessage();
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/getUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user profile.');
      }

      const userData = await response.json();

      setUserData(userData?.data?.user);
      setOrganisationName(userData?.data?.organisation?.name);
      setamChatUserStatus(userData?.data?.user.active);
      setUserStatus(userData.data.user.active ? 'Active' : 'Inactive');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile.');
    }
  };

  const formElements = [
    {
      label: 'First Name',
      type: 'text',
      name: 'firstName',
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      defaultValue: userData ? userData.firstName : '',
      rules: [
      { required: true, message: 'Please input your First Name' },
      { type: 'name', message: 'Invalid First Name' },
      ],
      style: { width: '400px', height: '40px', marginLeft: '20px' },
    },
    {
      label: 'Last Name',
      type: 'text',
      name: 'lastName',
      // pattern: /^([a-zA-Z]{3,30}\s*)+/,
      defaultValue: userData ? userData.lastName : '',
      // rules: [
      //   { required: true, message: "Please input your Last Name" },
      //   { type: "name", message: "Invalid Last Name" },
      // ],
      style: { width: '400px', height: '40px', marginLeft: '20px' },
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      // pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      defaultValue: userData ? userData.email : '',
      // rules: [
      //   { required: true, message: "Please enter your email" },
      //   { type: "email", message: "Invalid Email" },
      // ],
      style: {
        width: '400px',
        height: '40px',
        marginLeft: '20px',
        backgroundColor: '#CBD5E1',
      },
      disabled: true,
    },
    {
      label: 'Organization Name',
      type: 'text',
      name: 'orgName',
      defaultValue: organisationName,
      // rules: [
      //   { required: true, message: "Please input your Organization Name" },
      //   { type: "name", message: "Invalid Organization Name" },
      // ],
      style: {
        width: '400px',
        height: '40px',
        backgroundColor: '#CBD5E1',
        marginLeft: '20px',
      },
      disabled: true,
    },
    {
      label: 'Status',
      type: 'text',
      name: 'status',
      defaultValue: amChatUserStatus ? 'Active' : 'Inactive',
      // rules: [
      //   { required: true, message: "Please input your Organization Name" },
      //   { type: "name", message: "Invalid Organization Name" },
      // ],
      style: {
        width: '400px',
        height: '40px',
        marginLeft: '20px',
      },
      disabled: true,
    },
  ];

  const submitHandler = async (values) => {
    setIsLoading(true);
        try {
      if (values === undefined) {
        console.log('Values are undefined');
        return;
      } else {
        console.log('values os submit handler', values);
        const headers = {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        };
        console.log('values---->', values);
        const { firstName, lastName, ...rest } = values;
        console.log('firstName---->', firstName);
        console.log('lastName---->', lastName);
        const reqBody = { firstName: firstName, lastName: lastName };
        console.log('reqBody---->', reqBody);
        const response = await updateAdminProfileDetails(
          userId,
          headers,
          reqBody
        );
        if (response.status === 200) {
          showNotifyMessage('success', response?.data?.message, messageHandler);
          setIsLoading(false);
        }
        console.log('response---->', response);
      }
    } catch (error) {
      console.log('Error in updating user details', error);
      setIsLoading(false);
      // throw new Error('Failed to update user profile');
    }
  };

  const submitButtonProperty = {
    name: 'Submit',
    color: 'white',
    backgroundColor: '#6366F1',
    type: 'primary',
    width: '150px',
    height: '50px',
    borderRadius: '34px',
    marginLeft: '19px',
    marginTop: '1.5rem',
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log('Canceling....');
    },
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: 'normal',
    // validateEmail: validateEmail,
    // setFileSysytem: setFileSysytem,
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    isOrgAdmin: true,
    orgInfo: { screen: 'personalinformation' },
    personalInfo: { userData: userData },
  };

  console.log('feedingVariable---->', feedingVariable);
  console.log('amChatUserStatus---->', amChatUserStatus);
  console.log(typeof amChatUserStatus);
  console.log(amChatUserStatus ? 'Active' : 'Inactive');
  return (
    <>
      {isLoading && <PageLoader loadingStatus={isLoading} />}

      <div className="personal-contentcard" style={{overflow: 'auto'}}>
        <div className="user-profile-content">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2em',
              marginLeft: '2em',
            }}
          >
            <UploadProfilePic />
          </div>
        </div>
        <GeneralForm {...feedingVariable} />
      </div>
    </>
  );
}

export default Information;
