import React, { useState } from 'react';
import { Button } from 'antd';
import './userForm.css'; 
import {Box, Grid, FormHelperText } from "@mui/material"
import { yellow } from '@mui/material/colors';

function UserInfoForm({
  formData,
  setFormData,
  orgData,
  errors,
  setErrors,
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

    setErrors(errors);
    return isValid;
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8} md={5}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                className="orgInputstyle"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <FormHelperText error sx={{ fontSize: '14px' }}>{errors.firstName}</FormHelperText>
              )}
        </div>
        </Grid>
        <Grid item xs={8} md={5}>
         <div className="form-group">
           <label htmlFor="lastName">Last Name:</label>
           <input
            className="orgInputstyle"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.lastName}</FormHelperText>}
        </div>
        </Grid>
        <Grid item xs={8} md={5}>
          <div className="form-group">
           <label htmlFor="email">Email:</label>
           <input
            className="orgInputstyle"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.email}</FormHelperText>}
        </div>
        </Grid>
        <Grid container spacing={1}>
        <Grid item xs={6} sm={3} md={2} lg={1}
        >
       <Button
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('personalinformation');
          }}
        >
          Back
        </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1}>
        <Button
          type="primary"
          style={{ marginTop: '1em', width: '8em'}}
          onClick={() => {
            personalInformationHandler('organizationdomains');
          }}
        >
          Next
        </Button>
          
        </Grid>
      </Grid>
      </Grid>
    </Box>
    // <form
    //   className="form"
    //   onSubmit={handleSubmit}
    //   style={{ padding: '10px', marginTop: '2em' }}
    // >
    //   <div className="form-row">
    //     <div className="form-group">
    //       <label htmlFor="firstName">First Name:</label>
    //       <input
    //         className="inputstyle"
    //         type="text"
    //         id="firstName"
    //         name="firstName"
    //         value={formData.firstName}
    //         onChange={handleChange}
    //       />
    //       {errors.firstName && (
    //         <span className="error">{errors.firstName}</span>
    //       )}
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="lastName">Last Name:</label>
    //       <input
    //         className="inputstyle"
    //         type="text"
    //         id="lastName"
    //         name="lastName"
    //         value={formData.lastName}
    //         onChange={handleChange}
    //       />
    //       {errors.lastName && <span className="error">{errors.lastName}</span>}
    //     </div>
    //   </div>
    //   <div className="form-row">
    //     <div className="form-group">
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         className="inputstyle"
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //       />
    //       {errors.email && <span className="error">{errors.email}</span>}
    //     </div>
    //   </div>
    //   <div
    //     className="center"
    //     style={{
    //       paddingLeft: '10px',
    //       marginTop: '1em',
    //       gap: '2em',
    //       justifyContent: 'flex-start',
    //     }}
    //   >
    //     <Button
    //       style={{ marginTop: '1em', width: '8em' }}
    //       onClick={() => {
    //         personalInformationHandler('personalinformation');
    //       }}
    //     >
    //       Back
    //     </Button>
    //     <Button
    //       type="primary"
    //       style={{ marginTop: '1em', width: '8em' }}
    //       onClick={() => {
    //         personalInformationHandler('organizationdomains');
    //       }}
    //     >
    //       Next
    //     </Button>
    //   </div>
    // </form>
  );
}

export default UserInfoForm;
