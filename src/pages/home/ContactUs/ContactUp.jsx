import React, { useEffect, createRef } from 'react';
import img1 from '../../../asset/contact.png';
import GeneralForm from '../../../components/common/forms/GeneralForm';
import { Form, Input, Select } from 'antd';
import axios from 'axios';
import * as constants from '../../../constants/Constant';
import './ContactUp.css';

const { Option } = Select;

const ContactUp = () => {
  const formRef = createRef();

  useEffect(() => {
    // Scroll to the top of the form when the component mounts
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);
  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid email address!');
  };
  const formElements = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      style: {
        width: '495px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        color: '#FFF',
      },
      rules: [{ required: true, message: 'Please enter your name' }],
      labelName: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      style: {
        width: '495px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        color: '#FFF',
      },
      labelName: true,
      rules: [
        { required: true, message: 'Please enter your email' },
        { type: 'email', message: 'Please enter a valid email address' },
      ],
    },
    {
      name: 'plan',
      label: 'Select Plan',
      type: 'select',
      style: {
        width: '521px',
        height: '50px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        paddingLeft: '10px',
        color: '#FFF',
        margin: '0px 5px 20px 1px',
      },
      labelName: true,
      options: [
        { value: 'basic', label: 'Freemium' },
        { value: 'premium', label: 'Standard' },
        { value: 'pro', label: 'Enterprise' },
      ],
      rules: [{ required: true, message: 'Please select a plan' }],
    },
    {
      name: 'comment',
      label: 'Comments',
      type: 'description',
      style: {
        width: '525px',
        height: '50px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        marginBottom: '13px',
        paddingLeft: '10px',
        color: '#FFF',
      },
      labelName: 'Comments',
      // rules: [{ required: true, message: 'Please enter your comment' }],
    },
  ];

  const submitHandler = async (values) => {
    // alert('hi');
    console.log('contact up', values);
    try {
      const response = await axios.post(
        'http://54.161.113.196:8080/user/contactUs',
        {
          name: values.name,
          emailId: values.email,
          status: true,
          plan: values.plan,
          comments: values.comment,
          createdBy: 'admin',
          updatedBy: 'admin',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API Response:', response);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // const submitButtonProperty = {
  //   name: 'Submit',
  //   color: '#ffffff',
  //   backgroundColor: 'var(--Brand-500, #6366F1)',
  //   width: '525px',
  //   height: '50px',
  //   borderRadius: '28px',
  //   boxShadow: 'none',
  //   type: 'primary',
  // };
  const submitButtonProperty = {
    name: 'Submit',
    color: 'white',
    backgroundColor: 'var(--Brand-500, #6366F1)',
    type: 'primary',
    width: '525px',
    height: '50px',
    borderRadius: '35px',
    marginTop: '.6em',
  };

  // const feedingVariable = {
  //   isCancel: false,
  //   cancelHandler: cancelHandler,
  //   isSubmit: true,
  //   submitHandler: submitHandler,
  //   submitButtonProperty: submitButtonProperty,
  //   formElements: formElements,
  //   formType: 'normal',
  //   forgorPasswordHandler: () => {
  //     console.log('forgot Password....');
  //   },
  //   validateEmail: validateEmail,
  //   setFileSysytem: setFileSysytem,

  // };
  const feedingVariable = {
    isCancel: false,
    isSubmit: true,
    cancelHandler: (errorInfo) => {
      console.log(errorInfo);
    },
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: 'normal',
    forgorPasswordHandler: () => {
      console.log('forgot Password....');
    },
    validateEmail: validateEmail,
  };

  return (
    <div className="Contact-us-page-main-div">
      <br />
      <br />
      <br />
      <div className="Contact-us-page-child-div">
        <div className="Contact-usi-left-side-img">
          <img
            src={img1}
            alt="contact-image"
            className="contact-us-image-style"
          />
        </div>
        <div className="Contact-us-page-ant-form">
          <div>
            <p className="Contact-us-form-title">Contact Us</p>
            <p className="Contact-us-form-sub-title">
              To get in touch with AM Chat team, simply fill out the contact
              form below
            </p>
          </div>

          <div className="Contact-Us-General-Form-Style">
            <GeneralForm {...feedingVariable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUp;
