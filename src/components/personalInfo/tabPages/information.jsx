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
import CircularFileInfo from '../upload/circularFileInfo';
import axios from 'axios';
import UserProfileForm from './user-profile-form';
// import { USER_PROFILE } from '../../../apiCalls/Constants';

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

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    status: '',
  });
  const [error, setError] = useState(null);

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
    setIsLoading(true);
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
        setIsLoading(false);
        throw new Error('Failed to fetch user profile.');
      }

      const userData = await response.json();
      setUserData({
        firstName: userData?.data?.user?.firstName,
        lastName: userData?.data?.user?.lastName,
        email: userData?.data?.user?.email,
        organization: userData?.data?.organisation?.name,
        status:
          userData?.data?.organisation?.active == true ? 'ACTIVE' : 'INACTIVE',
      });
      
      const profileImagePath = userData?.data?.user?.profileImagePath;
      if (profileImagePath) {
        localStorage.setItem(
          'userImageUrl',
          `https://medicalpublic.s3.amazonaws.com/${profileImagePath}`
        );
      }
      // setUserData(userData?.data?.user);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile.');
      setIsLoading(false);
    }
  };

  const submitHandler = async (values) => {
    console.log(values);

    setIsLoading(true);
    try {
      if (values === undefined) {
        console.log('Values are undefined');
        return;
      } else if (userData?.firstName === values.firstName && userData?.lastName === values?.lastName) {
        setIsLoading(false);
        showNotifyMessage('success', "Already updated!", messageHandler);
      }
       else {
        const headers = {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        };
        const { firstName, lastName, ...rest } = values;
        const reqBody = { firstName: firstName, lastName: lastName };
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

  const handleFileChange = (file) => {
    setIsLoading(true);
    if (!!file) {
      uploadFile(file);
    } else {
      deleteFile();
    }
  };
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `${constants.BASE_API_URL}/user/dp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      showNotifyMessage('success', response?.data?.message, messageHandler);
      await fetchUserProfile()
      window.location.href = "/Info";
    } catch (error) {
      console.log(error);
      showNotifyMessage('error', error?.message, messageHandler);
      setIsLoading(false);
    }
  };

  const deleteFile = async () => {
    try {
      let body = {
        userId: userId,
      };
      const response = await axios.put(
        `${constants.USER_PROFILE}/delete_dp`,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      showNotifyMessage('success', response?.data?.message, messageHandler);
      fetchUserProfile()
      window.location.href = "/Info";
    } catch (error) {
      showNotifyMessage('error', error?.message, messageHandler);
      setIsLoading(false);
    }
  };
  

  return (
    <>
      {isLoading && <PageLoader loadingStatus={isLoading} />}

      <div
        // className="personal-contentcard"
        style={{  height: "70%" }}
      >
        <div className="">
          <div
            style={{
              display: 'flex',
              justifyContent: '',
              marginTop: "20px",
              marginBottom: "10px"
            }}
          >
            <CircularFileInfo
              onChange={handleFileChange}
              initialImageUrl={localStorage.getItem('userImageUrl')}
            />
          </div>
        </div>
        <div >
          <UserProfileForm
            formData={userData}
            setFormData={setUserData}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </>
  );
}

export default Information;
