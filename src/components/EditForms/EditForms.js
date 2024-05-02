import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './editForm.css';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { scopes } from '../../constants/scopes';

function EditForm({
  formData: initialFormData,
  setFormsData,
  submitHandler,
  isEdit,
  cancelHandler,
  buttonLoading,
  permittedScopes,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [isDirty, setIsDirty] = useState(true);
  const [errors, setErrors] = useState({});
  const isAndroid = /Android/.test(navigator.userAgent);
  const isIos =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (initialFormData[name] === value) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitHandler(formData);
      setIsDirty(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      style={{
        height: '84%',
        marginTop: isMobile ? '2em' : '0px',
        marginLeft: isMobile ? '5px' : '0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6} className="form-group">
              <Typography>
                {' '}
                <label htmlFor="firstName">First Name:</label>
              </Typography>
              <input
                className="inputstyle"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="form-group">
              <Typography>
                {' '}
                <label htmlFor="lastName">Last Name:</label>
              </Typography>
              <input
                className="inputstyle"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="form-group">
              <Typography>
                <label htmlFor="email">Email:</label>
              </Typography>
              <input
                className="inputstyle"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isEdit}
                style={{ backgroundColor: isEdit ? '#CBD5E1' : '' }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </Grid>
          </Grid>
        </Box>
        <Box
          className="button-container"
          sx={{
            marginBottom: {
              xs: isAndroid ? '1em' : '3em',
            },
          }}
        >
          {
            <Button
              type="secondary"
              className="buttonStyle"
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid black',
              }}
              onClick={cancelHandler}
            >
              <Typography variant="button"> Cancel</Typography>
            </Button>
          }
          {permittedScopes?.includes(scopes.UU) && (
            <Button
              type="primary"
              htmlType="submit"
              className="buttonStyle"
              loading={buttonLoading}
              disabled={isDirty}
            >
              {buttonLoading ? (
                '    '
              ) : (
                <Typography variant="button">
                  {isEdit ? 'Update' : 'Submit'}
                </Typography>
              )}
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default EditForm;
