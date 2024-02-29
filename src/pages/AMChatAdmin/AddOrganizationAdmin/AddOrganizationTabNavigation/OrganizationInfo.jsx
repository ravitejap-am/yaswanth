import React, { useState, useEffect } from 'react';
import GeneralForm from '../../../../components/common/forms/GeneralForm';
import { useNavigate } from 'react-router-dom';
function OrganizationInfo({
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
}) {
  useEffect(() => {
    console.log('orgData', orgData);
    const fetchCountries = async () => {
      // setButtonLoading(true);
      setBackDropLoading(true);
      try {
        const response = await fetch(
          'https://countriesnow.space/api/v0.1/countries',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        let countries = data.data;
        let countryArray = [];
        countries?.map((country) => {
          let countryObject = {
            label: country?.country,
            value: country?.country,
          };
          countryArray.push(countryObject);
        });
        // setButtonLoading(false);
        setCountries(countryArray);
        setBackDropLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // setButtonLoading(false);
        setBackDropLoading(false);
      }
    };

    fetchCountries();
    if (organisation.organisationStatus == 'edit') {
      let countryValue = {
        label: orgData?.address?.country,
        value: orgData?.address?.country,
      };
      handleCountryChange(countryValue);
      let stateValue = {
        label: orgData?.address?.state,
        value: orgData?.address?.state,
      };
      handleStateChange(stateValue);
    }
  }, []);

  const navigate = useNavigate();
  const submitHandler = (values) => {
    console.log('Form values:', values);
    console.log(values);
    if (values != undefined) {
      if (organisation?.organisationStatus == 'edit') {
        values.landmark = '';
      }
      const updatedOrgData = {
        ...orgData,
        address: values,
        name: values.orgName,
      };
      console.log('updateData', updatedOrgData);
      selectOrgData(updatedOrgData);
      if (organisation?.organisationStatus == 'edit') {
        editOrganisation(updatedOrgData);
        return;
      }

      setSelectedTab('organizationadmin');
    }
    // setSelectedTab('organizationadmin');

    // setSelectedTab('organizationadmin');
  };

  const handleCountryChange = async (value) => {
    console.log(value);
    // setButtonLoading(true);
    setBackDropLoading(true);
    setLocalState({ ...localState, country: value.label });
    let payload = { country: value.label };

    try {
      const response = await fetch(
        `https://countriesnow.space/api/v0.1/countries/states`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: token,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data.data));
      let states = data?.data?.states;
      let stateArray = [];
      states.map((state, index) => {
        let stateObject = {
          label: state.name,
          value: state.name,
        };
        stateArray.push(stateObject);
      });
      setStates(stateArray);
      setBackDropLoading(false);
      // setButtonLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // setButtonLoading(false);
      setBackDropLoading(false);
    }
  };

  const handleStateChange = async (value) => {
    console.log(localState);
    setLocalState({ ...localState, state: value.label });
    // setButtonLoading(true);
    setBackDropLoading(true);
    try {
      const response = await fetch(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: token,
          },
          body: JSON.stringify({
            country: localState.country,
            state: value.label,
          }),
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data.data));
      let cities = data?.data;
      let citiyArray = [];
      cities?.map((city, index) => {
        let cityObject = {
          label: city,
          value: city,
        };
        citiyArray.push(cityObject);
      });
      // setComments(data.data);
      // setCities(data.data);
      setCities(citiyArray);
      // setButtonLoading(false);
      setBackDropLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // setButtonLoading(false);
      setBackDropLoading(false);
    }
  };
 
  const formElements = [
    {
      name: 'orgName',
      label: 'Organization Name',
      type: 'text',
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      // rules: [{ required: true, message: 'Please enter your name' }],
      labelName: false,
      defaultValue: orgData?.name,
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Please Enter the Organisation Name',
      invalidErrorMessage: 'Please Enter the Valid Organisation Name',
    },
    {
      name: 'address1',
      label: 'Address 1',
      type: 'text',
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      labelName: false,
      // rules: [{ required: true, message: 'Please enter Street 1' }],
      defaultValue: orgData?.address?.address1,
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Please Enter the First Address',
      invalidErrorMessage: 'Please Enter the Valid Address',
    },
    {
      name: 'address2',
      label: 'Address 2',
      type: 'text',
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      labelName: false,
      defaultValue: orgData?.address?.address2,
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Please Enter the Second Address',
      invalidErrorMessage: 'Please Enter the Valid Address',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: countries,
      style: {
        width: '469px',
        height: '50px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        margin: '10px 0', // Adjusted for consistent spacing
        paddingLeft: '10px',
        paddingRight: '20px',
        appearance: 'border',
        color: '#475569',
        marginTop: '10px',
      },
      labelName: false,
      // rules: [{ required: true, message: 'Please select Country' }],
      defaultValue: orgData?.address?.country,
      onSelectApiCall: handleCountryChange,
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Pleas Select the Country',
      invalidErrorMessage: 'Pleas Select the Valid Country'
    },
    {
      name: 'state',
      label: 'State',
      type: 'select',
      options: states,
      style: {
        width: '469px',
        height: '50px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        margin: '10px 0', // Adjusted for consistent spacing
        paddingLeft: '10px',
        paddingRight: '20px',
        appearance: 'border',
        color: '#475569',
  
      },
      labelName: false,
      // rules: [{ required: true, message: 'Please select State' }],
       defaultValue: orgData?.address?.state,
      onSelectApiCall: handleStateChange,
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Pleas Select the State',
      invalidErrorMessage: 'Pleas Select the Valid State',
    },
    {
      name: 'city',
      label: 'City',
      type: 'select',
      options: cities,
      style: {
        width: '469px',
        height: '50px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        margin: '10px 0', // Adjusted for consistent spacing
        paddingLeft: '10px',
        paddingRight: '20px',
        appearance: 'border',
        color: '#475569',
      },
      labelName: false,
      // rules: [{ required: true, message: 'Please select City' }],
      defaultValue: orgData?.address?.city,
      onSelectApiCall: () => {
        console.log('handle city change');
      },
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      emptyErrorMessage: 'Please Select the City',
      invalidErrorMessage: 'Please Select the Valid City',
    },
    {
      name: 'postCode',
      label: 'Zipcode',
      type: 'text',
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        margin: '10px 0', // Adjusted for consistent spacing
      },
      labelName: false,
      // rules: [{ required: true, message: 'Please enter Zipcode' }],
      defaultValue: orgData?.address?.postCode,
      pattern: /^[1-9][0-9]{5}$/,
      emptyErrorMessage: 'Please Enter your zipcode',
      invalidErrorMessage: 'Please Enter the Valid zipcode',
    },
  ];
  const cancelHandler = (values) => {
    console.log('Form values:', values);
    const updatedOrgData = {
      ...orgData,
      address: values,
      name: values.orgName,
    };

    selectOrgData(updatedOrgData);
    setSelectedTab('organizationadmin');
    // setSelectedTab('organizationadmin');
    // Redirect to /dashboardadmin/organizationlist
    // navigate('/dashboardadmin/organizationlist');
  };



  const submitButtonProperty = {
    display: 'flex',
    width: '130px',
    height: '50px',
    padding: '10px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexShrink: '0',
    borderRadius: '30px',
    backgroundColor: 'var(--Brand-500, #6366F1)',
    color: '#FFFFFF',
    fontFamily: 'Into Lato',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '24px',
    name: 'Save',
  };

  const cancelButtonProperty = {
    display: 'flex',
    width: '130px',
    height: '50px',
    padding: '10px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexShrink: '0',
    borderRadius: '30px',
    border: '1px solid var(--Neutral-600, #475569)',
    color: '#334155 !important',
    fontFamily: ' Into Lato',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '24px',
    name: 'Cancel',
  };

  const feedingVariable = {
    isCancel: false,

    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
    formType: 'normal',
    forgorPasswordHandler: () => {
      console.log('forgot Password....');
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  };

  const dropdownHeaderStyle = {
    // Define your header style here or retrieve it dynamically
    // For example:
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  };
  let orgInfo = {
    orgData: orgData,
    screen: selectedTab,
  };


  return (
    <div style={{}}>
      <GeneralForm
        {...feedingVariable}
        isSuperAdmin={true}
        orgInfo={orgInfo}
        isActiveSave={true}
        buttonLoading={buttonLoading}
      />
    </div>
  );
}

export default OrganizationInfo;
