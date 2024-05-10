import React, { useState, useEffect } from "react";
import {
  Box,
  Tab,
  Grid,
  useMediaQuery,
  Typography,
} from "@mui/material";
import "./Index.css";

import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import OrganizationDomains from "../../../AMChatAdmin/EditOrganizationAdmin/AddOrganizationTabNavigation/OrganizationDomains";

import SubscriptionPlan from "../../../AMChatAdmin/AddOrganizationAdmin/AddOrganizationTabNavigation/SubscriptionPlan";
import GeneralButton from "../../../../components/common/buttons/GeneralButton";
import axios from "axios";
import {
  selectUser,
  selectOrganisation,
  setOrganisationData,
  setErrorMsg,
} from "../../../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import * as constants from "../../../../constants/Constant";
import { useMessageState } from "../../../../hooks/useapp-message";
import { tokenDecodeJWT } from "../../../../utils/authUtils";
import PageLoader from "../../../../components/loader/loader";
import OrganizationInfoForm from "../../../../components/super-admin/organisation-info";
import UserInfoForm from "../../../../components/super-admin/userInfo";
import {
  validatePersonalInfoForm,
  validateUserInfoForm,
  validationOrgData,
} from "../../../../components/super-admin/validation";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { State } from "country-state-city";
import OrganisationLayout from "./organisationLayout";

