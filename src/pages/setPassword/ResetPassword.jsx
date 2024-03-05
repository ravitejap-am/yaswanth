import React, { useEffect, useState } from 'react';
import { Form } from 'antd'; // Add this import
import GeneralForm from '../../components/common/forms/GeneralForm';
import axios from 'axios';
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage';
import { toast } from 'react-toastify';
import Footer from '../../pages/home/Footer/Footer';
import SignHeader from '../home/SignHeader/SignHeader';
import { useSelector } from 'react-redux'; // Import the useSelector hook
import { useParams } from 'react-router-dom';
import * as constants from '../../constants/Constant';
import { useMessageState } from '../../hooks/useapp-message';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const param = params.get('param');
  const jwtToken = false;
  const { id } = useParams();

  const passwordStyles =  {
    position: 'absolute',
    right: '10px',
    top: '54%',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  }

  const errorMsgStyles = { 
    width: '30%'
  }

  console.log(param);
  useEffect(() => {
    console.log('JWT Token from Redux Store:', jwtToken);
    if (jwtToken) {
      console.log('JWT token is stored in the Redux store.');
    } else {
      console.log('JWT token is not stored in the Redux store.');
    }
  }, [jwtToken]);

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    } else {
      return Promise.resolve();
    }
  };

  const validateConfirmPassword = (_, value, password) => {
    console.log('passValue', value, 'confirm', password);
    if (value !== password) {
      return Promise.reject('Passwords do not match');
    } else {
      return Promise.resolve();
    }
  };
  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const formElements = [
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      labelname: 'password',
      // rules: [
      //   { required: true, message: 'Please input valid password!' },
      //   { validator: validatePassword },
      // ],
      iconStyle: passwordStyles,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,20}$/,
      emptyErrorMessage: 'Please Enter the passsword',
      invalidErrorMessage: 'Password should have atleast 8 characters, 1 uppercase, 1 lowercase ,1 digit and 1 special character',
      // invalidErrorMessage: 'Password is invalid',
      errorMsgStyles: errorMsgStyles,
      passwordContainerStyle: {width : '460px'}
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      labelname: 'Confirm Password',
      // rules: [
      //   { required: true, message: 'Please confirm your password!' },
      // ],
      iconStyle: passwordStyles,
      pattern: /^.+$/,
      emptyErrorMessage: 'Please Enter the confirm passsword',
      passwordContainerStyle: {width : '460px'} ,
    },
  ];

  const submitButtonProperty = {
    name: 'Submit',
    color: 'white',
    backgroundColor: '#6366F1',
    type: 'primary',
    width: '467px',
    height: '50px',
    borderRadius: '35px',
    marginTop: '.7em',
    fontSize: '0.9rem',
  };
  const buttonProps = {
    name: 'Sign Up',
    type: 'primary',
    color: 'white',
    backgroundColor: '#6366F1',
    width: '120px',
    padding: '10px 16px',
    height: '40px',
    borderRadius: '30px',
    icons: '',
  };

  const verifyPassword = (values) => {
    if(values?.password?.length === values?.confirmPassword?.length &&  values.password !== values.confirmPassword){
      showNotifyMessage('error', 'Password and confirm password should be same', messageHandler);
      return false;
    }
    return true;
  }

  const feedingVariable = {
    isCancel: false,
    cancelHandler: (errorInfo) => {
      console.log('Canceling....', errorInfo);
    },
    isSubmit: true,
    submitHandler: async (values) => {
      console.log('Resetting password....');
      console.log(values);
      setButtonLoading(true);
      if(values !== undefined && values !== null){
        if(verifyPassword(values)){
          try {
            console.log("values--->",values);
            const response = await axios.put(
              `${constants.BASE_API_URL}/user/verification/forget/${id}`,
              {
                newPassword: values.password,
                confirmPassword: values.confirmPassword,
              }
            );
            console.log('succes', response);
            setButtonLoading(false);
            setIsReset(true);
            showNotifyMessage('success', response?.data?.message, messageHandler);
            navigate('/signin');
          } catch (error) {
            setButtonLoading(false);
            console.error('Error resetting password:', error);
            console.log(error);
            if (
              error?.response?.status == 500 ||
              error?.response?.status == '500'
            ) {
              navigate('/internal500');
            }
    
            showNotifyMessage(
              'error',
              error?.response?.data?.message,
              messageHandler
            );
          }
        }
      }
      setButtonLoading(false);
    },
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: 'normal',
  };

  return (
    <>
      <div className="resetpassword-header">
        <SignHeader
          title="AM-Chat"
          linkText="Don't have an account?"
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row mainContent">
                <div className="box-round">
                  <div className="text-top">
                    <h2>Set Password</h2>
                    <p>Please use your organization email id.</p>
                  </div>

                  <div className="form-content">
                    <GeneralForm
                      form={form}
                      {...feedingVariable}
                      buttonLoading={buttonLoading}
                      isReset={isReset}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
