import React, { useState, useEffect } from 'react';
import { ReactComponent as DeleteIcon } from '../../asset/AmChatSuperAdmin/trash-solid.svg';
import { Button, Tooltip } from 'antd';
import axios from 'axios';
import { BASE_ORG_API_URL, AM_CHAT } from '../../constants/Constant';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { extractDomain } from '../../utils/generalUtils';
import { PlusCircleFilled } from '@ant-design/icons';
import { Grid, FormHelperText, Box , useMediaQuery} from '@mui/material';
import  './dynamicTextcomponent.css'
import { Popconfirm } from 'antd';

function DynamicTextComponent({
  textFields,
  setTextFields,
  buttonLoading,
  showNotifyMessage,
  messageHandler,
  orgStatus,
  selectOrgData,
  orgData,
  setButtonLoading,
  personalInformationHandler,
}) {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  console.log('token', jwt);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [usedDomainIndexCollection, setUsedDomainIndexCollection] = useState(
    []
  );
  const [isNewDomain, setIsNewDomain] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAddText = () => {
    if (orgStatus == 'edit') {
      setIsNewDomain(true);
    }

    let updatedOrg = {
      ...orgData,
      metaData: [
        ...textFields,
        {
          typeDetails: '',
          typeId: '20',
          status: 'ACTIVE',
        },
      ],
    };

    selectOrgData(updatedOrg);
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
    // setTextFields(updatedTextFields);
    let updatedOrg = {
      ...orgData,
      metaData: updatedTextFields,
    };

    selectOrgData(updatedOrg);
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
    if (textFields.length <= 1) {
      showNotifyMessage(
        'warn',
        'A minimum of one domain name is required',
        messageHandler
      );
      return;
    }
    if (orgStatus != 'edit') {
      handleRemoveIndDomain(index);
      return;
    }

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

    if (
      orgStatus == 'edit' &&
      textFields[index].typeDetails.trim().length > 0 &&
      textFields[index].id != undefined
    ) {
      if (
        textFields[index].typeDetails == extractDomain(orgData?.contact?.email)
      ) {
        showNotifyMessage(
          'warn',
          'Core domanin not allow to delete',
          messageHandler
        );
        return;
      }

      deleteApiCalling(index);
    }

    if (
      orgStatus == 'edit' &&
      (!!textFields[index].typeDetails.trim() ||
        textFields[index].id == undefined)
    ) {
      setIsNewDomain(false);
      handleRemoveIndDomain(index);
    }
  };

  const handleRemoveIndDomain = (index) => {
    let tempArray = [...textFields];

    selectOrgData({
      ...orgData,
      metaData: tempArray.filter((_, i) => i !== index),
    });
  };

  const deleteApiCalling = async (index) => {
    try {
      setButtonLoading(true);
      let body = {
        id: textFields[index].id,
        typeDetails: textFields[index].typeDetails,
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
      handleRemoveIndDomain(index);
      showNotifyMessage('success', response?.data?.message, messageHandler);
    } catch (error) {
      setButtonLoading(false);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        showNotifyMessage(
          'error',
          'Somthing went wrong,Tryagain',
          messageHandler
        );
        return;
      }
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
      return;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "60vh",
        flexDirection: "column",
        width: "100%",
        "&::-webkit-scrollbar": {
          width: "2px",
          height: "2px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "6px",
        },
      }}
    >
      <Box
        sx={{
          height: "90%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          overflowY: "scroll",
        }}
      >
        {textFields.map(({ typeDetails, id }, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "3em",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                value={typeDetails}
                onChange={(event) =>
                  handleTextChange(index, event.target.value)
                }
                onBlur={(event) => handleCheckDomain(index, event.target.value)}
                className="domain-text-input"
                disabled={id ? true : false}
                style={{ height: "3em", margin: "0px" }}
              />
              {typeDetails && !isValidDomain(typeDetails) && (
                <FormHelperText sx={{ fontSize: "14px" }} error>
                  Invalid domain name format
                </FormHelperText>
              )}
            </Box>
            <Popconfirm
              key={"amchat"}
              title={AM_CHAT}
              description={
                "Do you really want to delete this domain" + ` '${typeDetails}'`
              }
              onConfirm={() => {
                handleDeleteDomain(index);
              }}
              onCancel={() => {
                console.log(" row?.id ");
              }}
              okText="Submit"
              cancelText="Close"
            >
              <DeleteIcon
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill: "#4338ca",
                }}
              />
            </Popconfirm>
          </Box>
        ))}
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "15vw",
            // backgroundColor:'red'
          }}
        >
          {/* <div style={{flex: 1}}></div> */}
          <Tooltip placement="rightTop" title="Add Domain">
            <Button
              onClick={handleAddText}
              style={{
                display: "flex",
                width: "50px",
                height: "50px",
                padding: "10px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                flexShrink: "0",
                borderRadius: "30px",
                backgroundColor: "var(--Brand-500, #6366F1)",
                color: "#FFFFFF",
                fontFamily: "Into Lato",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "24px",
              }}
              disabled={
                isSubmitDisabled() ||
                usedDomainIndexCollection.length > 0 ||
                isNewDomain
              }
              icon={<PlusCircleFilled />}
            ></Button>
          </Tooltip>
        </Box>
      </Box>
      {/* <Box sx={{ flex: 1 }}></Box> */}
      <Box style={{ display: "flex" ,gap: "1em", flexDirection:'row', justifyContent: isMobile ? 'center' : 'flex-end', alignItems: isMobile ? 'center' : 'flex-end'}}>
        {/* <Box style={{ flex: 1 }}></Box> */}
        <Button
          style={{ marginTop: "1em", width: "8em" }}
          onClick={() => {
            personalInformationHandler("personalinformation");
          }}
          loading={buttonLoading}
        >
          Previous
        </Button>
        <Button
          type="primary"
          style={{ marginTop: "1em", width: "8em" }}
          onClick={() => {
            personalInformationHandler("organizationadmin");
          }}
          loading={buttonLoading}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default DynamicTextComponent;
