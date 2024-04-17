import React, { useEffect, useState } from "react";
import "./RightPlan.css";
import Tick1 from "../../../asset/tick.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import { Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPlanDetails } from "../../../apiCalls/ApiCalls";
import PlanCard from "../../../components/PlanCard/PlanCard";

function RightPlan(props) {
  const {selectPlan , setSelectPlan} = props
  const [scroll, setScroll] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState({});

  const smallTextStyles = isMobile
    ? {
        fontSize: "25px",
        lineHeight: "1.5",
        // fontWeight: "bold"
      }
    : {};

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
      setPlanDetails(response);
    } catch (error) {
      console.log("error in fetching plan details---->", error);
    }
  };

  useEffect(() => {
    fetchPlanDetails();
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (plan) => {
    setSelectPlan(plan)
    scrollToElement("Contact_Up")
    
  }

  return (
    <div className="Right_Plan_Main_Card">
      <div className="Right_Plan_Top_Content">
        <Typography
          variant="h4"
          gutterBottom
          className="Right_Plan_Top_Content_Title"
          sx={smallTextStyles}
        >
          Find Your Right Plan{" "}
        </Typography>
        <Typography
          variant="caption"
          mt={2}
          className="Right_Plan_Top_Content_SubTitle"
          style={{fontSize: isMobile ? '14px' : '16px'}}
        >
          Use one of the plan from below based on your need.
        </Typography>
      </div>
      
      <div className="Right_Plan_Three_Container">
        <PlanCard 
          title={"Freemium"}
          description={"Start exploring knowledge hidden in your organisational content using GenAI based Chatbot."}
          price={"Free"}
          handleClick = {()=> handleClick("FREEMIUM")}
          planDetails={planDetails}
        />
        <PlanCard 
          title={"Standard"}
          description={"Revolutionise how you interact with your organisational data."}
          price={"$ 9.99"}
          handleClick = {()=> handleClick("PREMIUM")}
          planDetails={planDetails}
        />
        <PlanCard 
          title={"Enterprise"}
          description={
          <>
            Please reach out to our sales team at&nbsp;
          <a
            className="how_to_works_span_text highlight_text"
            style={{cursor: 'pointer'}}
            onClick={() => scrollToElement("Contact_Up")}
          >
            sales@areteminds.com
          </a>
          &nbsp;.
          </>}
          price={""}
          handleClick = {()=> handleClick("ENTERPRISE")}
          planDetails={planDetails}
        />
      </div>
    </div>
  );
}

export default RightPlan;
