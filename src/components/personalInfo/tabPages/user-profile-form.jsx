import React, { useState } from "react";
import { Button } from "antd";
import "./userform.css"; // Import CSS file for styling
import { Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserProfileForm({ formData, setFormData, submitHandler }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [errors, setErrors] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsDisable(false);
    // if (formData[name] === value) {
    //   setIsDisable(true);
    // } else {
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      submitHandler(formData);
      setIsDisable(true);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.organization.trim()) {
      errors.organization = "Organisation is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const cancelHandler = () => {
    if(userRole === 'SUPER_ADMIN' || userRole === 'ORG_ADMIN'){
      navigate("/dashboard");
    }else if(userRole === 'USER'){
      navigate("/user");
    }
  };

  return (
    <form 
    className="info-cotnainer"
    style={{ height: '111%'}}
    onSubmit={handleSubmit}>
        <div>
          <div className="profile-form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                className="inputstyle-css"
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
                className="inputstyle-css"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="profile-form-row">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="inputstyle-css"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                style={{ backgroundColor: "#CBD5E1" }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organisation:</label>
              <input
                className="inputstyle-css"
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                disabled
                style={{ backgroundColor: "#CBD5E1" }}
              />
              {errors.organization && (
                <span className="error">{errors.organization}</span>
              )}
            </div>
          </div>
        </div>
        <div
          className="button-container"
          style={{ justifyContent: isMobile ? "center" : "flex-end" }}
        >
          <Button
            htmlType="cancel"
            className="buttonStyle"
            style={{backgroundColor: 'white', color: 'black'}}
            onClick={cancelHandler}
          >
            <Typography variant="button" display="block">
              Cancel
            </Typography>
          </Button>
          <Button
            htmlType="submit"
            className="buttonStyle"
            disabled={isDisable}
          >
            <Typography variant="button" display="block">
              Submit
            </Typography>
          </Button>
        </div>
    </form>
  );
}

export default UserProfileForm;
