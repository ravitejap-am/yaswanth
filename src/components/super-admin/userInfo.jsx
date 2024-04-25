import React, { useEffect, useState } from 'react';
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
import { BUTTON_COLOUR } from '../../constants/Constant';

function UserInfoForm({
  formData,
  setFormData,
  orgData,
  errors,
  setErrors,
  personalInformationHandler,
  orgStatus,
  readOnlyMode,
  organisation,
  setSelectedTab,
  selectedTab,
  isDisable
}) {
  const isMobile = useMediaQuery('(max-width:600px)');
  // const [isDisable, setIsDisable] = useState(false)

  // const checkPermission = () => {
  //   if(orgStatus === 'edit' || readOnlyMode){
  //     if(formData.email !== "" && formData.email !== undefined){
  //       return true
  //     }
  //     return false
  //   }
  //   return false
  // }
  // useEffect(() => {
  //   const isPermssion = checkPermission()
  //   setIsDisable(isPermssion)  
  // },[])

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
                disabled={isDisable ? true : false}
                style={{
                  backgroundColor:
                  isDisable ? '#CBD5E1' : '',
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
          <Button
            style={{ marginTop: '1em', width: '8em' }}
            onClick={() => {
              if(readOnlyMode){
                setSelectedTab('organizationdomains')
              }else{
                personalInformationHandler("organizationdomains")
              } 
            }}
          >
            <Typography variant="body1">Previous</Typography>
          </Button>
          <Button
            type="primary"
            style={{ marginTop: '1em', width: '8em', backgroundColor: BUTTON_COLOUR }}
            onClick={() => {
              if(readOnlyMode){
                setSelectedTab('subscriptionplan')
              }else{
                personalInformationHandler("subscriptionplan")
              } 
            }}
          >
            <Typography variant="body1">Next</Typography>
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default UserInfoForm;
