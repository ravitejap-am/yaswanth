import React from "react";
import "./HowItWorks.css";
import img1 from "../../../asset/how-it-works.png";
function HowItWorks() {
  return (
    <>
      <div className="How_It_Works_Main_Div">
        <div className="How_It_Works_Left_Side_div">
          <div>
            <div className="Main_Title_of_HowItWorks">
              <span>How It works</span>
            </div>
            <br />
            <span className="Sub_Title_of_how_it_Works">
              Organization onboarding
            </span>
            <br />
            <span className="how_to_works_span_text">
              Reach out to our sales team at sales@aritminds.com or fill up the
              following form, give the link to reach out to. <br />
            </span>
            <span className="Sub_Title_of_how_it_Works">Sign Up</span>
            <br />
            <span className="how_to_works_span_text">
              Sign up using our organization admin, your organizational email.{" "}
              <br />
            </span>
            <span className="Sub_Title_of_how_it_Works">Sign In</span>
            <br />
            <span className="how_to_works_span_text">
              Use your organization email to sign in to AM Chatbot and start
              exploring. <br />
            </span>
            <span className="Sub_Title_of_how_it_Works">
              Explore and Engage
            </span>
            <br />
            <span className="how_to_works_span_text">
              Start interacting with the documents uploaded by your organization
              and let the data talk.
            </span>
          </div>
        </div>

        <div className="How__it_Works_Right_Side_div">
          <div className="How__it_Works_Righit_Side_text">
            <span className="How_it_works_Your_Org">
              Your organization may have enormous amount of documents lying in
              some repository or archival. Upload them and create the knowledge
              base and start interacting with your documents.
            </span>
          </div>
          <br />
          <div className="How_it_Works_image">
            <img src={img1} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
