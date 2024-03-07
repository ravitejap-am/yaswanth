import React, { useState } from 'react';
import { Button } from 'antd';
import './userForm.css'; // Import CSS file for styling

function UserInfoForm({
  formData,
  setFormData,
  orgData,
  errors,
  setErrors,
  setSelectedTab,
  personalInformationHandler,
}) {
  const handleChange = (e) => {
    let myContact = orgData.contact;
    const { name, value } = e.target;
    myContact[name] = value;
    setFormData({
      ...orgData,
      myContact,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('validateForm---->', validateForm);
    if (validateForm()) {
      // Submit the form
      // submitHandler(formData)
      console.log(formData);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    // if (!formData.lastName.trim()) {
    //   errors.lastName = 'Last name is required';
    //   isValid = false;
    // }

    setErrors(errors);
    return isValid;
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      style={{ padding: '10px', marginTop: '2em' }}
    >
      {console.log('orgdat', orgData, 'errors', errors)}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="inputstyle"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="inputstyle"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="inputstyle"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>
      <div
        className="center"
        style={{
          paddingLeft: '10px',
          marginTop: '1em',
          gap: '2em',
          justifyContent: 'flex-start',
        }}
      >
        <Button
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('personalinformation');
          }}
        >
          Back
        </Button>
        <Button
          type="primary"
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('organizationdomains');
          }}
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default UserInfoForm;
