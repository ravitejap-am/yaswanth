import React from 'react';
import { useSelector } from 'react-redux';
import { setUser, selectUser } from '../../../store/authSlice';
import * as constants from '../../../constants/Constant';
import { useMessageState } from '../../../hooks/useapp-message';
import { useNavigate } from 'react-router-dom';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import NotifyMessage from '../../../components/common/toastMessages/NotifyMessage';
import PageLoader from '../../loader/loader';
import { useState } from 'react';

function ChangePassword({ setFileSysytem, validateEmail }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const passwordStyles = {
    position: 'absolute',
    // right: '10px',
    top: '73%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    left: '320px',
  };

  const confirmPasswordStyles = {
    position: 'absolute',
    // right: '10px',
    top: '60%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    left: '320px',
  };

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    } else {
      return Promise.resolve();
    }
  };

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  const handleChangePassword = async (values) => {
    setButtonLoading(true);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/verification/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            oldPassword: values.password,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          }),
        }
      );
      console.log(response, '$$$33333334444556789');
      if (response.ok) {
        if (response.status === 200) {
          setButtonLoading(false);
          setIsLoading(false);
          setIsReset(true);
          showNotifyMessage(
            'success',
            'Password Changed Successfully',
            messageHandler
          );
        }
      } else {
        showNotifyMessage('error', 'Failed to change password', messageHandler);
        setIsLoading(false);
      }
    } catch (error) {
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/internal500');
      }

      setButtonLoading(false);
      setIsLoading(false);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
    }
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log('Canceling....');
    },
    isSubmit: true,
    submitHandler: (values) => {
      console.log('Submitting ChangePassword form....');
      handleChangePassword(values);
    },

    submitButtonProperty: {
      name: 'Submit',
      color: 'white',
      backgroundColor: '#6366F1',
      type: 'primary',
      width: '150px',
      height: '50px',
      borderRadius: '35px',
      marginTop: '5px',
    },
    formElements: [
      {
        label: 'Old Password',
        type: 'password',
        name: 'password',
        rules: [
          { required: true, message: 'Please input a valid password!' },
          { validator: validatePassword },
        ],
        style: { width: '350px', marginTop: '40px', marginLeft: '0px' },
        iconStyle: passwordStyles,
      },
      {
        label: 'New Password',
        type: 'password',
        name: 'newPassword',
        rules: [
          { required: true, message: 'Please input a valid password!' },
          { validator: validatePassword },
        ],
        style: { width: '350px', marginTop: '40px', marginLeft: '0px' },
        iconStyle: passwordStyles,
      },
      {
        label: 'Confirm Password',
        type: 'password',
        name: 'confirmPassword',
        rules: [{ required: true, message: 'Please confirm your password!' }],
        style: { width: '350px', marginLeft: '0px' },
        iconStyle: confirmPasswordStyles,
      },
    ],
    formType: 'normal',
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  };
  return (
    <>
      {isLoading && <PageLoader loadingStatus={isLoading} />}
      <div className="changepassword-main" style={{ width: '96%' }}>
        <div className="changepassword-input">
          <GeneralForm {...feedingVariable} />
        </div>
        <NotifyMessage />
      </div>
    </>
  );
}

export default ChangePassword;
