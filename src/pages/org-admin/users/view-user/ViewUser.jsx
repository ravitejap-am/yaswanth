import React, { useState } from "react";
import Layout from "../../../../Layout";
import { Box, Tab, Typography } from "@mui/material";
import UserStatistic from "./UserStatistic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import { selectUserDetails } from "../../../../store/authSlice";
import { useSelector } from "react-redux";
import EditForm from "../../../../components/EditForms/EditForms";

function ViewUser() {
  const organisation = useSelector(selectUserDetails);
  const [selectedTab, setSelectedTab] = useState("userinfo");
  const pageTitle = `${organisation?.userData.firstName} ${organisation?.userData.lastName}`;

  const [userData, setUserData] = useState({
    firstName: organisation?.userData.firstName || "",
    lastName: organisation?.userData.lastName || "",
    email: organisation?.userData.email || "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  const submitHandler = (formData) => {};

  const cancelHandler = () => {};

  const permittedScopes = [];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Layout componentName={pageTitle}>
      <Box>
        <TabContext value={selectedTab}>
          <Box
            sx={{
              marginBottom: "1rem",
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
                setFormsData={setUserData}
                submitHandler={submitHandler}
                isEdit={true}
                buttonLoading={buttonLoading}
                cancelHandler={cancelHandler}
                permittedScopes={permittedScopes}
                readOnlyMode={true}
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
}

export default ViewUser;
