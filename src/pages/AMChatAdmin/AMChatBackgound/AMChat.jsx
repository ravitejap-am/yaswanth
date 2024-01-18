import React from "react";
import Logo from "../../../asset/Vector.png";
import Styles from "./AMChat.module.css";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import organizationimage from "../../../asset/AmChatSuperAdmin/Frame 2301.png";
import circle from "../../../asset/AmChatSuperAdmin/Ellipse 6.png";
import SuperAdminAMChatCard from "../SuperAdminAMChatCard/SuperAdminAMChatCard";

function AMChat() {
  return (
    <div className={Styles.AMChat_main_div}>
      <div className={Styles.AMChat_sidebar}>
        <div className={Styles.appHeading}>
          <div className={Styles.appLogo}>
            <span className="am-chat-title">AM-Chat</span>
            <span className={Styles.appName}>
              <img src={Logo} alt="" />
            </span>
          </div>
        </div>

        <div className={Styles.bannerBtn}>
          <div className={Styles.bannerButton}>
            <GeneralButton
              name={"Get Started"}
              type={"submit"}
              color={"#f8fafc"}
              borderRadius={"30px"}
              backgroundColor={"#6366f1"}
              icons={frame}
              width={"140px"}
              height={"45px"}
            />
          </div>
        </div>

        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                fill="white"
              />
              <path
                d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                fill="white"
              />
              <path
                d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                fill="white"
              />
              <path
                d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                fill="white"
              />
            </svg>
            <p>Organizations</p>
            <img src={organizationimage} alt="" />
            <p>Organization Admin</p>
          </div>
        </div>

        <div>
          <p>Chats</p>
          <div>
            <p>
              How to upload my Docume... <img src={circle} alt="" />
            </p>
            <p>
              What is AM-Chat? <img src={circle} alt="" />
            </p>
          </div>
        </div>
      </div>

      <SuperAdminAMChatCard />

      {/* <footer className="AMChat-admin-footer">
        <p>@2024. All rights reserved by AM Chatbot</p>
      </footer> */}
    </div>
  );
}

export default AMChat;
