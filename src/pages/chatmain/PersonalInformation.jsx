import React, { useState } from 'react';
import './UserProfile.css';
import GeneralForm from "../../components/common/forms/GeneralForm";
import editprofilepic from '../../asset/editprofilepic.png';
import baseprofile from '../../asset/base64.png'

const PersonalInformation = ({ setFileSysytem, validateEmail }) => {

  const [orgName, setOrgName] = useState('')

  const userStatusOptions = [
    { value: "active", label: "Active User" },
    { value: "inactive", label: "Inactive User" },
  ];

  const formElements = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
      style: { width: "350px", height: "30px", marginLeft: '20px' }
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      rules: [
        { required: true, message: "Please input your Enter your email" },
        { type: "name", message: "Invalid Email" },
      ],
      style: { width: "350px", height: "30px", marginLeft: '20px', backgroundColor:"#CBD5E1" }
    },
  ];

  const submitButtonProperty = {
    name: "Submit",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "150px",
    height: "45px",
    borderRadius: "35px",
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
      <div className='personalinput-allfields'>
        <div className='prsnolinfo-fields'>
          <GeneralForm {...feedingVariable} />
        </div>
        <div className='prsnolinfo-inputdields'>
          <input type="text"
            placeholder='Organization name'
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <select className='active-dropdown-input'>
            {userStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
