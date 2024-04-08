import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import Information from './tabPages/information';
import PersonalPlans from './tabPages/plan';
import ChangePassword from './tabPages/changePassword';

const PersonalInfo = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const [userRoles, setUserRoles] = useState([]);


  useEffect(() => {
    const rolesString = localStorage.getItem('userRole');
    if (rolesString) {
      const roles = rolesString.split(',').map(role => role.trim());
      setUserRoles(roles);
    }
  }, []);
  

  const isAllowedToSeePlans = userRoles.includes('USER') || userRoles.includes('ORG_ADMIN');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSelectChange = (event) => {
    setSelectedTab(event.target.value);
  };

  return (
    <Box sx={{ width: '97%', typography: 'body1', paddingTop: '10px', padding: '1rem', height: '100%'}}>
      <TabContext value={selectedTab}>
        {/* {isMobile ? (
          <Box sx={{ marginBottom: 2 }}>
            <Select
              value={selectedTab}
              onChange={handleSelectChange}
              fullWidth
              sx={{ backgroundColor: 'white', borderRadius: 4, height: 50}}
            >
              <MenuItem value="1">
                <Typography fontWeight="bold">Personal Information</Typography>
              </MenuItem>
              <MenuItem value="2">
                <Typography fontWeight="bold">Change Password</Typography>
              </MenuItem>
              <MenuItem value="3">
                <Typography fontWeight="bold">Plans</Typography>
              </MenuItem>
            </Select>
          </Box>
        ) : ( */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList
            onChange={handleTabChange}
            aria-label="Personal Info Tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ backgroundColor: 'white', borderRadius: 4 }}
          >
            <Tab
              label={
                <Typography fontWeight="bold">Personal Information</Typography>
              }
              value="1"
            />
            <Tab
              label={<Typography fontWeight="bold">Change Password</Typography>}
              value="2"
            />
            {isAllowedToSeePlans && (
              <Tab label={<Typography fontWeight="bold">Usage/Subscription</Typography>} value="3" />
            )}
          </TabList>
        </Box>
        {/* )} */}
        <Box sx={{height: '70%'}}>
        <TabPanel value="1" style={{ padding: '0px', height: '100%' }}>
          <Information />
        </TabPanel>
        <TabPanel value="2" style={{height: '70%',padding: '30px 0px 0px 0px'}}>
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

export default PersonalInfo;
