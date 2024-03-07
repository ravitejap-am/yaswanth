import React, { useEffect, useState } from 'react';
import styles from './OrganizationForm.module.css'; // Import your CSS file for styling
import { Country, State, City } from 'country-state-city';
import { Button, Select } from 'antd';
import './orginfo.css';
import { ArrowRightOutlined } from '@mui/icons-material';

const getAllCountries = Country.getAllCountries();
const getAllStates = State.getAllStates();
const getAllCities = City.getAllCities();

function OrganizationForm({
  orgData,
  setSelectedTab,
  selectedTab,
  selectOrgData,
  buttonLoading,
  setButtonLoading,
  countries,
  setCountries,
  states,
  setStates,
  localState,
  setLocalState,
  cities,
  setCities,
  organisation,
  editOrganisation,
  setBackDropLoading,
  errors,
  setErrors,
  personalInformationHandler,
}) {
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
      <form
        className={styles.formContainer}
        style={{ padding: '10px', marginTop: '2em' }}
      >
        {console.log(
          'country',
          countries,
          'state',
          states,
          'city',
          cities,
          'staeData',
          orgData,
          'errors',
          errors
        )}
        <div>
          <label htmlFor="org-name">Organization Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={orgData?.name}
            onChange={handleChange}
            className={styles.inputstyle}
          />

          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
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

          {errors.country && <p className={styles.error}>{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="address-one">Address One:</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={orgData?.address?.address1}
            onChange={handleChange}
            className={styles.inputstyle}
          />
          {errors.address1 && <p className={styles.error}>{errors.address1}</p>}
        </div>
        <div>
          <label htmlFor="state">State:</label>
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

          {errors.state && <p className={styles.error}>{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="address-two">Address Two:</label>
          <input
            type="text"
            id="address-two"
            name="address2"
            value={orgData?.address?.address2}
            onChange={handleChange}
            className={styles.inputstyle}
          />
          {errors.address2 && <p className={styles.error}>{errors.address2}</p>}
        </div>

        <div>
          <label htmlFor="city">City:</label>
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

          {errors.city && <p className={styles.error}>{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="zip-code">Zip Code:</label>
          <input
            type="number"
            id="postCode"
            name="postCode"
            value={orgData?.address?.postCode}
            onChange={handleChange}
            className={styles.inputstyle}
          />
          {errors.postCode && <p className={styles.error}>{errors.postCode}</p>}
        </div>
      </form>
      <div></div>
      <div style={{ paddingLeft: '10px' }}>
        <Button
          type="primary"
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('organizationadmin');
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default OrganizationForm;
