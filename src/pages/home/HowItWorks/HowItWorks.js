import React from 'react';
import './HowItWorks.css';
import img1 from '../../../asset/how-it-works.png';
import img2 from '../../../asset/AmChatSuperAdmin/Group2307.png';
import img3 from '../../../asset/images/how-it-works-step.png';
import img4 from '../../../asset/images/link.png';
import Stepper from '../../../asset/stepper.png';
import { Steps } from 'antd';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
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
        </span>
      ),
      icon: <img src={Stepper} style={{ width: '1.5em' }} />,
    },
    {
      title: <span className="Sub_Title_of_how_it_Works">Sign Up</span>,
      description: (
        <span className="how_to_works_span_text">
          Sign up using your details, email, and setting up your password.{' '}
          <br />
          <br />
        </span>
      ),
      icon: <img src={Stepper} style={{ width: '1.5em' }} />,
    },
    {
      title: <span className="Sub_Title_of_how_it_Works">Sign In</span>,
      description: (
        <span className="how_to_works_span_text">
          Use your organizational email and your password. <br /> <br />
        </span>
      ),
      icon: <img src={Stepper} style={{ width: '1.5em' }} />,
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
      icon: <img src={Stepper} style={{ width: '1.5em' }} />,
    },
  ];
  return (
    <>
      <div className="How_It_Works_Main_Div">
        <br />
        <br />
        <br />
        <div className="How_It_Works_Left_Side_div">
          <div>
            <div className="Main_Title_of_HowItWorks">
              <span>How It works</span>
            </div>
            <br />
            <br />
            {/* <Steps
              direction="vertical"
              size="small"
              current={4}
              items={stepperItems}
            /> */}
            <div className="How_it_works_container">
              <div className="How_it_works_imge2">
                <span className="Sub_Title_of_how_it_Works">
                  Organization onboarding
                </span>
                <br />
                <span className="how_to_works_span_text">
                  Reach out to our sales team at sales@areteminds.com or fill up
                  the form given in Contact Us section below. <br />
                </span>
                <span className="Sub_Title_of_how_it_Works">Sign Up</span>
                <br />
                <span className="how_to_works_span_text">
                  Sign up using your details, email, and setting up your
                  password. <br />
                </span>
                <span className="Sub_Title_of_how_it_Works">Sign In</span>
                <br />
                <span className="how_to_works_span_text">
                  Use your organizational email and your password. <br />
                </span>
                <span className="Sub_Title_of_how_it_Works">
                  Explore and Engage
                </span>
                <br />
                <span className="how_to_works_span_text">
                  Start interacting with the documents uploaded by your
                  organization and let the data talk.
                </span>
              </div>
            </div>
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
