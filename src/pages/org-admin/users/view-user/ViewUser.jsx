import React, { useState } from "react";
import Layout from "../../../../Layout";
import { Box, Tab, Typography } from "@mui/material";
import UserStatistic from "./UserStatistic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserInfo from "./UserInfo";
import { useParams } from "react-router-dom";
import { selectUserDetails } from "../../../../store/authSlice";
import { useSelector } from "react-redux";

function ViewUser() {
  const { id } = useParams();
  const organisation = useSelector(selectUserDetails);
  // console.log("user id view user", id);
  console.log("organisation admin user table store data", organisation);
  const [selectedTab, setSelectedTab] = useState("userinfo");
  const pageTitle = `${organisation?.userData.firstName}${" "}${
    organisation?.userData.lastName
  }`;
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
              <UserInfo formData={{ firstName: "", lastName: "", email: "" }} />
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