function Organisation() {
  const isAndroid = /Android/.test(navigator.userAgent);
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const user = useSelector(selectUser);
  const organisation = useSelector(selectOrganisation);
  console.log(organisation, "org info");
  const dispatch = useDispatch();
  const pageTitle =
    organisation?.organisationStatus === "edit"
      ? `Update Organisation: ${organisation?.organisationData?.name}`
      : organisation?.organisationStatus === "view"
      ? organisation?.organisationData?.name
      : "Add Organisation";
  const action =
    organisation?.organisationStatus === "edit" ||
    organisation?.organisationStatus === "view"
      ? organisation?.organisationStatus
      : "Add Organisation";
  console.log("organisation", organisation);
  const jwt = user.userToken;
  const navigate = useNavigate();
  const decodedToken = tokenDecodeJWT(jwt);
  console.log("decoded token", decodedToken);
  const [selectedTab, setSelectedTab] = useState("personalinformation");
  const [orgData, selectOrgData] = useState(
    organisation?.organisationStatus == "edit" ||
      organisation?.organisationStatus == "view"
      ? {
          orgId: organisation?.organisationData?.id,
          address: {
            name: organisation?.organisationData?.name,
            address1: organisation?.organisationData?.address?.address1,
            address2: organisation?.organisationData?.address?.address2,
            country:
              organisation?.organisationData?.address?.country?.countryName,
            state: organisation?.organisationData?.address?.state?.stateName,
            city: organisation?.organisationData?.address?.city,
            postCode: organisation?.organisationData?.address?.postCode,
            landmark: "",
            countryCode:
              organisation?.organisationData?.address?.country?.countryCode,
            stateCode:
              organisation?.organisationData?.address?.state?.stateCode,
          },
          name: organisation?.organisationData?.name,
          contact: {
            firstName: organisation?.organisationData?.contact?.firstName
              ? organisation?.organisationData?.contact?.firstName
              : "",
            lastName: organisation?.organisationData?.contact?.lastName
              ? organisation?.organisationData?.contact?.lastName
              : "",
            email: organisation?.organisationData?.contact?.email
              ? organisation?.organisationData?.contact?.email
              : "",
          },
          metaData: organisation?.organisationData?.metadata,
        }
      : {
          address: {
            address1: "",
            address2: "",
            country: "India",
            state: "",
            city: "",
            postCode: "",
          },
          name: "",
          contact: {
            firstName: "",
            lastName: "",
            email: "",
          },
          metaData: [
            {
              typeDetails: "",
              typeId: "20",
              status: "ACTIVE",
            },
          ],
        }
  );
  const prevData = {
    orgId: organisation?.organisationData?.id,
    address: {
      name: organisation?.organisationData?.name,
      address1: organisation?.organisationData?.address?.address1,
      address2: organisation?.organisationData?.address?.address2,
      country: organisation?.organisationData?.address?.country?.countryName,
      state: organisation?.organisationData?.address?.state?.stateName,
      city: organisation?.organisationData?.address?.city,
      postCode: organisation?.organisationData?.address?.postCode,
      landmark: "",
      countryCode:
        organisation?.organisationData?.address?.country?.countryCode,
      stateCode: organisation?.organisationData?.address?.state?.stateCode,
    },
    name: organisation?.organisationData?.name,
    contact: {
      firstName: organisation?.organisationData?.contact?.firstName
        ? organisation?.organisationData?.contact?.firstName
        : "",
      lastName: organisation?.organisationData?.contact?.lastName
        ? organisation?.organisationData?.contact?.lastName
        : "",
      email: organisation?.organisationData?.contact?.email
        ? organisation?.organisationData?.contact?.email
        : "",
    },
    metaData: organisation?.organisationData?.metadata,
  };

  const [isDirty, setIsDirty] = useState(true);
  const [countries, setCountries] = useState([]);
  const getAllStates = State.getAllStates();
  const [states, setStates] = useState([]);
  const [localState, setLocalState] = useState(
    organisation?.organisationStatus == "edit"
      ? {
          country:
            organisation?.organisationData?.address?.country?.countryName,
          state: organisation?.organisationData?.address?.state?.stateName,
          city: organisation?.organisationData?.address?.city,
          countryCode:
            organisation?.organisationData?.address?.country?.countryCode,
          stateCode: organisation?.organisationData?.address?.state?.stateCode,
        }
      : {
          country: "India",
          state: "",
          city: "",
          // countryCode:'IN'
        }
  );
  const [cities, setCities] = useState([]);
  // const [firstNamelocal, setFirstName] = useState("");
  const [backDropLoading, setBackDropLoading] = useState(false);
  // const [fullName, setFullName] = useState("");
  const [orgInfoErrors, setOrgInfoErrors] = useState({});
  const [userInfoErrors, setUserInfoErrors] = useState({});

  const [value, setValue] = useState("1");
  const orgStatus = organisation?.organisationStatus || null;
  const isMobile = useMediaQuery("(max-width:600px)");
  const readOnlyMode = organisation?.organisationStatus === "view";
  const tabs = [
    "personalinformation",
    "organizationdomains",
    "organizationadmin",
  ];
  const [isDisable, setIsDisable] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initializeStates = () => {
    const filterStates = getAllStates.filter((state) => {
      return state.countryCode === "IN";
    });
    const stateArray = filterStates.map((state) => ({
      label: state.name,
      value: state.name,
      code: state.isoCode,
      countryCode: "IN",
    }));

    setStates(stateArray);
  };

  useEffect(() => {
    // const storedFirstName = localStorage.getItem("firstName");
    // setFirstName(storedFirstName);
    // const storedfullName = localStorage.getItem("fullName");
    // setFullName(storedfullName);

    initializeStates();
  }, [organisation]);

  useEffect(() => {
    const dirty = compareObjects(prevData, orgData);
    console.log("dirty---->", dirty);
    setIsDirty(dirty);
  }, [orgData]);

  const checkPermission = () => {
    if (readOnlyMode) {
      return true;
    }
    if (orgStatus === "edit") {
      if (
        orgData?.contact?.email !== "" &&
        orgData?.contact?.email !== undefined
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  useEffect(() => {
    const isPermssion = checkPermission();
    setIsDisable(isPermssion);
  }, []);

  const messageHandler = () => {
    hideNotifyMessage();
  };

  const handleVerification = () => {
    const isValidJwtToken = true;
    if (isValidJwtToken) {
      // navigate("/dashboardadmin")
      console.log("valid jwt token");
      // verify jwt token
      navigate("/dashboardadmin");
    } else {
      localStorage.clear();
      navigate("/signin");
    }
  };

  const addOrganisation = async () => {
    let body = orgData;
    if (!validationOrgData(orgData)) {
      showNotifyMessage("error", "Please add the valid data", messageHandler);
    }
    if (body.hasOwnProperty("plan")) {
      delete body["plan"];
    }
    if (validationOrgData(orgData)) {
      setBackDropLoading(true);
      try {
        const response = await axios.post(
          `${constants.BASE_ORG_API_URL}`,
          JSON.stringify(body),
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        setBackDropLoading(false);
        // setIsReset(true);
        showNotifyMessage("success", response?.data?.message, messageHandler);
        console.log("API Response:", response.data);
        navigate("/organisations");
      } catch (error) {
        console.error("Error occurred:", error);
        if (
          error?.response?.status == 500 ||
          error?.response?.status == "500"
        ) {
          const errorMsgprops = {
            message: {
              title: "Something went wrong",
              content: "Please contact our customer support team",
            },
            handleVerification: handleVerification,
            onOkButtonText: "Retry",
          };
          dispatch(setErrorMsg({ ...errorMsgprops }));
        }
        setBackDropLoading(false);
        console.log(error);
        showNotifyMessage(
          "error",
          error?.response?.data?.message,
          messageHandler
        );
      }
    }
  };

  const compareObjects = (obj1, obj2) => {
    if (obj1 && obj2 && Object.keys(obj1).length === Object.keys(obj2).length) {
      console.log("obj1---->", obj1);
      console.log("obj2----->", obj2);
      for (let key in obj1) {
        if (typeof obj1[key] === "object" && obj1[key] !== null) {
          if (!compareObjects(obj1[key], obj2[key])) {
            return false;
          }
        } else {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  };

  const editOrganisation = async (editedData) => {
    let body = editedData;
    console.log("body---->", body);
    const isValidDetails = validateUpdateDetails();

    if (body.hasOwnProperty("plan")) {
      delete body["plan"];
    }
    if (isValidDetails) {
      if (compareObjects(prevData, orgData)) {
        showNotifyMessage("success", "Already Updated!", messageHandler);
      } else {
        setButtonLoading(true);
        try {
          const response = await axios.put(
            `${constants.BASE_ORG_API_URL}`,
            JSON.stringify(body),
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
            }
          );
          setButtonLoading(false);
          setIsDirty(true);
          showNotifyMessage("success", response?.data?.message, messageHandler);
          console.log("API Response:", response.data);
          dispatch(setOrganisationData(response.data?.data));
        } catch (error) {
          console.error("Error occurred:", error);
          if (
            error?.response?.status == 500 ||
            error?.response?.status == "500"
          ) {
            const errorMsgprops = {
              message: {
                title: "Something went wrong",
                content: "Please contact our customer support team",
              },
              handleVerification: handleVerification,
              onOkButtonText: "Retry",
            };
            dispatch(setErrorMsg({ ...errorMsgprops }));
          }
          setButtonLoading(false);
          console.log(error);
          showNotifyMessage(
            "error",
            error?.response?.data?.message,
            messageHandler
          );
        }
      }
    }
  };

  const handleTabChange = (event, newValue, currentValue) => {
    // const normalizedTab = newValue;
    if (readOnlyMode) {
      setSelectedTab(newValue);
    } else {
      personalInformationHandler(newValue);
    }
  };

  const handleCancel = () => {
    // Add logic for handling form cancellation
    console.log("Cancelling form");
  };

  const extractDomain = (email) => {
    if (email) {
      const parts = email.split("@");
      return parts[1];
    } else {
      return "";
    }
  };

  const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const domainRegexone = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain) || domainRegexone.test(domain);
  };

  const personalInformationHandler = (tab) => {
    console.log("orgData", orgData, "tabData", selectedTab, "tab", tab);

    if (selectedTab == "personalinformation") {
      const errors = validatePersonalInfoForm(orgData);
      if (Object.keys(errors).length === 0) {
        setOrgInfoErrors({});
        // handleTabChange(tab);
        setSelectedTab(tab);
        return;
      } else {
        setOrgInfoErrors(errors);
        if (organisation?.organisationStatus == "edit") {
          setSelectedTab(tab);
        }
        return;
      }
    }
    if (selectedTab == "organizationadmin") {
      const domain = extractDomain(orgData?.contact?.email);
      const isEmailPresent = (orgData?.metaData).some(
        (obj) => obj.typeDetails === domain
      );
      const usererrors = validateUserInfoForm(orgData);
      if (Object.keys(usererrors).length === 0 && isEmailPresent === true) {
        setUserInfoErrors({});
        setSelectedTab(tab);
      } else if (
        Object.keys(usererrors).length === 0 &&
        isEmailPresent === false
      ) {
        showNotifyMessage(
          "error",
          `Email Id domain should match with the existing domain ID's `,
          messageHandler
        );
        if (organisation?.organisationStatus == "edit") {
          setSelectedTab(tab);
        }
        return;
      } else {
        setUserInfoErrors(usererrors);
        if (organisation?.organisationStatus == "edit") {
          setSelectedTab(tab);
        }
        return;
      }
      return;
    }
    if (selectedTab == "organizationdomains") {
      if (!domainValidation(orgData?.metaData)) {
        showNotifyMessage(
          "warn",
          "At least one domain name should be there",
          messageHandler
        );
        if (organisation?.organisationStatus == "edit") {
          setSelectedTab(tab);
        }
        return;
      }

      const checkForEveryDomain = () => {
        return orgData?.metaData.every((field) =>
          isValidDomain(field.typeDetails)
        );
      };

      if (!checkForEveryDomain()) {
        showNotifyMessage("warn", "Please enter valid domain", messageHandler);
        if (organisation?.organisationStatus == "edit") {
          setSelectedTab(tab);
        }
        return;
      }

      if (hasRepeatingValues(orgData?.metaData, "typeDetails")) {
        showNotifyMessage(
          "warn",
          "Duplicate domains are not allowed",
          messageHandler
        );
        if (organisation?.organisationStatus == "edit") {
          setSelectedTab(tab);
        }
        return;
      }

      if (orgData?.metaData?.length >= 1) {
        setSelectedTab(tab);
      }
    }
    if (selectedTab == "subscriptionplan") {
      setSelectedTab(tab);
    }
  };

  const validateUpdateDetails = () => {
    // if (checkTab == 'personalinformation') {
    const errors = validatePersonalInfoForm(orgData);
    console.log("errors--->", errors);
    if (Object.keys(errors).length === 0) {
      setOrgInfoErrors({});
    } else {
      setOrgInfoErrors(errors);
      setSelectedTab("personalinformation");
      showNotifyMessage("error", "Please add the valid data", messageHandler);
      return false;
    }
    // }
    // if (checkTab == 'organizationadmin') {
    const domain = extractDomain(orgData?.contact?.email);
    const isEmailPresent = (orgData?.metaData).some(
      (obj) => obj.typeDetails === domain
    );
    const usererrors = validateUserInfoForm(orgData);
    if (Object.keys(usererrors).length === 0 && isEmailPresent === true) {
      setUserInfoErrors({});
    } else if (
      Object.keys(usererrors).length === 0 &&
      isEmailPresent === false
    ) {
      setSelectedTab("organizationadmin");
      showNotifyMessage(
        "error",
        `Email Id domain should match with the existing domain ID's `,
        messageHandler
      );
      return false;
    } else {
      setSelectedTab("organizationadmin");
      setUserInfoErrors(usererrors);
      showNotifyMessage("error", "Please add the valid data", messageHandler);
      return false;
    }
    // }
    // if (checkTab == 'organizationdomains') {

    if (!domainValidation(orgData?.metaData)) {
      setSelectedTab("organizationdomains");
      showNotifyMessage(
        "warn",
        "At least one domain name should be there",
        messageHandler
      );
      return false;
    }

    const checkForEveryDomain = () => {
      return orgData?.metaData.every((field) =>
        isValidDomain(field.typeDetails)
      );
    };

    if (!checkForEveryDomain()) {
      setSelectedTab("organizationdomains");
      showNotifyMessage("warn", "Please enter valid domain", messageHandler);
      return false;
    }

    if (hasRepeatingValues(orgData?.metaData, "typeDetails")) {
      setSelectedTab("organizationdomains");
      showNotifyMessage(
        "warn",
        "Duplicate domains are not allowed",
        messageHandler
      );
      return false;
    }

    // }
    return true;
  };

  // const domainNameValidation = (domainArray) => {
  //   if (orgData?.contact?.email.length > 0) {
  //     let isDomainValid = domainArray.find(
  //       (obj) => obj["typeDetails"] == extractDomain(orgData?.contact?.email)
  //     );
  //     console.log("isDomainValid", !!isDomainValid);
  //     return !!isDomainValid;
  //   }
  // };

  const domainValidation = (domainArray) => {
    console.log("domain array---->", domainArray);
    const isValid =
      domainArray?.length > 0 && domainArray[0].typeDetails !== "";
    return isValid;
  };

  function hasRepeatingValues(arr, prop) {
    const uniqueValues = new Set();

    for (const obj of arr) {
      uniqueValues.add(obj[prop]);
    }

    return uniqueValues.size !== arr.length;
  }

  console.log("org layout is rendered");
  return (
    <OrganisationLayout componentName={pageTitle} action={action}>
      {backDropLoading && <PageLoader loadingStatus={backDropLoading} />}
      <Box sx={{ marginTop: isMobile ? "5px" : "0px" }}>
        <TabContext value={selectedTab}>
          <Box
            sx={{
              marginBottom: "1rem",
            }}
          >
            <TabList
              onChange={handleTabChange}
              aria-label="organisation tabs"
              variant="scrollable"
              scrollButtons={false}
              allowScrollButtonsMobile
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                "& .MuiTab-root": {
                  minWidth: "auto",
                },
              }}
            >
              <Tab
                label={
                  <Typography fontWeight="bold">Organisation Info</Typography>
                }
                value="personalinformation"
              />
              <Tab
                label={
                  <Typography fontWeight="bold">
                    Organisation Domains
                  </Typography>
                }
                value="organizationdomains"
              />
              <Tab
                label={
                  <Typography fontWeight="bold">Organisation Admin</Typography>
                }
                value="organizationadmin"
              />
              <Tab
                label={
                  <Typography fontWeight="bold">Subscription Plan</Typography>
                }
                value="subscriptionplan"
              />
            </TabList>
          </Box>
          <Box
            sx={
              {
                // borderWidth: '1px',
                // boxShadow: '0px 2.789px 6.972px 3.486px rgba(0, 0, 0, 0.09)',
                // borderRadius: 3,
              }
            }
          >
            <TabPanel value="personalinformation">
              <OrganizationInfoForm
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                buttonLoading={buttonLoading}
                setButtonLoading={setButtonLoading}
                countries={countries}
                states={states}
                localState={localState}
                setLocalState={setLocalState}
                cities={cities}
                setCities={setCities}
                setCountries={setCountries}
                setStates={setStates}
                organisation={organisation}
                editOrganisation={editOrganisation}
                setBackDropLoading={setBackDropLoading}
                errors={orgInfoErrors}
                setErrors={setOrgInfoErrors}
                personalInformationHandler={personalInformationHandler}
                readOnlyMode={readOnlyMode}
              />
            </TabPanel>
            <TabPanel value="organizationadmin">
              <UserInfoForm
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                organisation={organisation}
                editOrganisation={editOrganisation}
                buttonLoading={buttonLoading}
                showNotifyMessage={showNotifyMessage}
                messageHandler={messageHandler}
                jwt={jwt}
                formData={orgData.contact}
                setFormData={selectOrgData}
                errors={userInfoErrors}
                setErrors={setUserInfoErrors}
                personalInformationHandler={personalInformationHandler}
                orgStatus={orgStatus}
                readOnlyMode={readOnlyMode}
                isDisable={isDisable}
              />
            </TabPanel>
            <TabPanel value="organizationdomains">
              <OrganizationDomains
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                organisation={organisation}
                editOrganisation={editOrganisation}
                buttonLoading={buttonLoading}
                showNotifyMessage={showNotifyMessage}
                messageHandler={messageHandler}
                jwt={jwt}
                setButtonLoading={setButtonLoading}
                setBackDropLoading={setBackDropLoading}
                personalInformationHandler={personalInformationHandler}
                readOnlyMode={readOnlyMode}
              />
            </TabPanel>
            <TabPanel value="subscriptionplan">
              <SubscriptionPlan
                orgData={orgData}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                selectOrgData={selectOrgData}
                addOrganisation={addOrganisation}
                buttonLoading={buttonLoading}
                organisation={organisation}
                editOrganisation={editOrganisation}
                personalInformationHandler={personalInformationHandler}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={isMobile ? "center" : "flex-end"}
        alignItems={isMobile ? "center" : "flex-end"}
        marginTop={"0.3rem"}
        sx={{
          marginBottom: {
            xs: isAndroid ? "3em" : "7em",
          },
        }}
      >
        <Grid item>
          <Link to="/organisations" style={{ textDecoration: "none" }}>
            <div>
              <GeneralButton
                name="Cancel"
                buttonProps={{}}
                type="default"
                color="#334155"
                backgroundColor="transparent"
                width="130px"
                height="50px"
                borderRadius="30px"
                buttonHandler={handleCancel}
              />
            </div>
          </Link>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              if (organisation?.organisationStatus == "edit") {
                editOrganisation(orgData);
                return;
              }
              addOrganisation();
            }}
            style={{
              display: "flex",
              width: "130px",
              height: "50px",
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              flexShrink: "0",
              borderRadius: "30px",
              backgroundColor: constants.BUTTON_COLOUR,
              color: "#FFFFFF",
              fontFamily: "Into Lato",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "24px",
              opacity: isDirty ? "0.5" : "1",
            }}
            loading={buttonLoading}
            disabled={isDirty}
          >
            {buttonLoading ? (
              ""
            ) : (
              <Typography variant="body1">{"Submit"}</Typography>
            )}
          </Button>
        </Grid>
      </Grid>
    </OrganisationLayout>
  );
}

export default Organisation;
