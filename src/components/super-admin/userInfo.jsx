import React, { useState } from 'react';
import { Button } from 'antd';
import './userForm.css';
import {
  Box,
  Grid,
  FormHelperText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { yellow } from '@mui/material/colors';

function UserInfoForm({
  formData,
  setFormData,
  orgData,
  errors,
  setErrors,
  personalInformationHandler,
  orgStatus,
  readOnlyMode,
}) {
  const isMobile = useMediaQuery('(max-width:600px)');
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
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          height: '60vh',
          overflowY: 'scroll',
          // '&::-webkit-scrollbar': {
          //   width: '2px',
          //   height: '2px'
          // },
          // '&::-webkit-scrollbar-track': {
          //   background: 'transparent',
          // },
          // '&::-webkit-scrollbar-thumb': {
          //   background: '#888',
          //   borderRadius: '6px',
          // },
        }}
      >
        <Grid item container spacing={2}>
          <Grid item xs={8} md={5}>
            <div className="form-group">
              <Typography variant="body1">First Name:</Typography>
              <input
                className="orgInputstyle"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={readOnlyMode}
                style={{ backgroundColor: readOnlyMode ? '#CBD5E1' : '' }}
              />
              {errors.firstName && (
                <FormHelperText error sx={{ fontSize: '14px' }}>
                  {errors.firstName}
                </FormHelperText>
              )}
            </div>
          </Grid>
          <Grid item xs={8} md={5}>
            <div className="form-group">
              <Typography variant="body1">Last Name:</Typography>
              <input
                className="orgInputstyle"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={readOnlyMode}
                style={{ backgroundColor: readOnlyMode ? '#CBD5E1' : '' }}
              />
              {errors.lastName && (
                <FormHelperText error sx={{ fontSize: '14px' }}>
                  {errors.lastName}
                </FormHelperText>
              )}
            </div>
          </Grid>
          <Grid item xs={8} md={5}>
            <div className="form-group">
              <Typography variant="body1">Email:</Typography>
              <input
                className="orgInputstyle"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={orgStatus === 'edit' || readOnlyMode ? true : false}
                style={{
                  backgroundColor:
                    orgStatus === 'edit' || readOnlyMode ? '#CBD5E1' : '',
                }}
              />
              {errors.email && (
                <FormHelperText error sx={{ fontSize: '14px' }}>
                  {errors.email}
                </FormHelperText>
              )}
            </div>
          </Grid>
        </Grid>
        <Box
          style={{
            display: 'flex',
            gap: '1em',
            flexDirection: 'row',
            justifyContent: isMobile ? 'center' : 'flex-end',
            alignItems: isMobile ? 'center' : 'flex-end',
            width: '100%',
          }}
        >
          {/* <Box style={{ flex: 1 }}></Box> */}
          <Button
            style={{ marginTop: '1em', width: '8em' }}
            onClick={() => {
              // personalInformationHandler('personalinformation');

              personalInformationHandler('organizationdomains');
            }}
          >
            <Typography variant="body1">Previous</Typography>
          </Button>
          <Button
            type="primary"
            style={{ marginTop: '1em', width: '8em' }}
            onClick={() => {
              personalInformationHandler('subscriptionplan');
            }}
          >
            <Typography variant="body1">Next</Typography>
          </Button>
        </Box>
        {/* <Grid
          item
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={0.2}
        >
          <Grid item xs={6} sm={2.8} md={3} lg={1.6} xl={1.2}>
            <Button
              style={{ marginTop: '1em', width: '8em' }}
              onClick={() => {
                // personalInformationHandler('personalinformation');

                personalInformationHandler('organizationdomains');
              }}
            >
              <Typography variant="body1">Previous</Typography>
            </Button>
          </Grid>
          <Grid item xs={6} sm={2.8} md={3} lg={1.6} xl={1.2}>
            <Button
              type="primary"
              style={{ marginTop: '1em', width: '8em' }}
              onClick={() => {
                personalInformationHandler('subscriptionplan');
              }}
            >
              <Typography variant="body1">Next</Typography>
            </Button>
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default UserInfoForm;
