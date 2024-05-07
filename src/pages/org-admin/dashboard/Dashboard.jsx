import React, { useEffect, useState } from "react";
import Layout from "../../../Layout";
import axios from "axios";
import {
  BASE_DOC_API_URL,
  BASE_ORG_API_URL,
} from "../../../constants/Constant";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import styles from "./dashboard.module.css";
import { selectUser } from "../../../store/authSlice";
import { setErrorMsg } from "../../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "../../../components/loader/loader";
import documentIcon1 from "../../../asset/AmChatSuperAdmin/Group23.png";
import documentIcon2 from "../../../asset/AmChatSuperAdmin/Group24.png";
import DashboardCard from "../../../components/common/dashboard-card/DashboardCard";
import Bar from "../../../components/common/barChart/Bar";
import CommonDatePicker from "../../../components/common/date-picker/CommonDatePicker";
import { pieRaw_data, barRaw_data } from "../../../constants/RawData";
import PieChart from "../../../components/common/pieChart/PieChart";
import dayjs from "dayjs";

function Dashboard() {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const noOfDays = isMobile ? 7 : 30
  const [orgCount, setOrgCount] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - noOfDays);
    return currentDate;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [toShowPie, setToShowPie] = useState([]);
  const [toShowBar, setToShowBar] = useState([]);
  const [selectedValue, setSelectedValue] = useState("chat");
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");
  const disableStartDates = new Date().setDate(new Date().getDate() - noOfDays);
  const disableStartDays = dayjs(disableStartDates);
  const disableEndDays = dayjs().startOf("day");
  const isIos =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    const disableBack = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    };
    disableBack();
    return () => {
      window.onpopstate = null;
    };
  }, []);

  const getDocumentsCount = async () => {
    try {
      const response = await axios.get(`${BASE_DOC_API_URL}total`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("get total document", response);
      setDocCount(response?.data?.totalElements);
    } catch (error) {
      console.log("Failed to fetch user profile.", error);
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
      console.log("Failed to fetch user profile.", error);
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        const errorMsgprops = {
          message: {
            title: "Something went wrong",
            content: "Please contact our customer support team",
          },
          // handleVerification: handleVerification,
          onOkButtonText: "Retry",
        };
        dispatch(setErrorMsg({ ...errorMsgprops }));
      }
      setIsLoading(false);
    }
  };

  const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const filteredData = (startDate, endDate, data) => {
    const filter = {};
    const filteredItems = data.filter((item) => {
      const itemDate = parseDate(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    filteredItems.forEach((item) => {
      const itemDateParts = item.date.split("/");

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = monthNames[parseInt(itemDateParts[1]) - 1];

      const fullDate =
        itemDateParts[0] + "-" + monthName + "-" + itemDateParts[2];
      filter[fullDate] = {
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
      console.log("error in fetching usage subscription details-->", error);
    }
  };

  useEffect(() => {
    if (userRole === "SUPER_ADMIN") {
      getOrganisationCount();
      getDocumentsCount();
    } else if (userRole === "ORG_ADMIN") {
      fetchUsageSubscriptionDetails();
      setToShowPie(pieRaw_data[selectedValue]);
      setToShowBar(filteredData(startDate, endDate, barRaw_data));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [userRole, selectedValue, endDate]);

  const handleSelectEnddDate = (selectedDate) => {
    const endDate = selectedDate ? new Date(selectedDate) : new Date();
    const startDate = selectedDate ? new Date(selectedDate) : new Date();
    startDate.setDate(endDate?.getDate() - noOfDays);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleSelectStartDate = (selectedDate) => {
    let endDate = selectedDate ? new Date(selectedDate) : new Date();
    let startDate = selectedDate ? new Date(selectedDate) : new Date();
    setStartDate(startDate);
    let modifiedDate = endDate;
    const addDays = endDate?.getDate() + noOfDays;
    const changedDate = modifiedDate.setDate(addDays);
    setEndDate(new Date(changedDate));
  };

  return (
    <Layout componentName="Dashboard">
      {isLoading && <PageLoader loadingStatus={isLoading} />}
      {userRole === "SUPER_ADMIN" && (
        <Grid
          container
          spacing={2}
          className={styles.container}
          sx={{ marginTop: isMobile ? "1em" : "0px" }}
        >
          <Grid item sm={12} md={6} lg={6}>
            <DashboardCard
              mainClass={styles.sub}
              icon={documentIcon1}
              contentName={"Organisation"}
              contentNumber={orgCount}
            />
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <DashboardCard
              mainClass={styles.sub}
              icon={documentIcon2}
              contentName={"Documents Uploaded"}
              contentNumber={docCount}
            />
          </Grid>
        </Grid>
      )}
      {userRole === "ORG_ADMIN" && (
        <Grid
          container
          className={styles.container}
          sx={{ marginTop: isMobile ? "1em" : "0px" }}
          columnGap={2.4}
          rowGap={3}
        >
          <Grid
            item
            sm={12}
            style={{
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
              paddingTop: "10px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: {
                  xs: "center",
                  sm: "space-between",
                  lg: "space-between",
                  md: "space-between",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Chats and Sessions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <Box>
                  <CommonDatePicker
                    selectedDate={startDate ?? new Date()}
                    handleSelectedDate={handleSelectStartDate}
                    label={"Start date"}
                    maxDays={disableStartDays}
                  />
                </Box>
                <Box>
                  <CommonDatePicker
                    selectedDate={endDate ?? new Date()}
                    handleSelectedDate={handleSelectEnddDate}
                    label={"End date"}
                    maxDays={disableEndDays}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
            <Bar dateList={toShowBar} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5.6}
            md={5.6}
            lg={2.85}
            style={{
              height: "390px",
              width: "100%",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Chat
            </Typography>
            <PieChart selectedTypeValue={pieRaw_data["chat"]} id="chat" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5.6}
            md={5.6}
            lg={2.85}
            style={{
              height: "390px",
              width: "100%",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Users
            </Typography>
            <PieChart selectedTypeValue={pieRaw_data["users"]} id="users" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5.6}
            md={5.6}
            lg={2.85}
            style={{
              height: "390px",
              width: "100%",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Documents
            </Typography>
            <PieChart
              selectedTypeValue={pieRaw_data["documents"]}
              id="documents"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5.6}
            md={5.6}
            lg={2.85}
            style={{
              height: "390px",
              width: "100%",
              display: "flex",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              flexWrap: "wrap",
              marginBottom: isIos ? "65px" : "30px",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Document size
            </Typography>
            <PieChart
              selectedTypeValue={pieRaw_data["documents_size"]}
              id="documents_size"
            />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default Dashboard;
