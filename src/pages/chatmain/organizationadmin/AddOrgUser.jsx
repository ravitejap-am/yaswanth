import React, { useEffect, useState, useRef } from 'react';
import Styles from './OrgAdminChatSidebar.module.css';
import Tooltip from './Tooltip';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import photograph from '../../../asset/photograph.png';
import { selectUser } from '../../../store/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NotifyMessage from '../../../components/common/toastMessages/NotifyMessage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import * as constants from '../../../constants/Constant';
import { useMessageState } from '../../../hooks/useapp-message';
import AMChatHeader from '../../AMChatAdmin/AMChatHeader/AMChatHeader';
import OrganizationAdminHeader from './OrganizationAdminHeader/OrganizationAdminHeader';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AddOrgUser(props) {
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
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const inputRefs = useRef([]);
  const profileSrc = localStorage.getItem("profileImage");
  const navigationRoute = props.navigationRoute;

  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem('firstNameOrganisation');
    setFirstName(storedFirstName);
  }, []);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // Load preview image if not already loaded
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    console.log('values---->567', values);
    if (values === undefined) {
      console.log('values are undefined');
      // const isEmpty = inputRefs.current.some(ref => ref.current.value === '');

      // if (isEmpty) {
      //   // Focus on the first empty input field
      //   const emptyInput = inputRefs.current.find(ref => ref.current.value === '');
      //   emptyInput.current.focus();
      //   return;
      // }
    } else {
      if (isSubmitting) {
        console.log('AI USER 3');
        return;
      }
      setIsSubmitting(true);
      setButtonLoading(true);
      try {
        // const formData = new FormData();
        // formData.append("image", fileList[0].originFileObj);
        // console.log("fileList[0].originFileObj", fileList[0].originFileObj);
        // console.log("formData---->", formData);
        // const responseImage = await fetch(`${constants.BASE_API_URL}/user/dp`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${jwt}`,
        //   },
        //   body: formData,
        // });

        // if (!responseImage.ok) {
        //   throw new Error(`HTTP error! status: ${responseImage.status}`);
        // }

        // const responseData = await responseImage.json();
        // console.log("Upload response:", responseData);
        const responseUser = await fetch(`${constants.BASE_ORG_API_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        });
        const data = await responseUser.json();
        setButtonLoading(false);
        if (responseUser.ok) {
          setIsReset(true);
          showNotifyMessage('success', data.message, messageHandler);
          navigate('/orguserlist');
        } else if (!responseUser.ok && responseUser.status == 400) {
          showNotifyMessage('error', data.message, messageHandler);
        }
      } catch (error) {
        if (
          error?.response?.status == 500 ||
          error?.response?.status == '500'
        ) {
          navigate('/internal500');
        }
        setButtonLoading(false);
        showNotifyMessage(
          'error',
          error?.response?.data?.message || 'An error occurred', // Display a generic error message
          messageHandler
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const cancelHandler = () => {
    console.log('calling cancelHandler');
    navigate('/orguserlist');
  };

  const formElements = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      style: {
        width: '405px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      // rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Please Enter the First Name',
      invalidErrorMessage: 'Please Enter the Valid First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      style: {
        width: '405px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      // rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      // rules: [
      //   { required: true, message: "Please input your email" },
      //   { type: "email", message: "Invalid email format" },
      // ],
      style: {
        width: '405px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      labelName: false,
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      emptyErrorMessage: 'Please Enter the Email',
      invalidErrorMessage: 'Please Enter the Valid Email',
    },
  ];

  const submitButtonProperty = {
    name: 'Submit',
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
    formElements: formElements,
    formType: 'normal',
    forgorPasswordHandler: () => {
      console.log('forgot Password....');
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName="Add User"
            name={firstName || ''}
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
          {/* <div className={Styles.imageUploadSection}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div> */}
          <GeneralForm
            {...feedingVariable}
            buttonLoading={buttonLoading}
            isReset={isReset}
          />
        </div>
        <NotifyMessage />
      </div>
    </div>
  );
}

export default AddOrgUser;
