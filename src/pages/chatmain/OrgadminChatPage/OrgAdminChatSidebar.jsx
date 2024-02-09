import React from "react";
import Logo from "../../../asset/logo.png";
import Styles from "./OrgAdminChatPageSidebar.module.css";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import organizationimage from "../../../asset/AmChatSuperAdmin/Frame 2301.png";
import userImage from "../../../asset/AmChatSuperAdmin/users.png";
// import circle from "../../../asset/AmChatSuperAdmin/Ellipse 6.png";
// import SuperAdminAMChatCard from "../SuperAdminAMChatCard/SuperAdminAMChatCard";
// import OrganizationList from "../OrganizationList/OrganizationList";
import { Link } from "react-router-dom";
import arrorLink from "../../../asset/arrow-left.png";
import OrgUserList from "../../../pages/chatmain/orguserlist/OrgUserList";
import OrgAdminChatPage from "../../chatmain/OrgadminChatPage/OrgAdminChatPage";
import documentIcon from "../../../asset/Group 23 (1).png";
import vectoricon from "../../../asset/vectoricon.png";
import "./OrgAdminChatPage.css";
import base from "../../../asset/Base.png";
import vector from "../../../asset/vectoricon.png";
import threedot from "../../../asset/threedot.png";
import usersicon from "../../../asset/users.png";
import documenticon from "../../../asset/document1.png";
function OrgAdminChatSidebar() {
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <div className={Styles.appLogo}>
              {/* <span className={Styles.amChatTitle}>AM-Chat</span> */}
              <span className={Styles.appName}>
                <img className={Styles.imageIcon} src={Logo} alt="" />
              </span>
            </div>
          </div>

          <div className={Styles.bannerBtn}>
            <div className={Styles.bannerButton}>
              <GeneralButton
                name={"Start New Chat"}
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
          <div className={Styles.container}>
            <Link to="/orguserlist" style={{ textDecoration: "none" }}>
              <div className={Styles.SuperAdminChildContainer}>
                <span>
                  <img src={usersicon} alt="" />

                  <p className={Styles.organizationTextStyle}>Users</p>
                </span>
              </div>
            </Link>

            <Link to="/orgdocumentlist" style={{ textDecoration: "none" }}>
              <div className={Styles.SuperAdminChildContainer}>
                <span>
                  <img src={documenticon} alt="" />
                  <p className={Styles.organizationTextStyle}>Document</p>
                </span>
              </div>
            </Link>
          </div>
          <div className="side-questions-main">
            <h3>Chats</h3>
            <div className="side-questions">
              <p>How to upload my Docume...</p>
            </div>
            <div className="side-questions">
              <p>What is AM-Chat?</p>
            </div>
          </div>
        </div>

        <OrgAdminChatPage />
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p>@2024. All rights reserved by Areteminds</p>
        </footer>
      </div>
    </>
  );
}

export default OrgAdminChatSidebar;
