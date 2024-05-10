import React, { useState } from "react";
import Layout from "../../../../Layout";
import { Box, Tab, Typography } from "@mui/material";
import UserStatistic from "./UserStatistic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserInfo from "./UserInfo";

function ViewUser() {
  const [selectedTab, setSelectedTab] = useState("userinfo");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Layout>
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
            <TabPanel value="personalinformation">
              <UserInfo setSelectedTab={setSelectedTab} />
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
