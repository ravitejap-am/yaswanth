import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import GeneralForm from '../../components/common/forms/GeneralForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage';
import Footer from '../../pages/home/Footer/Footer';
import SignHeader from '../home/SignHeader/SignHeader';
import { setUser, selectUser } from '../../store/authSlice';

import * as constants from '../../constants/Constant';

const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const jwtToken = false;

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        navigate('/dashboardadmin');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, navigate]);

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    } else {
      return Promise.resolve();
    }
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid email address!');
  };

  const submitHandler = async (values) => {
    const url = `${constants.BASE_API_URL}${constants.SIGNIN_ENDPOINT}`;

    try {
      const response = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      switch (response.data.code) {
        case 'SIGNIN-S-001':
          // console.log("Login successful:", response);
          toast.success('User login successfully!!');
          const jwtToken = response.data.data?.jwtToken;
          const fetchedUserData = { userToken: jwtToken };
          dispatch(setUser(fetchedUserData));
          console.log('JWT Token after dispatch:', jwtToken);
          setShowSuccessMessage(true);
          break;
        case 'SIGNIN-IUP-002':
          toast.error('Invalid username or password');
          break;
        case 'SIGNIN-UNF-003':
          toast.error(
            'User not verified. Please complete the verification or registration process.'
          );
          break;
        case 'SIGNIN-AL-004':
          toast.error(
            'Your Account is locked due to invalid attempts. Please reset your password using the Forget Password option.'
          );
          break;
        case 'SIGNIN-IE-005':
          toast.error(
            'Invalid email format. Please provide a valid email address.'
          );
          break;
        // Add other cases as needed
        default:
          toast.error('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.response);

      switch (error.response?.status) {
        case 404:
          toast.error('Your email ID is not registered. Please Sign Up.');
          break;
        case 400:
          toast.error(
            'User not verified. Please complete the verification or registration process.'
          );
          break;
        case 422:
          toast.error(
            'Invalid email format. Please provide a valid email address.'
          );
          break;
        case 423:
          toast.error(
            'Your Account is locked due to invalid attempts. Please reset your password using the Forget Password option.'
          );
          break;
        case 403:
          toast.error(
            'Your organization email domain is not registered with us. Please reach out to sales@areteminds.com'
          );
          break;
        case 401:
          toast.error('Invalid username or password');
          break;
        case 403:
          toast.error(
            'Looks like your account has been closed. Please check with your organizational admin.'
          );
          break;
        default:
          toast.error('An error occurred. Please try again.');
      }
    }
  };

  const cancelHandler = (errorInfo) => {
    console.log('Canceling....');
    console.log(errorInfo);
  };

  const formElements = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      rules: [
        { required: true, message: 'Please input your email' },
        { type: 'email', message: 'Invalid email format' },
      ],
      style: {},
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      rules: [
        { required: true, message: 'Please input your password!' },
        { validator: validatePassword },
      ],
    },
  ];

  const submitButtonProperty = {
    name: 'Sign In',
    color: 'white',
    backgroundColor: '#6366F1',
    type: 'primary',
    width: '467px',
    height: '50px',
    borderRadius: '35px',
    marginTop: '.6em',
    fontSize: '0.7rem',
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

  const feedingVariable = {
    isCancel: false,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: 'normal',
    forgorPasswordHandler: () => {
      console.log('forgot Password....');
    },
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    formType: 'signin',
  };

  return (
    <>
      <div className="signin-header">
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
                    <h2>Sign In</h2>
                    <p>Please sign in with your organization email id</p>
                  </div>

                  <div className="form-content">
                    <GeneralForm {...feedingVariable} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotifyMessage />
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
