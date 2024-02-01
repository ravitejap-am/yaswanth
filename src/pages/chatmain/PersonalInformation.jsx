import React, { useState } from 'react';
import './UserProfile.css';
import GeneralForm from "../../components/common/forms/GeneralForm";
import editprofilepic from '../../asset/editprofilepic.png';
import Dropdown from '../../components/common/forms/GeneralForm';

const PersonalInformation = ({ setFileSysytem, validateEmail }) => {
  const [orgName, setOrgName] = useState('');
  const [userStatus, setUserStatus] = useState('active');

  const userStatusOptions = [
    { value: "active", label: "Active User" },
    { value: "inactive", label: "Inactive User" },
  ];

  const formElements = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      rules: [
        { required: true, message: "Please input your First Name" },
        { type: "name", message: "Invalid First Name" },
      ],
      style: { width: "350px", height: "30px", marginLeft: '20px' }
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      rules: [
        { required: true, message: "Please input your Last Name" },
        { type: "name", message: "Invalid Last Name" },
      ],
      style: { width: "350px", height: "30px", marginLeft: '20px' }
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Invalid Email" },
      ],
      style: { width: "350px", height: "30px", marginLeft: '20px', backgroundColor: "#CBD5E1" }
    },
    {
      label: "Organization Name",
      type: "text",
      name: "orgName",
      rules: [
        { required: true, message: "Please input your Organization Name" },
        { type: "name", message: "Invalid Organization Name" },
      ],
      style: { width: "350px", height: "30px", backgroundColor:"#CBD5E1",marginLeft: '20px' }
    },
    {
      name: "User Status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      style: { width: "375px", height: "40px", marginLeft: '20px', borderRadius: "20px",paddingLeft:"10px",cursor:"pointer",marginTop:"8px" },
      labelName: false,
      rules: [{ required: true, message: "Please select Country" }],
    },
  ];

  const submitButtonProperty = {
    name: "Submit",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "150px",
    height: "50px",
    borderRadius: "34px",
    marginLeft: "19px",
    marginTop:"1.5rem"
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log("Canceling....");
    },
    isSubmit: true,
    submitHandler: () => {
      console.log("Submitting PersonalInformation form....");
    },
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: "normal",
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }
  };

  return (
    <div className='personal-contentcard'>
      <div className='user-profile-content'>
        <div className='user-profile-img'>
          <img className='edit-profilepic' src={editprofilepic} alt="" />
        </div>
        <div className='user-profle-name'>
          <h2>Clayton Santos</h2>
          <div className='personalinfo-user-Status'>
            <p>Active User</p>

          </div>
        </div>
      </div>
      <GeneralForm {...feedingVariable} />
    </div>
  );
}

export default PersonalInformation;
