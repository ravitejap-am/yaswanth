import React from 'react';
import GeneralForm from '../../../../components/common/forms/GeneralForm';
import { useNavigate } from 'react-router-dom';
function OrganizationAdmin({
  orgData,
  setSelectedTab,
  selectedTab,
  selectOrgData,
  organisation,
  editOrganisation,
}) {
  const navigate = useNavigate();

  // Define form elements for first name, last name, and email
  const formElements = [
    {
      name: 'firstName',
      label: 'First Name',
      pattern: /^([a-zA-Z]{3,30}\s*)+/,
      type: 'text',
      placeholder: 'Enter your first name',
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      // rules: [{ required: true, message: 'Please enter your first name' }],
      labelName: false,
      defaultValue: orgData?.contact?.firstName,
      emptyErrorMessage: 'Please Enter the First Name',
      invalidErrorMessage: 'Please Enter the Valid First Name',
    },
    {
      pattern: /^([a-zA-Z]{2,30}\s*)+/,
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },
      // rules: [{ required: true, message: 'Please enter your last name' }],
      labelName: false,
      defaultValue: orgData?.contact?.lastName,
      emptyErrorMessage: 'Please Enter the Last Name',
      invalidErrorMessage: 'Please Enter the Valid Last Name',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',

      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
      },

      labelName: false,
      defaultValue: orgData?.contact?.email,
      emptyErrorMessage: 'Please Enter the Email',
      invalidErrorMessage: 'Please Enter the Valid Email',
    },
  ];

  const submitHandler = (values) => {
    console.log(' submitForm values:', values);

    if (values != undefined) {
      const updatedOrgData = {
        ...orgData,
        contact: values,
      };

      selectOrgData(updatedOrgData);
      if (organisation?.organisationStatus == 'edit') {
        editOrganisation();
      }
      setSelectedTab('organizationdomains');
    }
  };

  const cancelHandler = (values) => {
    console.log('Form values:', values);
    console.log('Form values:', values);

    const updatedOrgData = {
      ...orgData,
      contact: values,
    };

    selectOrgData(updatedOrgData);
    setSelectedTab('organizationdomains');
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
    isSubmit: true,
    isCancel: false,
    submitHandler: submitHandler,
    cancelHandler: cancelHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
    formType: 'normal',
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  };
  let orgInfo = {
    orgData: orgData,
    screen: selectedTab,
  };
  return (
    <div>
      <GeneralForm {...feedingVariable} isSuperAdmin={true} orgInfo={orgInfo} />
    </div>
  );
}

export default OrganizationAdmin;
