import React from "react";
import Logo from "../../../asset/images/logo.png";
import Styles from "../../AMChatAdmin/AMChatBackgound/AMChat.module.css";
import GroupCircleDot from "../../../asset/AmChatSuperAdmin/Group2306.png";
import OrganizationAdminSearchUIAIChat from "./OrganizationAdminSearchUIAIChat";
import { useLocation } from 'react-router-dom';
function OrganizationAdminSidebarSearchUIAIChat(props) {
  const location = useLocation();
  const { params } = location.state;
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <img src={Logo} alt="" className={Styles.appName} />
          </div>

          <div className={Styles.container}></div>

          <div className={Styles.AMchatMainDiv}>
            <p className={Styles.AmChatMainTextStyle}>Recent</p>
            <div className={Styles.AmChatsTwoContents}>
              <div className={Styles.AmChatBelowTwoDiv}>
                <p className={Styles.AmChatChatPlaceholder}>
                  How to upload my Docume...{" "}
                </p>{" "}
                <img
                  src={GroupCircleDot}
                  alt=""
                  className={Styles.AmChatCircleStyle}
                />
              </div>
              <br />
              <div className={Styles.AmChatBelowTwoDiv}>
                <p
                  className={Styles.AmChatChatPlaceholder}
                  style={{ marginRight: "40px" }}
                >
                  What is AM-Chat?
                </p>
                <img
                  src={GroupCircleDot}
                  alt=""
                  className={Styles.AmChatCircleStyle}
                />
              </div>
            </div>
          </div>
        </div>

        <OrganizationAdminSearchUIAIChat  params = {params}/>
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p className={Styles.footerPTagStyle}>
            @2024. All rights reserved by Areteminds
          </p>
        </footer>
      </div>
    </>
  );
}

export default OrganizationAdminSidebarSearchUIAIChat;
