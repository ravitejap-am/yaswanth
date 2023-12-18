import React from 'react';
import { Layout } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import './signup.css';
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
  const validateConfirmPassword = (_, value, { getFieldValue }, values) => {
    console.log(values);
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
      name: 'email',
      rules: [
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Invalid email format' },
      ],
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
    {
      label: 'Confirm Password',
      type: 'confirmPassword',
      name: 'confirmPassword',
      rules: [
        { required: true, message: 'Please confirm your password!' },
        // { validator: validateConfirmPassword },
      ],
    },
    {
      label: 'Checkbox',
      type: 'checkbox',
      name: 'isSelected',
      rules: [{ required: true, message: 'Please Check the element' }],
    },
    // {
    //   label: 'Number',
    //   type: 'number',
    //   name: 'number',
    //   rules: [{ required: true, message: 'Please enter the Number' }],
    // },
    // {
    //   label: 'Switch',
    //   type: 'switch',
    //   name: 'myswitch',
    //   rules: [{ required: true, message: 'Please  select the switch' }],
    // },
    // {
    //   label: 'Date',
    //   type: 'date',
    //   name: 'date',
    //   rules: [{ required: true, message: 'Please  select the Date' }],
    // },
    {
      label: 'Select',
      type: 'select',
      name: 'select',
      rules: [{ required: true, message: 'Please  select the somthing' }],
      options: [
        {
          value: 'option1',
          label: 'Option 1',
        },
        {
          value: 'option1',
          label: 'Option 2',
        },
        {
          value: 'option3',
          label: 'Option 3',
        },
        {
          value: 'option4',
          label: 'Option 4',
          disabled: true,
        },
      ],
    },
    // {
    //   label: 'Name',
    //   type: 'text',
    //   name: 'text',
    //   rules: [{ required: true, message: 'Please input your text!' }],
    // },
    // {
    //   label: 'Description',
    //   type: 'description',
    //   name: 'comment',
    //   rules: [{ required: true, message: 'Please input your text!' }],
    //   row: 3,
    // },
    // {
    //   label: 'Upload',
    //   type: 'file',
    //   name: 'fileList',
    // },
    // {
    //   label: 'Input Box',
    //   type: 'text',
    //   name: 'text',
    //   rules: [{ required: true, message: 'Please input your Text' }],
    // },
  ];
  const submitButtonProperty = {
    name: 'Submit',
    color: 'white',
    backgroundColor: '#4096f',
    type: 'primary',
  };
  const cancelButtonProperty = {
    name: 'Cancel',
    color: 'black',
    backgroundColor: 'white',
    type: 'default',
  };
  return (
    <Content className="coloumCenter" style={{ gap: '1em' }}>
      <GeneralForm
        formElements={formElements}
        onSuccesHandler={handleSignUp}
        submitButton={submitButtonProperty}
        cancelButton={cancelButtonProperty}
        // formType="signin"
        // forgorPasswordHandler={() => {
        //   alert('hi');
        // }}
      />
    </Content>
  );
};
export default SignUp;
