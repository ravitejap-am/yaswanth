import React, { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../asset/AmChatSuperAdmin/trash-solid.svg';
import { Button } from 'antd';

function DynamicTextComponent({
  textFields,
  setTextFields,
  submitHandler,
  handleRemoveDomain,
  buttonLoading,
}) {
  const handleAddText = () => {
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
    const updatedTextFields = [...textFields];
    updatedTextFields[index].typeDetails = newText;
    setTextFields(updatedTextFields);
  };

  const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const isSubmitDisabled = () => {
    return textFields.some((field) => !isValidDomain(field.typeDetails));
  };

  return (
    <div style={{ padding: '10px', marginTop: '2em' }}>
      {/* Render text fields */}
      {textFields.map(({ typeDetails }, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2em',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              value={typeDetails}
              onChange={(event) => handleTextChange(index, event.target.value)}
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
            onClick={() => handleRemoveDomain(index)}
          />
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
          loading={buttonLoading}
        >
          Add Domain
        </Button>
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
          disabled={isSubmitDisabled()}
          loading={buttonLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default DynamicTextComponent;
