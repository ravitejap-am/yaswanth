import React from "react";
import Logo from "../../../asset/Vector.png";
import Styles from "../../AMChatAdmin/AMChatBackgound/AMChat.module.css";
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
import documentIcon from '../../../asset/Group 23 (1).png'
import vectoricon from '../../../asset/vectoricon.png'
import './OrgAdminChatPage.css'
function OrgAdminChatSidebar() {
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <div className={Styles.appLogo}>
              <span className={Styles.amChatTitle}>AM-Chat</span>
              <span className={Styles.appName}>
                <img src={Logo} alt="" />
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
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={arrorLink} alt="" />
                <Link to="/dashboardadmin" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Back to Chat</p>{" "}
                </Link>
              </span>

              <span>
                <img src={organizationimage} alt="" />
                <Link
                  to="/dashboardadmin/organizationlist"
                  style={{ textDecoration: "none" }}
                >
                  <p className={Styles.organizationTextStyle}>Users</p>
                </Link>
              </span>
            </div>
            <br />
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={userImage} alt="" />
                <p className={Styles.organizationTextStyle}>
                  Document
                </p>
              </span>
            </div>
          </div>
        </div>
        <OrgAdminChatPage />
        <div className='orgadminchat-orgadmin-cards'>
          <div className='orgadminchat-orgadmindoc-card'>
            <div className='orgadminchat-orgadmindocument-card'>
              <img className='orgadminchat-document-icon' src={documentIcon} alt="Document" />
              <h2>Documents</h2>
              <h1 className="document-value">500</h1>
              {/* <img src={vectoricon} alt="pic" /> */}
              
            </div>
          </div>
          <div className='orgadminchat-orgadmin-activeuser-card'>
          <img className='orgadminchat-document-icon' src={documentIcon} alt="Document" />
              <h2>Active Users</h2>
              <h1 className="document-value">500</h1>
              {/* <img src={vectoricon} alt="pic" /> */}
          </div>
        </div>
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p>@2024. All rights reserved by AM Chatbot</p>
        </footer>
      </div>
    </>
  );
}

export default OrgAdminChatSidebar;
