import React, { useEffect, useState } from "react";
import Layout from "../../../../Layout";
import { Box, useMediaQuery } from "@mui/material";
import UserStatistic from "./UserStatistic";
import { TabContext, TabPanel } from "@mui/lab";
import { selectUserDetails } from "../../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../../../components/EditForms/UserForm";
import CustomTabList from "../../../../components/TabList/CustomTabList";

function ViewUser() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const user = useSelector(selectUserDetails);
  // const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("userinfo");
  const pageTitle = `${user?.userData.firstName} ${user?.userData.lastName}`;
  const tabList = [
    {
      label: "User Info",
      value: "userinfo",
    },
    {
      label: "User Statistic",
      value: "userstatistic",
    },
  ];

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
              tabs={tabList}
              onChange={handleTabChange}
              tabSx={{
                marginLeft: "15px",
              }}
            />
          </Box>
          <Box>
            <TabPanel value="userinfo">
              <UserForm
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
