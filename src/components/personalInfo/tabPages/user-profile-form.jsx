import React, { useState } from 'react';
import { Button } from 'antd';
import './userform.css'; // Import CSS file for styling

function UserProfileForm({ formData, setFormData, submitHandler }) {
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   organization: '',
  //   status: '',
  // });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
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

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.organization.trim()) {
      errors.organization = 'Organization is required';
      isValid = false;
    }

    if (!formData.status.trim()) {
      errors.status = 'Status is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
            disabled
            style={{ backgroundColor: '#CBD5E1' }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            className="inputstyle"
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            disabled
            style={{ backgroundColor: '#CBD5E1' }}
          />
          {errors.organization && (
            <span className="error">{errors.organization}</span>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            className="inputstyle"
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled
            style={{ backgroundColor: '#CBD5E1' }}
          />
          {errors.status && <span className="error">{errors.status}</span>}
        </div>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className="buttonStyle"
        onClick={() => {
          submitHandler(formData);
        }}
      >
        Submit
      </Button>
    </form>
  );
}

export default UserProfileForm;
