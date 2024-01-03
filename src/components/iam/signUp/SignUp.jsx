import React, { useState } from 'react';
import { Layout, Form } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import './signup.css';
import GeneralForm from '../../common/forms/GeneralForm.jsx';

const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
const SignUp = ({ screenHandler }) => {
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    } else {
      return Promise.resolve();
    }
  };
  const validateEmail = (_, value) => {
    console.log(value);
    let isValid = value;
    console.log(value);
    console.log(isValid);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(isValid));
    console.log(!!isValid);
    if (isValid && emailRegex.test(isValid)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid email address!');
  };
  const submitHandler = (values) => {
    console.log('submitting....');
    console.log(values);
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
        { required: true, message: 'Please input your email!' },
        { validator: validateEmail },
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
    // {
    //   label: 'Confirm Password',
    //   type: 'confirmPassword',
    //   name: 'confirmPassword',
    //   rules: [{ required: true, message: 'Please confirm your password!' }],
    // },
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
          value: 'option2',
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
    {
      label: 'Upload',
      type: 'file',
      name: 'fileList',
      numberOfImage: 2,
      fileType: 'image/png',
      fileSize: 1,
      url: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    },
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
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
  };
  return (
    <Content className="coloumCenter" style={{ gap: '1em' }}>
      <GeneralForm {...feedingVariable} />
    </Content>
  );
};
export default SignUp;
