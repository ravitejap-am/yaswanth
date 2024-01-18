import { Card } from "antd";
import React from "react";
import Styles from "./SuperAdminAMChatCard.module.css";
import flow from "../../../asset/AmChatSuperAdmin/flow.png";
import flowImage2 from "../../../asset/AmChatSuperAdmin/flow2.png";
import circle1 from "../../../asset/AmChatSuperAdmin/Group23.png";
import circle2 from "../../../asset/AmChatSuperAdmin/Group24.png";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Logo from "../../../asset/Vector.png";
import Search from "antd/es/input/Search";
// import flowImage from "../../../asset/AmChatSuperAdmin/Flow.svg";

function SuperAdminAMChatCard() {
  const contentArray = [
    "Can you tell me about GDPR policy?",
    "PCI compliance?",
    "PII compliance?",
    "Can you explain what's wrong with my lab report? ",
    " Can you explain the Pythagorean theorem?",
  ];
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Welcome, Lian</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>
        <div className={Styles.superAdminMiddleChildDiv}>
          <div
            className={Styles.superAdminMiddleCardStyle}
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div style={{ display: "flex" }}>
              {" "}
              <div className={Styles.superAdminMiddleCardCircle1Style}>
                {" "}
                <img src={circle1} alt="" />
              </div>
              <div className={Styles.titlePriceStyle}>
                <div>
                  <p className={Styles.titleStyle}>Total Documents Uploaded</p>
                </div>
                <div>
                  <p className={Styles.priceStyle}>500</p>
                </div>
              </div>
            </div>

            <div>
              <img src={flow} alt="" className={Styles.flowImageStyle} />
              <img
                src={flowImage2}
                alt=""
                className={Styles.flowBelowImageStyle}
              />
            </div>
          </div>

          <div
            className={Styles.superAdminMiddleCardStyle}
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div style={{ display: "flex" }}>
              <div className={Styles.superAdminMiddleCardCircle1Style}>
                {" "}
                <img src={circle2} alt="" />
              </div>
              <div className={Styles.titlePriceStyle}>
                <div className={Styles.titleStyle}>
                  <p>Total Active Users</p>
                </div>
                <div>
                  <p className={Styles.priceStyle}>500</p>
                </div>
              </div>
            </div>

            <div>
              <img src={flow} alt="" className={Styles.flowImageStyle} />
              <img
                src={flowImage2}
                alt=""
                className={Styles.flowBelowImageStyle}
              />
            </div>
          </div>
        </div>

        <div>
          <Card className={Styles.superAdminCardStyles}>
            <div>
              <div className="AI_chat_Parent_Card">
                <Card className="AM_Chat_Main_Card">
                  <div className="AM_Chat_Main_Card_Title_Div">
                    <div>
                      <div className={Styles.appHeading}>
                        <div className={Styles.appLogo}>
                          <span className="am-chat-title">AM-Chat</span>
                          <span className={Styles.appName}>
                            <img src={Logo} alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="AM_chat_first_title">
                      <div>Hello, I’m AM-Chat</div>
                      <div className="AM_chat_second_title">
                        How can I help you today?
                      </div>
                    </div>
                  </div>

                  <div className="Example_main_div">
                    <div className="Card_message_example_main">
                      {contentArray.map((content, index) => (
                        <p key={index} className="Card_message_example">
                          {content}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="AI_chat_input_box">
                    <Search
                      name={
                        "Explore your organizational knowledge base using the power of GenAI."
                      }
                    />
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminAMChatCard;
