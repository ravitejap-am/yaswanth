import { Card } from "antd";
import React from "react";
import Styles from "./SuperAdminAMChatCard.module.css";
import flow from "../../../asset/AmChatSuperAdmin/flow.png";
import flowImage2 from "../../../asset/AmChatSuperAdmin/flow2.png";
import circle1 from "../../../asset/AmChatSuperAdmin/Group23.png";
import circle2 from "../../../asset/AmChatSuperAdmin/Group24.png";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Logo from "../../../asset/Vector.png";
import Group2290 from "../../../asset/Group2290.png";
import Search from "../../../components/common/search/Search";
import { Link, useNavigate } from "react-router-dom";
// import flowImage from "../../../asset/AmChatSuperAdmin/Flow.svg";

function SuperAdminAMChatCard() {
  const navigate = useNavigate();
  const contentArray = [
    "Could you help me with the maternity policy of my organization?",
    "Can you tell me about GDPR compliance.  Which I should follow in my organization?",
    "Can you explain me the Pythagoras theorem based on. ",
    "Can you tell me what's wrong in my lab reports?  ",
    "Can you explain me the quantum mechanics? ",
  ];
  const searchStyles = {
    width: "96%",
    height: "70px",
    borderRadius: "35px",
    border: "1px solid #94a3b8",
    color: "#94a3b8",
    paddingLeft: "30px",
  };
  const handleSearchImageClick = () => {
    navigate("/chat");
  };
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Welcome, Lian</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{
              display: "flex",
              alignItems: "center",
            }}
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
                <p className={Styles.titleStyle}>Organizations</p>
                <p className={Styles.priceStyle}>500</p>
              </div>
            </div>

            <div className={Styles.flowImageParentDiv}>
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
                  <p>Documents Uploaded</p>
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

        {/* <div> */}
        <Card className={Styles.superAdminCardStyles}>
          <div className={Styles.AMChatMainCardTitleDiv}>
            <div className={Styles.SuperAdminAmChatStyle}>
              <div className={Styles.appHeading}>
                <div className={Styles.appLogo}>
                  <span className={Styles.amChatTitle}>AM-Chat</span>
                  <span>
                    <img src={Logo} alt="" className={Styles.appName} />
                  </span>
                </div>
              </div>
            </div>
            <div className={Styles.superAdminAMChatMiddleDiv}>
              <div className={Styles.AMChatFirstTitle}>
                <p>Hello, I’m AM-Chat</p>
              </div>
              <div className={Styles.AMChatSecondTitle}>
                <p>How can I help you today?</p>
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

          <div className={Styles.AIChatInputBox}>
            {/* <Link to="/chat"> */}
            <Search
              name={"Ask anything.."}
              style={searchStyles}
              searchImage={Group2290}
              onSearchImageClick={handleSearchImageClick}
            />
            {/* </Link> */}
          </div>
        </Card>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SuperAdminAMChatCard;
