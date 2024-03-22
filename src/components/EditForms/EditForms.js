import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './editForm.css';
import { Box, Grid } from '@mui/material';

function EditForm({
  formData: initialFormData,
  setFormsData,
  submitHandler,
  isEdit,
  cancelHandler,
  buttonLoading,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

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
      submitHandler(formData);
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
    <form className="form" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6} className="form-group">
         <Typography> <label htmlFor="firstName">First Name:</label></Typography>
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
        <Typography> <label htmlFor="lastName">Last Name:</label></Typography>
          <input
            className="inputstyle"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </Grid>
        <Grid item xs={12} md={6} lg={6} className="form-group">
          <Typography><label htmlFor="email">Email:</label></Typography>
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
      <Box className="button-container">
        {!isEdit && (
          <Button
            type="secondary"
            className="buttonStyle"
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #6366f1',
            }}
            onClick={cancelHandler}
          >
            <Typography variant="button"> Cancel</Typography>
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="buttonStyle"
          loading={buttonLoading}
        >
          {isEdit ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
}

export default EditForm;
