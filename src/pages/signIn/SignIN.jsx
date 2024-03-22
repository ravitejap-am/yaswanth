import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { Form } from 'antd';
import GeneralForm from '../../components/common/forms/GeneralForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage';
import Footer from '../../pages/home/Footer/Footer';
import SignHeader from '../home/SignHeader/SignHeader';
import { setUser, selectUser } from '../../store/authSlice';
import * as constants from '../../constants/Constant';
import { useMessageState } from '../../hooks/useapp-message';
import { SetSessionToken } from '../../utils/SessionManager';
import { Form, Input, Select, Grid, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import "./sign-in.css"
import { Box, Typography } from '@mui/material';

const SignIn = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    if (showSuccessMessage && user?.userToken) {
      const jwtToken = user.userToken;
      const decodedToken = decodeJWT(jwtToken);
      if (decodedToken) {
        const role = decodedToken.role;
        console.log('Role:----->', role);
        localStorage.setItem('userRole', role);
        switch (role) {
          case 'ORG_ADMIN':
            navigate('/chat');
            break;
          case 'USER':
            navigate('/user');
            break;
          case 'SUPER_ADMIN':
            navigate('/dashboard');
            break;
          default:
            navigate('/default');
        }
      } else {
        console.error('Invalid JWT token');
      }
    }
  }, [showSuccessMessage, user, navigate]);

  useEffect(() => {
    if (!buttonLoading && showSuccessMessage) {
      setShowSuccessMessage(false);
    }
  }, [buttonLoading, showSuccessMessage]);

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

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid email address!');
  };

  const submitHandler = async (values) => {
    if (isSigningIn) return;

    if (values != undefined) {
      setIsSigningIn(true);
      setButtonLoading(true);
      const url = `${constants.BASE_API_URL}${constants.SIGNIN_ENDPOINT}`;
      try {
        const response = await axios.post(url, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.code) {
          const jwtToken = response.data.data?.jwtToken;
          if (jwtToken) {
            SetSessionToken(jwtToken);
          }

          const fetchedUserData = { userToken: jwtToken };
          dispatch(setUser(fetchedUserData));
          console.log('JWT Token after dispatch:', response.data);
          console.log('JWT Token after dispatch:', jwtToken);
          setShowSuccessMessage(true);
          setButtonLoading(false);
          setIsReset(true);
          showNotifyMessage('success', response?.data?.message, messageHandler);
        } else {
          showNotifyMessage('error', response?.data?.message || "An error occurred. Please try again.", messageHandler);
          // toast.error(
          //   response.data.message || 'An error occurred. Please try again.'
          // );
          setButtonLoading(false);
          setIsReset(false);
          hideNotifyMessage();
        }
      } catch (error) {
        console.error('Login failed:', error.response);
        setIsSigningIn(false);
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage(
          'error',
          error?.response?.data?.message,
          messageHandler
        );
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const cancelHandler = (errorInfo) => {
    console.log('Canceling....');
    console.log(errorInfo);
  };


  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
  
    scrollToTop();
  
    const handleScroll = () => {
      window.removeEventListener('scroll', handleScroll);
    };
  
    window.addEventListener('scroll', handleScroll);
  
  }, []); 
  

  const formElements = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      labelname: 'email',
      rules: [
        { required: true, message: 'Please input your email' },
        { type: 'email', message: 'Invalid email format' },
      ],
      style: {},
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      emptyErrorMessage: 'Please Enter the Email',
      invalidErrorMessage: 'Please Enter the Valid Email',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      rules: [{ required: true, message: 'Please input your password!' }],
      iconStyle: {
        position: 'absolute',
        right: '10px',
        top: '54%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      },
      pattern: /^.+$/,
      emptyErrorMessage: 'Please Enter the passsword',
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
          linkText={!isMobile && "Don't have an account?"}
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="signin-main-css">
      <Box className="text-top-signup" mb={3} >
        <Typography variant="h2" gutterBottom >Sign In</Typography>
       <Typography variant="body1" mt={4}gutterBottom color={'#1e293b'}> Please sign in with your organisation <br /> email id. </Typography>
        </Box>


        <div className='signin-form-css'> 
        <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            autoComplete="off"
            // style={{ width: "auto", margin: "auto" }}
            onFinish={submitHandler}
          >
            <Form.Item
              // label="Email"
              name="email"
              place
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: 'email',
                  message: 'Invalid email format',
                },
              ]}
              required={false}
            >
              <Input className="signin_input_css"  placeholder="Email"/>
            </Form.Item>
            <Form.Item
              // label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
              required={false}
            >
                  <Input.Password
                    className="signin_input_css"
                    placeholder= "Password"
                    iconRender={visible =>
                      visible ? <EyeOutlined  style={{fontSize: "25px"}}/> : <EyeInvisibleOutlined style={{fontSize: "25px"}}/>
                    }
                  /> 
                  </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signin_submit_btn_css"
              >
              <Typography variant="button" display="block" >
             Sign In
            </Typography> 
              </Button>
            </Form.Item>


          </Form>

        </div>
          <Typography className='linktextsignin' variant="body2" gutterBottom>
            New user? <Link to={'/registeruser'} style={{textDecoration: "underline", color: "black", marginLeft: "3px"}}> Sign up!</Link>
            </Typography>
          <Box className='linktextsignin' mt={2}>
            <Typography variant="body2" gutterBottom>
            Have you forgotten your password?  
            <Link
            to={'/recoverypassword'}
            style={{textDecoration: "underline", color: "black", marginLeft: "3px"}}
          > Forgot Password! 
          </Link>           
           </Typography>
           </Box>
        <NotifyMessage />
        <br />

        </div>
        <div className="signin-footer">
          <Footer />
        </div>
    </>
  );
};

export default SignIn;
