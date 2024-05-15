import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Information from "./tabPages/information";
import PersonalPlans from "./tabPages/plan";
import ChangePassword from "./tabPages/changePassword";
import CustomTabList from "../TabList/CustomTabList";

const PersonalInfo = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [userRoles, setUserRoles] = useState([]);
  const isAllowedToSeePlans =
    userRoles.includes("USER") || userRoles.includes("ORG_ADMIN");

  const tabList = [
    {
      label: "Personal Information",
      value: "1",
    },
    {
      label: "Change Password",
      value: "2",
    },
    {
      label: "Usage/Subscription",
      value: "3",
      isVisible: isAllowedToSeePlans,
    },
  ];

  useEffect(() => {
    const rolesString = localStorage.getItem('userRole')
    if (rolesString) {
        const roles = rolesString.split(',').map((role) => role.trim())
        setUserRoles(roles)
    }
}, [])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSelectChange = (event) => {
    setSelectedTab(event.target.value);
  };

  return (
    <Box
      sx={{ width: "97%", paddingTop: "10px", padding: "1rem", height: "100%" }}
    >
      <TabContext value={selectedTab}>
        <Box>
          <CustomTabList
            tabs={tabList}
            onChange={handleTabChange}
            ariaLabel="Personal Info Tabs"
            variant="scrollable"
            scrollButtons="auto"
          />
        </Box>
        <Box sx={{ height: "70%" }}>
          <TabPanel value="1" style={{ padding: "0px", height: "100%" }}>
            <Information />
          </TabPanel>
          <TabPanel
            value="2"
            style={{ height: "70%", padding: "30px 0px 0px 0px" }}
          >
            <ChangePassword />
          </TabPanel>
          <TabPanel value="3">
            <PersonalPlans />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default PersonalInfo
