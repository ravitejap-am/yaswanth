import React, { useEffect, useState } from 'react';
import Layout from '../../../Layout';
import axios from 'axios';
import {
  BASE_DOC_API_URL,
  BASE_ORG_API_URL,
} from '../../../constants/Constant';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import styles from './dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../store/authSlice';
import { setErrorMsg } from '../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import * as constants from '../../../constants/Constant';
import PageLoader from '../../../components/loader/loader';
import { getActiveUserList } from '../../../apiCalls/ApiCalls';
import documentIcon1 from '../../../asset/AmChatSuperAdmin/Group23.png';
import documentIcon2 from '../../../asset/AmChatSuperAdmin/Group24.png';
import DashboardCard from '../../../components/common/dashboard-card/DashboardCard';
import OrgChatSession from '../../../components/common/org-chat-session/OrgChatSession';
import Bar from '../../../components/common/barChart/Bar';
import Pie from '../../../components/common/pieChart/Pie';
import CommonDatePicker from '../../../components/common/date-picker/CommonDatePicker';
import { pieRaw_data, barRaw_data } from '../../../constants/RawData';
import { getUsageSubscription } from '../../../apiCalls/ApiCalls';

function Dashboard() {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orgCount, setOrgCount] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    return currentDate;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [toShowPie, setToShowPie] = useState([]);
  const [toShowBar, setToShowBar] = useState([]);
  const [selectedValue, setSelectedValue] = useState('chat');
  const [isLoading, setIsLoading] = useState(true);
  const [documentCount, setDocumentCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [orgChatSessionList, setOrgChatSessionList] = useState([]);
  const userRole = localStorage.getItem('userRole');
  const isMobile = useMediaQuery('(max-width:600px)');


  useEffect(() => {
    const disableBack = () => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
      };
    };
    disableBack();
    return () => {
      window.onpopstate = null;
    };
  }, []);
  
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  const decodedToken = decodeJWT(jwt);
  const organisationId = decodedToken ? decodedToken.organisationId : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const getDocumentsCount = async () => {
    try {
      const response = await axios.get(`${BASE_DOC_API_URL}total`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('get total document', response);
      setDocCount(response?.data?.totalElements);
    } catch (error) {
      console.log('Failed to fetch user profile.', error);
      setIsLoading(false);
    }
  };

  const getOrganisationCount = async () => {
    try {
      const response = await axios.get(`${BASE_ORG_API_URL}/all?active=true`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setOrgCount(response?.data?.totalElements);
      setIsLoading(false);
    } catch (error) {
      console.log('Failed to fetch user profile.', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        const errorMsgprops = {
          message: {
            title: 'Something went wrong',
            content: 'Please contact our customer support team',
          },
          // handleVerification: handleVerification,
          onOkButtonText: 'Retry',
        };
        dispatch(setErrorMsg({ ...errorMsgprops }));
      }
      setIsLoading(false);
    }
  };

  // const fetchActiveUserCount = async () => {
  //   try {
  //     const response = await fetch(
  //       `${constants.BASE_ORG_API_URL}/totalUsers/?active=true`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       if (response.status === 404) {
  //         console.log("400 error ");
  //         setIsLoading(false);
  //       } else if (response.status === 405) {
  //         console.log("response 405");
  //         setIsLoading(false);
  //       } else {
  //         console.log("response 405");
  //         setIsLoading(false);
  //       }
  //       return;
  //     }
  //     const responseData = await response.json();
  //     console.log("fetchActiveUserCount ::", responseData);
  //     setActiveUsersCount(responseData.totalElements); // Set active users count from the API response
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     navigate("/maintenance");
  //   }
  // };

  // const fetchDocumentCount = () => {
  //   fetch(`${constants.BASE_DOC_API_URL}/${organisationId}`, {
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("fetchDocumentCount ::", data);
  //       setDocumentCount(data?.totalElements);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       if (
  //         error?.response?.status == 500 ||
  //         error?.response?.status == "500"
  //       ) {
  //         const errorMsgprops = {
  //           message: {
  //             title: "Something went wrong",
  //             content: "Please contact our customer support team",
  //           },
  //           handleVerification: handleVerification,
  //           onOkButtonText: "Retry",
  //         };
  //         dispatch(setErrorMsg({ ...errorMsgprops }));
  //       }
  //       console.error("Error fetching document count:", error);
  //     });
  // };

  const handleVerification = () => {
    const isValidJwtToken = true;
    if (isValidJwtToken) {
      console.log('valid jwt token');
      navigate('/dashboardadmin');
    } else {
      localStorage.clear();
      navigate('/signin');
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSelectedDate = (selectedDate) => {
    const endDate = selectedDate ? new Date(selectedDate) : new Date();
    const startDate = selectedDate ? new Date(selectedDate) : new Date();
    startDate.setDate(endDate?.getDate() - 7);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const parseDate = (dateStr) => {
    const parts = dateStr.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const filteredData = (startDate, endDate, data) => {
    const filter = {};
    const filteredItems = data.filter((item) => {
      const itemDate = parseDate(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    filteredItems.forEach((item) => {
      const itemDateParts = item.date.split('/');
      const formattedDate = itemDateParts[0];
      filter[formattedDate] = {
        chat_count: item.chat_count,
        session_count: item.session_count,
      };
    });

    return filter;
  };

  const fetchUsageSubscriptionDetails = async () => {
    try {
      const headers = { Authorization: `Bearer ${jwt}` };
      // const response = await getUsageSubscription(headers)
      const response = pieRaw_data;
    } catch (error) {
      console.log('error in fetching usage subscription details-->', error);
    }
  };

  useEffect(() => {
    if (userRole === 'SUPER_ADMIN') {
      getOrganisationCount();
      getDocumentsCount();
    } else if (userRole === 'ORG_ADMIN') {
      // fetchActiveUserCount();
      // fetchDocumentCount();
      fetchUsageSubscriptionDetails();
      setToShowPie(pieRaw_data[selectedValue]);
      setToShowBar(filteredData(startDate, endDate, barRaw_data));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [userRole, selectedValue, endDate]);

  return (
    <Layout componentName="Dashboard">
      {isLoading && <PageLoader loadingStatus={isLoading} />}
      {userRole === 'SUPER_ADMIN' && (
        <Grid
          container
          spacing={2}
          className={styles.container}
          sx={{ marginTop: isMobile ? '1em' : '0px' }}
        >
          <Grid item sm={12} md={6} lg={6}>
            <DashboardCard
              mainClass={styles.sub}
              icon={documentIcon1}
              contentName={'Organisation'}
              contentNumber={orgCount}
            />
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <DashboardCard
              mainClass={styles.sub}
              icon={documentIcon2}
              contentName={'Documents Uploaded'}
              contentNumber={docCount}
            />
          </Grid>
        </Grid>
      )}
      {userRole === 'ORG_ADMIN' && (
        <Grid
          container
          spacing={2}
          className={styles.container}
          sx={{ marginTop: isMobile ? '1em' : '0px' }}
        >
          <Grid item sm={12} md={6} lg={6}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: {
                  xs: 'center',
                  sm: 'space-between',
                  lg: 'space-between',
                  md: 'space-between',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Chats and Sessions
              </Typography>
              <CommonDatePicker
                selectedDate={endDate ?? new Date()}
                handleSelectedDate={handleSelectedDate}
              />
            </Box>
            <Bar dateList={toShowBar} />
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: {
                  xs: 'center',
                  sm: 'space-between',
                  lg: 'space-between',
                  md: 'space-between',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Usage/Subscription
              </Typography>
              <FormControl
                sx={{
                  width: '200px',
                }}
                size="small"
              >
                <Select
                  id="demo-select-small"
                  value={selectedValue}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="chat">Chat</MenuItem>
                  <MenuItem value="users">Users</MenuItem>
                  <MenuItem value="documents">Documents</MenuItem>
                  <MenuItem value="documents_size">Documents Size</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Pie selectedTypeValue={pieRaw_data[selectedValue]} />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default Dashboard;
