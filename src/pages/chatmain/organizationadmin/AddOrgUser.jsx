// AddOrgUser.js
import React from 'react';
import Styles from './OrgAdminChatSidebar.module.css';
import Tooltip from './Tooltip';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import photograph from '../../../asset/photograph.png';

function AddOrgUser() {
  const handleProfileImageUpload = () => {
    console.log('Upload profile image logic goes here');
  };

  const handlePhotographImageUpload = () => {
    console.log('Upload photograph image logic goes here');
  };

  const formElements = [
    {
      name: 'First Name',
      label: 'First Name',
      type: 'text',
      style: {
        width: '405px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      rules: [{ required: true, message: 'Please enter your name' }],
      labelName: false,
    },
    {
      name: 'Last Name',
      label: 'Last Name',
      type: 'text',
      style: {
        width: '405px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      rules: [{ required: true, message: 'Please enter your name' }],
      labelName: false,
    },
    {
      name: 'Email',
      label: 'Email',
      type: 'text',
      rules: [
        { required: true, message: 'Please input your email' },
        { type: 'email', message: 'Invalid email format' },
      ],
      style: {
        width: '405px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      labelName: false,
    },
  ];

  const submitHandler = (values) => {
    console.log('Form values:', values);
  };

  const cancelHandler = (values) => {
    console.log('Form values:', values);
  };

  const submitButtonProperty = {
    name: 'Submit',
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
          <div>
            <p className={Styles.superAdminProfileName}>Add User</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Tooltip text="Click to upload profile photo" onClick={handleProfileImageUpload}>
              <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            </Tooltip>
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <div className={Styles.addOrganizationAdminSecondDiv}>
          <div className={Styles.imageUploadSection}>
            <Tooltip text="Click to change image" onClick={handlePhotographImageUpload}>
              <img className={Styles.photographImage} src={photograph} alt="pic" />
            </Tooltip>
          </div>

          <GeneralForm {...feedingVariable} />
        </div>
      </div>
    </div>
  );
}

export default AddOrgUser;
