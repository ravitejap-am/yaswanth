import React, { useEffect, useState } from "react";
import Layout from "../../../Layout";
import styles from "./dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import documentIcon1 from "../../../asset/AmChatSuperAdmin/Group23.png";
import documentIcon2 from "../../../asset/AmChatSuperAdmin/Group24.png";
import DashboardCard from "../../../components/common/dashboard-card/DashboardCard";
import {
  BASE_DOC_API_URL,
  BASE_ORG_API_URL,
} from "../../../constants/Constant";
import { setErrorMsg } from "../../../store/authSlice";
import { selectUser } from "../../../store/authSlice";
import axios from "axios";
import PageLoader from "../../../components/loader/loader";
import { Grid } from "@mui/material";

function Dashboard() {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [orgCount, setOrgCount] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const userRole = localStorage.getItem("userRole");

  const getDocumentsCount = async () => {
    try {
      const response = await axios.get(`${BASE_DOC_API_URL}/total`, {
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

  useEffect(() => {
    if (userRole === "SUPER_ADMIN") {
      getOrganisationCount();
      getDocumentsCount();
    } else {
      setIsLoading(false);
    }
  }, [userRole]);

  return (
    <Layout>
      {isLoading && <PageLoader loadingStatus={isLoading} />}
      {userRole === "SUPER_ADMIN" && (
        <Grid container spacing={2} className={styles.container}>
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
    </Layout>
  );
}

export default Dashboard;
