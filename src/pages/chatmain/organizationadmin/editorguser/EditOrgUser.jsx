import React, { useState, useEffect } from 'react';
import Styles from './EditOrgUserSidebar.module.css';
import profile from '../../../../asset/AmChatSuperAdmin/profile.png';
import GeneralForm from '../../../../components/common/forms/GeneralForm';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMessageState } from '../../../../hooks/useapp-message';
import NotifyMessage from '../../../../components/common/toastMessages/NotifyMessage';
import { selectUser } from '../../../../store/authSlice';
import * as constants from '../../../../constants/Constant';
import { toast } from 'react-toastify';
import AMChatHeader from '../../../AMChatAdmin/AMChatHeader/AMChatHeader';
import Avatar from '@mui/material/Avatar';
import OrganizationAdminHeader from '../OrganizationAdminHeader/OrganizationAdminHeader';
import EditForm from '../../../../components/EditForms/EditForms';
import CircularFileInfo from '../../../../components/personalInfo/upload/circularFileInfo';
import axios from 'axios';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function EditOrgUser(props) {
  const { userId } = useParams();
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    'https://medicalpublic.s3.amazonaws.com/AMCHAT/UserDP_1707819604773.jpeg'
  );
  const [previewTitle, setPreviewTitle] = useState('');
  // const [userData, setUserData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState();

  const profileSrc = localStorage.getItem('profileImage');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigationRoute = props?.navigationRoute;

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
  });
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem('firstNameOrganisation');
    setFirstName(storedFirstName);
    const storedFullName = localStorage.getItem('fullName');
    setFullName(storedFullName);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/details`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // setUserData(data.data);
      setUserData({
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName || '',
        email: data?.data?.email,
      });
      console.log('====================================');
      console.log(data, '*********************');
      console.log('====================================');
      console.log('data image ----->', data?.data?.profileImagePath);
      if (data?.data?.profileImagePath?.length > 0) {
        const url =
          constants.BASE_USER_IMAGE_URL + data?.data?.profileImagePath;
        setFileList(url);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    setButtonLoading(true);
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    if (values === undefined) {
    } else {
      try {
        const updateUserResponse = await fetch(
          `${constants.BASE_API_URL}/user/${userId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              firstName: values['firstName'],
              lastName: values['lastName'],
            }),
          }
        );
        if (!updateUserResponse.ok) {
          throw new Error(`HTTP error! status: ${updateUserResponse.status}`);
        }

        setIsReset(true);
        const updateUserData = await updateUserResponse.json();
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage('success', updateUserData?.message, messageHandler);
      } catch (error) {
        console.log('Error updating user details:', error);
        if (
          error?.response?.status == 500 ||
          error?.response?.status == '500'
        ) {
          navigate('/customerSupport');
        }

        setButtonLoading(false);
        // showNotifyMessage(
        //   "error",
        //   error?.response?.data?.message || "An error occurred",
        //   messageHandler
        // );
      } finally {
        console.log('SBH 17');
        setIsSubmitting(false);
      }
    }
  };

  const cancelHandler = () => {
    navigate('/users');
  };

  const handleFileChange = (file) => {
    setIsLoading(true);
    uploadFile(file);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      showNotifyMessage('error', error?.message, messageHandler);
      setIsLoading(false);
    }
  };

  const submitButtonProperty = {
    name: 'Update',
    color: '#ffffff',
    backgroundColor: 'var(--Brand-500, #6366F1)',
    width: '150px',
    height: '50px',
    borderRadius: '28px',
    marginTop: '10px',
  };

  const cancelButtonProperty = {
    name: 'Cancel',
    color: 'black',
    backgroundColor: '#fff',
    width: '150px',
    height: '50px',
    borderRadius: '28px',
    marginTop: '10px',
  };

  const feedingVariable = {
    isCancel: true,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    // formElements: formElements,
    formType: 'normal',
    forgorPasswordHandler: () => {
      console.log('forgot Password....');
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  };

  console.log('user data---->', userData);

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName="Edit User"
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
            navigationRoute={navigationRoute}
          />
        </div>

        <div className={Styles.addOrganizationAdminSecondDiv}>
          {/* <CircularFileInfo
              onChange={handleFileChange}
              initialImageUrl={fileList}
            /> */}
          <div>
            <div style={{ padding: '20px', width: '90%' }}>
              <EditForm
                formData={userData}
                setFormData={setUserData}
                submitHandler={submitHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrgUser;
