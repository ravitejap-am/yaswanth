// OrganizationDomains.js

import React, { useState, useEffect } from 'react';
import GeneralForm from '../../../../components/common/forms/GeneralForm';
import { ReactComponent as PlusSign } from '../../../../asset/AmChatSuperAdmin/plus-solid.svg';
import { ReactComponent as DeleteIcon } from '../../../../asset/AmChatSuperAdmin/trash-solid.svg';
import Style from './OrganizationDomain.module.css';
import { extractDomain } from '../../../../utils/generalUtils';

let domainNameRegex = /^[a-zA-Z0-9-]+\.com$/;

function OrganizationDomains({
  orgData,
  setSelectedTab,
  selectedTab,
  selectOrgData,
  organisation,
  editOrganisation,
  buttonLoading,
  showNotifyMessage,
  messageHandler,
}) {
  const [newDomains, setNewDomains] = useState(
    orgData?.metaData?.length > 0
      ? orgData?.metaData
      : [
          {
            typeDetails: '',
            typeId: '20',
          },
        ]
  );

  useEffect(() => {
    // Update dropdownDomains if needed
    console.log('orgData domains', orgData);
  }, [newDomains]);

  const handlePlusClick = () => {
    setNewDomains((prevDomains) => [
      ...prevDomains,
      {
        typeDetails: '',
        typeId: '20',
      },
    ]);
  };

  const handleDomainChange = (index, value) => {
    console.log('getting all domaind', index, value);
    setNewDomains((prevDomains) => {
      const updatedDomains = [...prevDomains];
      updatedDomains[index] = value;
      return updatedDomains;
    });
  };

  const handleRemoveDomain = (index) => {
    if (newDomains.length > 1) {
      setNewDomains((prevDomains) => {
        const updatedDomains = [...prevDomains];
        updatedDomains.splice(index, 1);
        return updatedDomains;
      });
    } else {
      showNotifyMessage(
        'warn',
        'A minimum of one domain name is required',
        messageHandler
      );
      console.log('comming to delete');
    }
  };

  const domainNameValidation = (domainArray) => {
    if (orgData?.contact?.email.length > 0) {
      let isDomainValid = domainArray.find(
        (obj) => obj['typeDetails'] == extractDomain(orgData?.contact?.email)
      );
      console.log('isDomainValid', !!isDomainValid);
      return !!isDomainValid;
    }
  };

  const domainFormatValidation = (domainArray) => {
    console.log(domainArray);
    let isValidDomainName = true;
    domainArray.forEach((obj) => {
      console.log('regex response', domainNameRegex);
      if (domainNameRegex.test(obj.typeDetails)) {
        console.log(obj.typeDetails + 'Valid domain name');
      } else {
        console.log(obj.typeDetails + 'Invalid domain name');
        isValidDomainName = false;
        showNotifyMessage(
          'error',
          `${obj.typeDetails} is not in domain name format.`,
          messageHandler
        );
      }
    });
    return isValidDomainName;
  };

  const submitHandler = (values) => {
    console.log('Form values:', newDomains);
    console.log(values);

    let domainArray = [];
    if (values != undefined) {
      Object.keys(values).forEach((key, index) => {
        console.log(key + ': ' + values[key]);
        let domainObject = {};
        if (values[key] == '') {
          domainObject = newDomains[index];
        } else {
          domainObject['typeDetails'] = values[key];
          domainObject['typeId'] = '20';
        }

        domainArray.push(domainObject);
      });

      console.log('domainaarray', domainArray);

      if (domainFormatValidation(domainArray)) {
        if (domainNameValidation(domainArray)) {
          const updatedOrgData = {
            ...orgData,
            metaData: domainArray,
          };
          console.log('updateorgdata', updatedOrgData);
          selectOrgData(updatedOrgData);
          if (organisation?.organisationStatus == 'edit') {
            editOrganisation(updatedOrgData);
            return;
          }
          setSelectedTab('subscriptionplan');
        } else {
          showNotifyMessage(
            'warn',
            'At least one domain name should match the organisation domain',
            messageHandler
          );
          return;
        }
      }
    }

    // setSelectedTab('organizationadmin');
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
    cancelHandler: () => {},
    isSubmit: true,
    submitHandler: submitHandler,
    formElements: newDomains.map((domain, index) => ({
      defaultValue: domain.typeDetails,
      name: `domain-${index}`,
      label: domain.typeDetails,
      type: 'text',
      value: domain.typeDetails,
      onChange: (e) => handleDomainChange(index, e.target.value),
      style: {
        width: '445px',
        borderRadius: '40px',
        border: '1px solid var(--Brand-700, #4338CA)',
        backgroundColor: 'transparent',
        marginBottom: '10px',
      },
      labelName: false,
      // rules: [
      //   {
      //     required: true,
      //     message: 'Please enter domains',
      //   },
      // ],
      // pattern: /^([a-zA-Z]{3,30}\s*)+/,
      // emptyErrorMessage: 'Pleas add the domain',
      // invalidErrorMessage: 'Pleas add the valid domain',
      removeButton: (
        <button onClick={() => handleRemoveDomain(index)}>Remove</button>
      ),
    })),
    formType: 'normal',
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
  };

  return (
    <div>
      <div className={Style.container}>
        <GeneralForm
          className={Style.generalForm}
          {...feedingVariable}
          buttonLoading={buttonLoading}
        />
        <div className={Style.iconsContainer}>
          <PlusSign className={Style.plusSign} onClick={handlePlusClick} />
          <DeleteIcon
            className={Style.deleteIcon}
            onClick={() => handleRemoveDomain(newDomains.length - 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizationDomains;
