import React, { useEffect, useState } from 'react';
import styles from './OrganizationForm.module.css'; // Import your CSS file for styling
import { Country, State, City } from 'country-state-city';
import { Button, Select } from 'antd';
import './orginfo.css';
import { ArrowRightOutlined } from '@mui/icons-material';
import {Box, Grid, FormHelperText, useMediaQuery  } from "@mui/material"

const getAllCountries = Country.getAllCountries();
const getAllStates = State.getAllStates();
const getAllCities = City.getAllCities();

function OrganizationForm({
  orgData,
  selectOrgData,
  countries,
  setCountries,
  states,
  setStates,
  localState,
  setLocalState,
  cities,
  setCities,
  organisation,
  errors,
  setErrors,
  personalInformationHandler,
}) {

  const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    const fetchCountries = async () => {
      const countryArray = getAllCountries?.map((country) => ({
        label: country?.name,
        value: country?.name,
        code: country?.isoCode,
      }));
      setCountries(countryArray || []);
    };

    fetchCountries();

    if (organisation.organisationStatus === 'edit') {
      handleCountryChange({
        label: orgData?.address?.country,
        value: orgData?.address?.country,
        code: orgData?.address?.countryCode,
      });
      handleStateChange({
        label: orgData?.address?.state,
        value: orgData?.address?.state,
        code: orgData?.address?.stateCode,
        countryCode: orgData?.address?.countryCode,
      });
    }
  }, []);

  const handleCountryChange = async (value) => {
    console.log('label----', value);
    console.log('countries----', countries);

    setLocalState({ ...localState, country: value.label });

    const filterStates = getAllStates.filter((state) => {
      return state.countryCode === value.code;
    });

    const stateArray = filterStates.map((state) => ({
      label: state.name,
      value: state.name,
      code: state.isoCode,
      countryCode: value?.code,
    }));

    setStates(stateArray);
    setCities([]);
  };

  const handleStateChange = async (value) => {
    setLocalState({ ...localState, state: value.label });
    const filteredCities = getAllCities?.filter(
      (city) =>
        city.stateCode === value.code && city.countryCode === value.countryCode
    );

    const cityArray = filteredCities?.map((city) => ({
      label: city?.name,
      value: city?.name,
    }));

    setCities(cityArray || []);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let myAdress = orgData.address;
    if (name == 'name') {
      const updatedOrgData = {
        ...orgData,
        name: e.target.value,
      };
      selectOrgData(updatedOrgData);
      return;
    }

    myAdress[name] = e.target.value;
    const updatedOrgData = {
      ...orgData,
      address: myAdress,
    };
    selectOrgData(updatedOrgData);
  };

  const handleSelectCountryChange = (value) => {
    const selectedValue = value;
    const selectedOption = countries.find(
      (option) => option.value === selectedValue
    );
    let myAdress = { ...orgData.address };
    myAdress['country'] = value;
    const updatedOrgData = {
      ...orgData,
      address: myAdress,
    };
    selectOrgData(updatedOrgData);
    handleCountryChange(selectedOption);
  };
  const handleSelectStateChange = (value) => {
    const selectedValue = value;
    const selectedOption = states.find(
      (option) => option.value === selectedValue
    );
    let myAdress = { ...orgData.address };
    myAdress['state'] = value;
    const updatedOrgData = {
      ...orgData,
      address: myAdress,
    };
    selectOrgData(updatedOrgData);
    handleStateChange(selectedOption);
  };
  const handleCityChange = (value) => {
    let myAdress = { ...orgData.address };
    myAdress['city'] = value;
    const updatedOrgData = {
      ...orgData,
      address: myAdress,
    };
    selectOrgData(updatedOrgData);
  };

  const handleErrors = (value, name) => {
    if (value.trim()) {
      let temp = { ...errors };
      delete temp[name];
      setErrors(temp);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase());
  return (
    <>


<Box>
      <Grid 
      container 
      sx={{
        height:'60vh',
         overflowY:'scroll',
        '&::-webkit-scrollbar': {
          width: '2px',
          height: '2px' 
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent', 
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888', 
          borderRadius: '6px', 
        },
       }}
      > 
        <Grid item         
        container 
        >
          <Grid item xs={12} md={6} lg={6}>
            <label className={styles.labels}>Organisation Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={orgData?.name}
              onChange={handleChange}
              className={styles.inputstyle}
            />
            {errors.name && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.name}</FormHelperText>}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <label className={styles.labels}>Address One:</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={orgData?.address?.address1}
              onChange={handleChange}
              className={styles.inputstyle}
            />
            {errors.address1 && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.address1}</FormHelperText>}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <label className={styles.labels}>Address Two:</label>
          <input
            type="text"
            id="address-two"
            name="address2"
            value={orgData?.address?.address2}
            onChange={handleChange}
            className={styles.inputstyle}
          />
        </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label className={styles.labels}>Country:</label>
              <Select
                showSearch
                onChange={handleSelectCountryChange}
                placeholder="Select country"
                className={styles.selectContainer}
                optionFilterProp="children"
                filterOption={filterOption}
                filterSort={filterSort}
                options={countries}
                value={orgData?.address?.country}
              />

              {errors.country && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.country}</FormHelperText>}  
            </Grid>   
            <Grid item xs={12} md={6} lg={6}>
              <label className={styles.labels}>State:</label>
              <Select
                showSearch
                onChange={handleSelectStateChange}
                placeholder="Select state"
                className={styles.selectContainer}
                optionFilterProp="children"
                filterOption={filterOption}
                filterSort={filterSort}
                options={states}
                value={orgData?.address?.state}
              />

              {errors.state && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.state}</FormHelperText>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label className={styles.labels}>City:</label>
              <Select
                showSearch
                onChange={handleCityChange}
                placeholder="Select city"
                className={styles.selectContainer}
                optionFilterProp="children"
                filterOption={filterOption}
                filterSort={filterSort}
                options={cities}
                value={orgData?.address?.city}
              />

              {errors.city && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.city}</FormHelperText>}              
            </Grid>                     
        <Grid item xs={12} md={6} lg={6}>
          <label className={styles.labels}>Zip Code:</label>
            <input
              type="number"
              id="postCode"
              name="postCode"
              value={orgData?.address?.postCode}
              onChange={handleChange}
              className={styles.pincodeStyle}
            />
            {errors.postCode && <FormHelperText error sx={{ fontSize: '14px' }}>{errors.postCode}</FormHelperText>}
        </Grid>
        </Grid>
        <Grid item xs={12} 
          container
          direction="row"
          justifyContent={isMobile ? "center" : "flex-end" }
          alignItems={isMobile ? "center" : "flex-end" }
        >
        <Button
          type="primary"
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('organizationdomains');
          }}
        >
          Next
        </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default OrganizationForm;
