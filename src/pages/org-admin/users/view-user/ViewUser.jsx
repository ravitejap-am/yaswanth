import React, { useState } from "react";
import Layout from "../../../../Layout";
import { Box, Tab, Typography, useMediaQuery } from "@mui/material";
import UserStatistic from "./UserStatistic";
import { TabContext, TabPanel } from "@mui/lab";
import { selectUserDetails } from "../../../../store/authSlice";
import { useSelector } from "react-redux";
import EditForm from "../../../../components/EditForms/EditForms";
import CustomTabList from "../../../../components/TabList/CustomTabList";

function ViewUser() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const user = useSelector(selectUserDetails);
  const [selectedTab, setSelectedTab] = useState("userinfo");
  const pageTitle = `${user?.userData.firstName} ${user?.userData.lastName}`;

  const [userData, setUserData] = useState({
    firstName: user?.userData.firstName || "",
    lastName: user?.userData.lastName || "",
    email: user?.userData.email || "",
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Layout componentName={pageTitle}>
      <Box
        sx={{
          marginLeft: isMobile ? "" : "-23px",
        }}
      >
        <TabContext value={selectedTab}>
          <Box
            sx={{
              marginBottom: "1rem",
            }}
          >
            <CustomTabList
              onChange={handleTabChange}
              tabSx={{
                marginLeft: "15px",
              }}
            >
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
            </CustomTabList>
          </Box>
          <Box>
            <TabPanel value="userinfo">
              <EditForm
                formData={userData}
                setFormsData={setUserData}
                isEdit={true}
                cancelHandler
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
