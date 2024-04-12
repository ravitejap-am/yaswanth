import React, { useEffect, useState } from "react";
import "./RightPlan.css";
import Tick1 from "../../../asset/tick.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import { Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPlanDetails } from "../../../apiCalls/ApiCalls";
import PlanCard from "../../../components/PlanCard/PlanCard";

function RightPlan() {
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
    if(plan === "Freemium" ){
      navigate("/signIn")
    }else{
      scrollToElement("Contact_Up")
    }
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
          handleClick = {()=> handleClick("Freemium")}
          planDetails={planDetails}
        />
        <PlanCard 
          title={"Standard"}
          description={"Revolutionise how you interact with your organisational data."}
          price={"$ 9.99"}
          handleClick = {()=> handleClick("Standard")}
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
          handleClick = {()=> handleClick("Enterprise")}
          planDetails={planDetails}
        />
        {/* <div className="Right_Plan_Content">
          <div>
            <Typography
              variant="h5"
              fontWeight="600"
              className="Right_Plan_Content_Title"
            >
              Freemium
            </Typography>
            <Typography
              variant="body1"
              mt={2}
              className="Right_Plan_Content_Sub_Div"
            >
              Start exploring knowledge hidden in your organisational content
              using GenAI based.
            </Typography>
          </div>
          <div>
            <p className="Right_Plan_Content_Price">
              <span className="price">Free</span>
              <Typography variant="caption" className="per-month">
                {""}
              </Typography>
            </p>
          </div>
          <div
            className="Right_Plan_Gernal_Button"
            onClick={() => navigate("/signIn")}
          >
            <GeneralButton
              name={"Get Started"}
              type={"Get Started"}
              color={"#f8fafc"}
              borderRadius={"30px"}
              backgroundColor={"#6366f1"}
              icons={frame}
              width={"282.001px"}
              height={"45px"}
            />
          </div>
          <div className="Right_Plan_Below_Content">
            {Object.keys(planDetails).length > 0 &&
              planDetails.hasOwnProperty("Freemium") &&
              planDetails["Freemium"].map((item, index) => {
                return (
                  <div
                    className="Right_Plan_below_Content_Sub_Div"
                    key={`freemium${index}`}
                  >
                    <img src={Tick1} alt="" />
                    <Typography
                      variant="body2"
                      className="Right_Plan_below_Content_P_Tag"
                    >
                      {item}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="Right_Plan_Content">
          <div>
            <Typography
              variant="h5"
              fontWeight="600"
              className="Right_Plan_Content_Title"
            >
              Standard{" "}
            </Typography>
            <Typography
              variant="body1"
              mt={2}
              className="Right_Plan_Content_Sub_Div"
            >
              {" "}
              Revolutionise how you interact with your organisational data.
            </Typography>
          </div>
          <div>
            <p class="Right_Plan_Content_Price">
              <span class="price">$ 9.99</span>
              <Typography variant="caption" className="per-month">
                /Month
              </Typography>
            </p>
          </div>
          <div
            className="Right_Plan_Gernal_Button"
            onClick={() => scrollToElement("Contact_Up")}
          >
            <GeneralButton
              name={"Get Started"}
              type={"Get Started"}
              color={"#f8fafc"}
              borderRadius={"30px"}
              backgroundColor={"#6366f1"}
              icons={frame}
              width={"282.001px"}
              height={"45px"}
            />
          </div>
          <div className="Right_Plan_Below_Content">
            {Object.keys(planDetails).length > 0 &&
              planDetails.hasOwnProperty("Standard") &&
              planDetails["Standard"].map((item, index) => {
                return (
                  <div
                    className="Right_Plan_below_Content_Sub_Div"
                    key={`Standard${index}`}
                  >
                    <img src={Tick1} alt="" />
                    <Typography
                      variant="body2"
                      className="Right_Plan_below_Content_P_Tag"
                    >
                      {item}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="Right_Plan_Content">
          <div>
            <div>
              <Typography
                variant="h5"
                fontWeight="600"
                className="Right_Plan_Content_Title"
              >
                Enterprise
              </Typography>
              <Typography
                variant="body1"
                mt={2}
                className="Right_Plan_Content_Sub_Div"
              >
                {" "}
                Please reach out to our sales team at&nbsp;
                <a
                  className="how_to_works_span_text highlight_text"
                  style={{cursor: 'pointer'}}
                  onClick={() => scrollToElement("Contact_Up")}
                >
                  sales@areteminds.com
                </a>
                .
              </Typography>
            </div>

            <div>
              <p class="Right_Plan_Content_Price" style={{height:'1rem'}}>
                <span class="price"></span>
                <Typography variant="caption" className="per-month">
                </Typography>
              </p>
            </div>

            <div
              className="Right_Plan_Gernal_Button"
              onClick={() => scrollToElement("Contact_Up")}
            >
              <GeneralButton
                name={"Get Started"}
                type={"Get Started"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"282.001px"}
                height={"45px"}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default RightPlan;
