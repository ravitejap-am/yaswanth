import React from "react";
import "./HowItWorks.css";
import img1 from "../../../asset/how-it-works.png";
import img2 from "../../../asset/AmChatSuperAdmin/Group2307.png";
import img3 from "../../../asset/images/how-it-works-step.png";
import img4 from "../../../asset/images/link.png";
import Stepper from "../../../asset/stepper.png";
import { Steps } from "antd";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import { Grid } from "antd";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HowItWorks() {
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  let stepperItems = [
    {
      title: (
        <Typography variant="h5" className="Sub_Title_of_how_it_Works">
          Organisation onboarding
        </Typography>
      ),
      description: (
        <Typography variant="subtitle2" className="how_to_works_span_text">
          Reach out to our sales team at&nbsp;
          <a
            href="mailto:sales@areteminds.com"
            target="_blank"
            className="how_to_works_span_text"
            style={{
              textDecoration: "underline",
            }}
          >
            sales@areteminds.com
          </a>
          &nbsp;or fill up the form given in&nbsp;
          <a
            className="how_to_works_span_text highlight_text"
            onClick={() => scrollToElement("Contact_Up")}
          >
            Contact Us
          </a>
          &nbsp;section below. <br />
          <br />
        </Typography>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
    {
      title: (
        <Link to="/registeruser" style={{ textDecoration: "underline" }}>
          <Typography variant="h5" className="Sub_Title_of_how_it_Works">
            Sign Up
          </Typography>
        </Link>
      ),

      description: (
        <Typography variant="subtitle2" className="how_to_works_span_text">
          Sign up using your details, email, and setting up your password.{" "}
          <br />
          <br />
        </Typography>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
    {
      title: (
        <Link to="/signIn" style={{ textDecoration: "underline" }}>
          <Typography variant="h5" className="Sub_Title_of_how_it_Works">
            Sign In
          </Typography>
        </Link>
      ),
      description: (
        <Typography variant="subtitle2" className="how_to_works_span_text">
          Sign in using your organisation email and your password. <br /> <br />
        </Typography>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
    {
      title: (
        <Typography variant="h5" className="Sub_Title_of_how_it_Works">
          Explore and Engage
        </Typography>
      ),
      description: (
        <Typography variant="subtitle2" className="how_to_works_span_text">
          Start interacting with the documents uploaded by your organisation and
          let the data talk. <br /> <br />
        </Typography>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
  ];
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <div className="How_It_Works_Main_Div">
      <div className="How_It_Works">
        <span className="Main_Title_of_HowItWorks">How It works</span>
        <Typography variant="body2" mb={3} className="How_it_works_Your_Org">
        Your organization likely has a vast repository of documents stored in an archive. By uploading them and creating a knowledge base, you can interact more effectively with your documents.
        </Typography>
      </div>
      <div className="How_It_Works_2">
        <div className="How_It_Works_Left_Side_div">
          <Steps
            direction="vertical"
            size="small"
            current={4}
            items={stepperItems}
          />
        </div>
        <div className="How__it_Works_Right_Side_div">
          {screens.sm || screens.lg ? (
            <div>
              <img className="How_it_Works_image" src={img1} alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
