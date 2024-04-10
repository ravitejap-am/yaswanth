import React, { useState, useEffect } from "react";
import { Card } from "antd";
import righticon from "../../../asset/primiumrighticon.png";
import { Box, Typography, Grid } from "@mui/material";
import SubscriptionCard from "../../Cards/Subscription/SubscriptionCard";
import { getPlanDetailsById } from "../../../apiCalls/ApiCalls";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/authSlice";

function PersonalPlans() {
  const [selectedPlan, setSelectedPlan] = useState("Freemium");
  const [planDetails, setPlanDetails] = useState([]);
  const user = useSelector(selectUser);
  const jwt = user.userToken;

  useEffect(() => {
    fetchPlanDetails();
  }, []);

  const fetchPlanDetails = async () => {
    console.log("fetching plan details---->");
    try {
      const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      };
      // const id = 1;
      // const response = await getPlanDetailsById(id, headers);
      const response = {
        Freemium: [
          "Max 2 users",
          "Max 5 Documents",
          "Upload size 2 MB",
          "Max 10 chats free",
        ],
      };

      const modifyData = [
        {
          title: "Freemium",
          description:
            "Revolutionize keywords search into your document with our free plan.",
          price: "Free",
          features: response["Freemium"],
        },
      ];
      setPlanDetails(modifyData);
    } catch (error) {
      console.log("error in fetching plan details---->", error);
    }
  };

  const subscriptionItems = [
    {
      title: "Freemium",
      description:
        "Revolutionize keywords search into your document with our free plan.",
      price: "Free",
      features: [
        "Max 2 users",
        "Max 5 Documents",
        "Upload size 2 MB",
        "Max 10 chats free",
      ],
    },
  ];


  console.log("plan details---->",planDetails);

  return (
    <Box>
      <Grid container>
        {planDetails?.length > 0 &&
          planDetails.map((item, id) => {
            return (
              <Grid item xs={12} md={5} lg={4} key={id}>
                <SubscriptionCard
                  item={item}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  externalHeight={"auto"}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

export default PersonalPlans;
