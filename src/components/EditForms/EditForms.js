import React, { useState } from 'react';
import { Button } from 'antd';
import './editForm.css'; // Import CSS file for styling

function EditForm({ formData, setFormData, submitHandler }) {
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
    console.log("validateForm---->",validateForm);
    if (validateForm()) {
      // Submit the form
      submitHandler(formData)
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
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="buttonStyle"
        // onClick={() => {
        //   submitHandler(formData);
        // }}
      >
        Submit
      </Button>
    </form>
  );
}

export default EditForm;
