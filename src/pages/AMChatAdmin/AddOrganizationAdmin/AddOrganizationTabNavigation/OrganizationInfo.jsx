import React from 'react';
import GeneralForm from '../../../../components/common/forms/GeneralForm';
import { useNavigate } from 'react-router-dom';
function OrganizationInfo({
  orgData,
  setSelectedTab,
  selectedTab,
  selectOrgData,
}) {
  const navigate = useNavigate();
  const submitHandler = (values) => {
    console.log('Form values:', values);
    console.log(values);
    // setSelectedTab('organizationadmin');
    const updatedOrgData = {
      ...orgData,
      address: values,
      name: values.name,
    };

    selectOrgData(updatedOrgData);
    setSelectedTab('organizationadmin');
  };
  const formElements = [
    {
      name: 'name',
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
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'Country 1', value: 'country1' },
        { label: 'Country 2', value: 'country2' },
      ],
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
    },
    {
      name: 'state',
      label: 'State',
      type: 'select',
      options: [
        { label: 'State 1', value: 'state1' },
        { label: 'State 2', value: 'state2' },
      ],
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
    },
    {
      name: 'city',
      label: 'City',
      type: 'select',
      options: [
        { label: 'Select a City', value: '' },
        { label: 'City 1', value: 'city1' },
        { label: 'City 2', value: 'city2' },
      ],
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
    },
  ];
  const cancelHandler = (values) => {
    console.log('Form values:', values);
    const updatedOrgData = {
      ...orgData,
      address: values,
      name: values.name,
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
      />
    </div>
  );
}

export default OrganizationInfo;
