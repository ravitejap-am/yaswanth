// OrganizationDomains.js

import React, { useState, useEffect } from 'react';
import Style from './OrganizationDomain.module.css';
import { extractDomain } from '../../../../utils/generalUtils';
import axios from 'axios';
import { BASE_API_URL, BASE_ORG_API_URL } from '../../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import DynamicTextComponent from '../../../../components/super-admin/dynamic-textcomponent';
import { Button } from 'antd';
let domainNameRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

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
  jwt = '',
  setButtonLoading,
  setBackDropLoading,
  personalInformationHandler,
}) {
  const navigate = useNavigate();
  const [newDomains, setNewDomains] = useState(
    orgData?.metaData?.length > 0
      ? orgData?.metaData.filter((obj) => obj['status'] !== 'INACTIVE')
      : [
          {
            typeDetails: '',
            typeId: '20',
            status: 'ACTIVE',
          },
        ]
  );

  useEffect(() => {
    // Update dropdownDomains if needed
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

  const handleRemoveDomain = async (index) => {
    // alert(index);

    console.log('ne domains', newDomains[index]);

    if (newDomains.length > 1) {
      if (
        organisation?.organisationStatus == 'edit' &&
        newDomains[index].typeDetails.length > 0 &&
        newDomains[index].id != undefined
      ) {
        if (
          newDomains[index].typeDetails ==
          extractDomain(orgData?.contact?.email)
        ) {
          showNotifyMessage(
            'warn',
            'Core domanin not allow to delete',
            messageHandler
          );
          return;
        }

        try {
          setButtonLoading(true);
          let body = {
            id: newDomains[index].id,
            typeDetails: newDomains[index].typeDetails,
            status: 'ACTIVE',
          };
          const response = await axios.put(
            `${BASE_ORG_API_URL}/delete_domain`,
            JSON.stringify(body),
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
              },
            }
          );
          setButtonLoading(false);
          setNewDomains((prevDomains) => {
            const updatedDomains = [...prevDomains];
            updatedDomains.splice(index, 1);
            console.log('domainName', updatedDomains);
            return updatedDomains;
          });
          console.log('updatedDomain', newDomains);
          showNotifyMessage('success', response?.data?.message, messageHandler);
          console.log('API Response:', response.data);
        } catch (error) {
          console.error('Error occurred:', error);
          if (
            error?.response?.status == 500 ||
            error?.response?.status == '500'
          ) {
            navigate('/internal500');
          }
          setButtonLoading(false);
          console.log(error);
          showNotifyMessage(
            'error',
            error?.response?.data?.message,
            messageHandler
          );
        }
      } else {
        setNewDomains((prevDomains) => {
          const updatedDomains = [...prevDomains];
          updatedDomains.splice(index, 1);
          return updatedDomains;
        });
      }
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
          !!obj.typeDetails
            ? `${obj.typeDetails} is not in domain name format.`
            : 'Empty domain name not accepted',
          messageHandler
        );
      }
    });
    return isValidDomainName;
  };

  const submitHandler = (values) => {
    if (values != undefined) {
      // if (domainFormatValidation(values)) {
      if (domainNameValidation(values)) {
        const updatedOrgData = {
          ...orgData,
          metaData: values,
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
      // }
    }

    // setSelectedTab('organizationadmin');
  };

  return (
    <div>
      <div className={Style.container}>
        <DynamicTextComponent
          textFields={orgData?.metaData.filter(
            (obj) => obj['status'] !== 'INACTIVE'
          )}
          setTextFields={setNewDomains}
          submitHandler={submitHandler}
          handleRemoveDomain={handleRemoveDomain}
          buttonLoading={buttonLoading}
          setBackDropLoading={setBackDropLoading}
          showNotifyMessage={showNotifyMessage}
          messageHandler={messageHandler}
          orgStatus={organisation?.organisationStatus}
          selectOrgData={selectOrgData}
          orgData={orgData}
          setButtonLoading={setButtonLoading}
          setSelectedTab={setSelectedTab}
          personalInformationHandler={personalInformationHandler}
        />
      </div>
    </div>
  );
}

export default OrganizationDomains;
