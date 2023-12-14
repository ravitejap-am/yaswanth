import React from 'react';
import { Layout } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import './signup.css';
import AuthForm from '../../common/forms/AuthForm.jsx';
import GeneralForm from '../../common/forms/GeneralForm.jsx';

const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
const SignUp = ({ screenHandler }) => {
  const handleSignUp = (formData) => {
    console.log('Signing up with:', formData);
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    } else {
      return Promise.resolve();
    }
  };
  const validateConfirmPassword = (_, value, { getFieldValue }) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('Passwords do not match');
    } else {
      return Promise.resolve();
    }
  };
  const formElements = [
    {
      label: 'Email',
      type: 'email',
      rules: [
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Invalid email format' },
      ],
    },
    {
      label: 'Password',
      type: 'password',
      rules: [
        { required: true, message: 'Please input your password!' },
        { validator: validatePassword },
      ],
    },
    {
      label: 'Confirm Password',
      type: 'confirmPassword',
      rules: [
        { required: true, message: 'Please confirm your password!' },
        { validator: validateConfirmPassword },
      ],
    },
  ];
  const submitButtonProperty = {
    name: 'Submit',
    color: 'white',
    // backgroundColor: 'green',
    // width: '5em',
    // height: '2em',
  };
  const cancelButtonProperty = {
    name: 'Cancel',
    color: 'black',
    // backgroundColor: 'blue',
    // width: '5em',
    // height: '2em',
  };
  return (
    <Content className="coloumCenter" style={{ gap: '1em' }}>
      <GeneralForm
        formElements={formElements}
        onSuccesHandler={handleSignUp}
        submitButton={submitButtonProperty}
        cancelButton={cancelButtonProperty}
      />
    </Content>
  );
};
export default SignUp;
