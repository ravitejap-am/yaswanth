import React, { useEffect, useState } from 'react';
import Styles from './OrgAddDocumentSidebar.module.css';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import { selectUser } from '../../../store/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as constants from '../../../constants/Constant';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMessageState } from '../../../hooks/useapp-message';
import AMChatHeader from '../../AMChatAdmin/AMChatHeader/AMChatHeader';
import OrganizationAdminHeader from '../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader';

function OrgAddDocument(props) {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstNameOrganisation');
    setFirstName(storedFirstName);
  }, []);

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const profileSrc = localStorage.getItem('profileImage');
  const navigationRoute = props?.navigationRoute;
  const fullName = localStorage.getItem('fullName') || '';
  const [errors, setErrors] = useState('');

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const submitHandler = async (values) => {
    console.log('upload values', values);

    if (!file) {
      setErrors('Please upload the document');
      return;
    }
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', values['Document Name']);
      console.log('formData', formData);
      const response = await axios.post(
        `${constants.BASE_DOC_API_URL}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setButtonLoading(false);
      setIsReset(true);
      setErrors('');
      showNotifyMessage('success', response?.data?.message, messageHandler);
      navigate('/documents');
      console.log('API Response:', response.data);
    } catch (error) {
      setErrors('');
      console.error('Error occurred:', error);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/customerSupport');
      }
      setButtonLoading(false);
    }
  };

  const cancelHandler = (values) => {
    console.log('Form values:', values);
    navigate('/documents');
  };

  const documentProps = {
    name: 'file',
    fileList: file ? [file] : [],
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onRemove: (file) => {
      setFile(null);
      return false;
    },
    accept: '.pdf',
  };

  const submitButtonProperty = {
    name: 'Add',
    color: '#ffffff',
    backgroundColor: 'var(--Brand-500, #6366F1)',
    width: '150px',
    height: '50px',
    borderRadius: '28px',
  };

  const cancelButtonProperty = {
    name: 'Cancel',
    color: 'black',
    backgroundColor: '#fff',
    width: '150px',
    height: '50px',
    borderRadius: '28px',
  };

  const feedingVariable = {
    isCancel: true,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: [
      {
        name: 'Document Name',
        label: 'Document Name',
        type: 'text',
        style: {
          width: '405px',
          borderRadius: '40px',
          border: '1px solid var(--Brand-700, #4338CA)',
          backgroundColor: 'transparent',
          marginBottom: '10px',
        },
        // rules: [{ required: true, message: 'Please enter your Document Name' }],
        labelName: 'Document Name',
        pattern: /^.+$/,
        emptyErrorMessage: 'Please Enter the document name',
      },
    ],
    formType: 'normal',
    forgorPasswordHandler: () => {
      console.log('forgot Password....');
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  };

  const ErrorMsg = () => {
    return <span style={{ color: 'red', fontSize: '14px' }}>{errors}</span>;
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName="Add Document"
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
          <div className={Styles.uploadDocumentContainer}>
            {' '}
            <Upload {...documentProps}>
              <Button icon={<UploadOutlined />}>Upload Document</Button>
            </Upload>
            <ErrorMsg />
          </div>
          <GeneralForm
            {...feedingVariable}
            buttonLoading={buttonLoading}
            isReset={isReset}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrgAddDocument;
