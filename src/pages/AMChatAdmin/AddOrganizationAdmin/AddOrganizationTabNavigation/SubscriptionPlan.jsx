import React, { useState, useEffect } from "react";
import SubscriptionPlanStyle from "./SubscriptionPlan.module.css";
import { Button } from "antd";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SubscriptionCard from "../../../../components/Cards/Subscription/SubscriptionCard";
import { getPlanDetails } from "../../../../apiCalls/ApiCalls";

function SubscriptionPlan({ personalInformationHandler }) {
  const [selectedPlan, setSelectedPlan] = useState("Freemium");
  const [subscriptionItems, setSubscriptionItems] = useState();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [planDetails, setPlanDetails] = useState([]);

  useEffect(() => {
    // getSubscriptionDetails();
    fetchPlanDetails();
  }, []);

  // const getSubscriptionDetails = () => {
  //   setSubscriptionItems(subscription);
  // };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const fetchPlanDetails = async () => {
    console.log("fetching plan details---->");
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // const response = await getPlanDetails(headers);
      const response = {
        Freemium: [
          "Max 2 users",
          "Max 5 Documents",
          "Upload size 2 MB",
          "Max 10 chats free",
        ],
        Standard: [
          "Max 50 users",
          "Max 20 Documents",
          "Upload size 5 MB",
          "Max 100 Chats per user per day",
        ],
        Enterprise: [],
      };

      const subscription = [
        {
          title: "Freemium",
          description:
            "Start exploring knowledge hidden in your organisational content using GenAI based.",
          price: "Free",
          features: response["Freemium"],
        },
        {
          title: "Standard",
          description:
            "Revolutionise how you interact with your organisational data.",
          price: "$9.99",
          features: response["Standard"],
        },
        {
          title: "Enterprise",
          description: (
            <>
              Please reach out to our sales team at
              <a
                href="mailto:sales@areteminds.com"
                target="_blank"
                className="sign-up-mail"
                style={{
                  color: "#1e293b",
                  textDecoration: "underline",
                  paddingRight: "5px",
                }}
              >
                sales@areteminds.com
              </a>
            </>
          ),
          price: "",
          features: response["Enterprise"],
        },
      ];
      setPlanDetails(subscription);
    } catch (error) {
      console.log("error in fetching plan details---->", error);
    }
  };

  return (
    <Box
      sx={{
        height: "60vh",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2}>
        {planDetails?.map((item, index) => {
          return (
            <Grid item xs={12} md={4} id={index}>
              <SubscriptionCard
                item={item}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ flex: 1 }}></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <Button
          style={{ marginTop: "1em", width: "7.6em" }}
          onClick={() => {
            personalInformationHandler("organizationadmin");
          }}
        >
          <Typography variant="body1">Previous</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default SubscriptionPlan;
