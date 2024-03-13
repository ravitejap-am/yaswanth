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

function HowItWorks() {
  let stepperItems = [
    {
      title: (
        <span className="Sub_Title_of_how_it_Works">
          Organization onboarding
        </span>
      ),
      description: (
        <span className="how_to_works_span_text">
          Reach out to our sales team at sales@areteminds.com or fill up the
          form given in Contact Us section below. <br />
          <br />
        </span>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
    {
      title: <span className="Sub_Title_of_how_it_Works">Sign Up</span>,
      description: (
        <span className="how_to_works_span_text">
          Sign up using your details, email, and setting up your password.{" "}
          <br />
          <br />
        </span>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
    {
      title: <span className="Sub_Title_of_how_it_Works">Sign In</span>,
      description: (
        <span className="how_to_works_span_text">
          Use your organizational email and your password. <br /> <br />
        </span>
      ),
      icon: <img src={Stepper} style={{ width: "1.5em" }} />,
    },
    {
      title: (
        <span className="Sub_Title_of_how_it_Works">Explore and Engage</span>
      ),
      description: (
        <span className="how_to_works_span_text">
          Start interacting with the documents uploaded by your organization and
          let the data talk. <br /> <br />
        </span>
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
        <span className="How_it_works_Your_Org">
          Your organization may have enormous amount of documents lying in some
          repository or archival. Upload them and create the knowledge base and
          start interacting with your documents.
        </span>
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
