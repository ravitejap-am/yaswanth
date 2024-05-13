import React, { useState, useEffect } from "react";
import Layout from "../../../../Layout";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import { selectUser, selectUserDetails } from "../../../../store/authSlice";
import * as constants from "../../../../constants/Constant";
import EditForm from "../../../../components/EditForms/EditForms";
import { useMessageState } from "../../../../hooks/useapp-message";
import { tokenDecodeJWT } from "../../../../utils/authUtils";
import UserStatistic from "./UserStatistic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";

const User = (Component) => {
  return function UserWrapper() {
    const navigate = useNavigate();
    const { userId } = useParams();
    console.log(userId, "userId");
    const user = useSelector(selectUser);
    // const organisation = useSelector(selectUserDetails);
    const jwt = user.userToken;
    const permittedScopes = tokenDecodeJWT(jwt).scopes;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
    });

    const {
      buttonLoading: messageButtonLoading,
      setButtonLoading: setMessageButtonLoading,
      isReset: messageIsReset,
      setIsReset: setMessageIsReset,
      showNotifyMessage,
      hideNotifyMessage,
    } = useMessageState();

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${constants.BASE_API_URL}/user/${userId}/details`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData({
          firstName: data?.data?.firstName,
          lastName: data?.data?.lastName || "",
          email: data?.data?.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    const messageHandler = () => {
      setIsReset(false);
      hideNotifyMessage();
    };

    const cancelHandler = () => {
      navigate("/users");
    };

    const submitHandler = async (values) => {
      setMessageButtonLoading(true);
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      if (values === undefined) {
      } else {
        try {
          const responseUser = await fetch(
            `${constants.BASE_ORG_API_URL}/user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify(values),
            }
          );
          const data = await responseUser.json();
          setMessageButtonLoading(false);
          if (responseUser?.ok) {
            setMessageIsReset(true);
            showNotifyMessage("success", data.message, messageHandler);
            navigate("/users");
          } else {
            showNotifyMessage("error", data.message, messageHandler);
            return;
          }
        } catch (error) {
          if (
            error?.response?.status == 500 ||
            error?.response?.status == "500"
          ) {
            navigate("/customerSupport");
          }
          setMessageButtonLoading(false);
          showNotifyMessage(
            "error",
            error?.response?.data?.message || "An error occurred",
            messageHandler
          );
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    return (
      <Component
        userData={userData}
        setUserData={setUserData}
        isSubmitting={isSubmitting}
        buttonLoading={buttonLoading || messageButtonLoading}
        isReset={isReset || messageIsReset}
        showNotifyMessage={showNotifyMessage}
        hideNotifyMessage={hideNotifyMessage}
        fetchUserData={fetchUserData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        permittedScopes={permittedScopes}
      />
    );
  };
};

const EditUserComponent = ({
  userData,
  setUserData,
  isSubmitting,
  buttonLoading,
  isReset,
  showNotifyMessage,
  hideNotifyMessage,
  fetchUserData,
  submitHandler,
  cancelHandler,
  permittedScopes,
}) => {
  return (
    <Layout componentName="Update user">
      <EditForm
        formData={userData}
        setFormsData={setUserData}
        submitHandler={submitHandler}
        isEdit={true}
        buttonLoading={buttonLoading}
        cancelHandler={cancelHandler}
        permittedScopes={permittedScopes}
        readOnlyMode={false}
      />
    </Layout>
  );
};

const AddUserComponent = ({
  buttonLoading,
  showNotifyMessage,
  hideNotifyMessage,
  submitHandler,
  cancelHandler,
  permittedScopes,
}) => {
  return (
    <Layout componentName="Add user">
      <EditForm
        formData={{ firstName: "", lastName: "", email: "" }}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        isEdit={true}
        buttonLoading={buttonLoading}
        permittedScopes={permittedScopes}
      />
    </Layout>
  );
};

const ViewUserComponent = ({ userData, setUserData, buttonLoading }) => {
  const [selectedTab, setSelectedTab] = useState("userinfo");
  const pageTitle = `${userData?.firstName} ${userData?.lastName}`;
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const cancelHandler = () => {
    navigate("/users");
  };

  return (
    <Layout componentName={pageTitle}>
      <Box
      // sx={{
      //   marginRight: "-25px",
      // }}
      >
        <TabContext value={selectedTab}>
          <Box
            sx={{
              marginBottom: "1rem",
              marginLeft: "10px",
            }}
          >
            <TabList
              onChange={handleTabChange}
              aria-label=""
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
              <Tab value="personalinformation" />
              <Tab
                label={<Typography fontWeight="bold">User Info</Typography>}
                value="userinfo"
              />
              <Tab
                label={
                  <Typography fontWeight="bold">User Statistic</Typography>
                }
                value="userstatistic"
              />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="userinfo">
              <EditForm
                formData={userData}
                cancelHandler={cancelHandler}
                setFormsData={setUserData}
                isEdit={true}
                buttonLoading={buttonLoading}
                permittedScopes={[]}
              />
            </TabPanel>
            <TabPanel value="userstatistic">
              <UserStatistic setSelectedTab={setSelectedTab} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Layout>
  );
};

const EditUsers = User(EditUserComponent);
const AddUsers = User(AddUserComponent);
const ViewUser = User(ViewUserComponent);

export { EditUsers, AddUsers, ViewUser };
