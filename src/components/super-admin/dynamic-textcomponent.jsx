import React, { useState, useEffect } from 'react';
import { ReactComponent as DeleteIcon } from '../../asset/AmChatSuperAdmin/trash-solid.svg';
import { Button } from 'antd';
import axios from 'axios';
import { BASE_ORG_API_URL } from '../../constants/Constant';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import CircularProgress from '@mui/material/CircularProgress';

function DynamicTextComponent({
  textFields,
  setTextFields,
  submitHandler,
  handleRemoveDomain,
  buttonLoading,
  setBackDropLoading,
  showNotifyMessage,
  messageHandler,
  orgStatus,
}) {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  console.log('token', jwt);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [usedDomainIndexCollection, setUsedDomainIndexCollection] = useState(
    []
  );
  const [isNewDomain, setIsNewDomain] = useState(false);

  const handleAddText = () => {
    if (orgStatus == 'edit') {
      setIsNewDomain(true);
    }

    setTextFields([
      ...textFields,
      {
        typeDetails: '',
        typeId: '20',
        status: 'ACTIVE',
      },
    ]);
  };

  const handleDeleteText = (index) => {
    const updatedTextFields = [...textFields];
    updatedTextFields.splice(index, 1);
    setTextFields(updatedTextFields);
  };

  const handleTextChange = (index, newText) => {
    if (orgStatus == 'edit') {
      setIsNewDomain(true);
    }

    if (usedDomainIndexCollection.includes(index)) {
      setUsedDomainIndexCollection((prevArray) =>
        prevArray.filter((item) => item != index)
      );
    }
    const updatedTextFields = [...textFields];
    updatedTextFields[index].typeDetails = newText;
    setTextFields(updatedTextFields);
  };

  const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const domainRegexone = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain) || domainRegexone.test(domain);
  };

  const isSubmitDisabled = () => {
    return textFields.some((field) => !isValidDomain(field.typeDetails));
  };

  const handleCheckDomain = async (index, data) => {
    if (isValidDomain(data) && orgStatus == 'edit') {
      setLoadingIndex(index);

      try {
        const response = await axios.get(
          `${BASE_ORG_API_URL}/verify_domain/${data}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log('api-response', response);
        // showNotifyMessage('success', response?.data?.message, messageHandler);
        if (usedDomainIndexCollection.includes(index)) {
          setUsedDomainIndexCollection((prevArray) =>
            prevArray.filter((item) => item != index)
          );
        }
        setLoadingIndex(null);
        if (orgStatus == 'edit') {
          setIsNewDomain(false);
        }
      } catch (error) {
        console.log('api-error', error);
        showNotifyMessage(
          'error',
          error?.response?.data?.message,
          messageHandler
        );

        if (!usedDomainIndexCollection.includes(index)) {
          setUsedDomainIndexCollection((prevArray) => [...prevArray, index]);
        }
        setLoadingIndex(null);
        if (orgStatus == 'edit') {
          setIsNewDomain(false);
        }
      }
    }
  };

  function decreaseIfGreater(array, givenElement) {
    return array.map((element) => {
      if (element > givenElement) {
        return element - 1;
      } else {
        return element;
      }
    });
  }

  function onFocusFunction(index) {
    // Check if the function hasn't been executed yet

    if (usedDomainIndexCollection.includes(index)) {
      setUsedDomainIndexCollection((prevArray) =>
        prevArray.filter((item) => item != index)
      );
    }
  }

  const handleDeleteDomain = (index) => {
    if (orgStatus == 'edit' && usedDomainIndexCollection.length > 0) {
      if (usedDomainIndexCollection.includes(index)) {
        setUsedDomainIndexCollection((prevArray) =>
          decreaseIfGreater(
            prevArray.filter((item) => item != index),
            index
          )
        );
      }
    }

    handleRemoveDomain(index);
  };

  return (
    <div style={{ padding: '10px', marginTop: '2em' }}>
      {/* Render text fields */}
      {textFields.map(({ typeDetails }, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2em',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              value={typeDetails}
              onChange={(event) => handleTextChange(index, event.target.value)}
              onBlur={(event) => handleCheckDomain(index, event.target.value)}
              // onfocus={onfocus()}
              // onfocus={onFocusFunction(index)}
              style={{
                width: '445px',
                height: '35px',
                borderRadius: '40px',
                border: '1px solid var(--Brand-700, #4338CA)',
                backgroundColor: 'transparent',
                marginBottom: '2em',
                padding: '0.375rem 0.75rem',
              }}
            />
            {typeDetails && !isValidDomain(typeDetails) && (
              <span style={{ color: 'red' }}>Invalid domain name format</span>
            )}
          </div>

          <DeleteIcon
            style={{
              height: '20px',
              width: '20px',
              cursor: 'pointer',
              fill: '#4338ca',
            }}
            onClick={() => handleDeleteDomain(index)}
          />

          {!!loadingIndex && loadingIndex == index ? <CircularProgress /> : ''}
          {usedDomainIndexCollection.includes(index) && (
            <span
              style={{ color: 'red' }}
            >{`${typeDetails} domain are already exist, change new domain`}</span>
          )}
        </div>
      ))}
      {/* Button to add text field */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '2em',
          marginTop: '1em',
        }}
      >
        {console.log('----used domain index', usedDomainIndexCollection)}
        {!(
          isSubmitDisabled() ||
          usedDomainIndexCollection.length > 0 ||
          isNewDomain
        ) ? (
          <Button
            onClick={handleAddText}
            style={{
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
            }}
            disabled={
              isSubmitDisabled() ||
              usedDomainIndexCollection.length > 0 ||
              isNewDomain
            }
            // loading={buttonLoading}
          >
            Add Domain
          </Button>
        ) : (
          ''
        )}
        {!(
          isSubmitDisabled() ||
          usedDomainIndexCollection.length > 0 ||
          isNewDomain
        ) ? (
          <Button
            onClick={() => submitHandler(textFields)}
            style={{
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
            }}
            disabled={
              isSubmitDisabled() ||
              usedDomainIndexCollection.length > 0 ||
              isNewDomain
            }
            loading={buttonLoading}
          >
            Save
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default DynamicTextComponent;
