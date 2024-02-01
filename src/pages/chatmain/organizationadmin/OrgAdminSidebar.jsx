import React from "react";
import Logo from "../../../asset/Vector.png";
// import 
import Styles from "../../AMChatAdmin/AMChatBackgound/AMChat.module.css";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import organizationimage from "../../../asset/AmChatSuperAdmin/Frame 2301.png";
import userImage from "../../../asset/AmChatSuperAdmin/users.png";
import { Link } from "react-router-dom";
import arrorLink from "../../../asset/AmChatSuperAdmin/arrow-left.png";
// import OrganizationAdminListSidebar from "../OrganizationAdminList/OrganizationAdminListSidebar";
import AddOrganizationAdmin from "./AddOrgUser";
import AddOrgUser from "./AddOrgUser";
import usersicon from '../../../asset/users.png'
import documenticon from '../../../asset/document1.png'

function OrgAdminSidebar() {
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

          {/* <div className={Styles.bannerBtn}>
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
          </div> */}

          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={arrorLink} alt="" />
                <Link to="/userchat" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Back to Chat</p>{" "}
                </Link>
              </span>

              <span>
                <img src={usersicon} alt="" />
                <Link
                  to="/orguserlist"
                  style={{ textDecoration: "none" }}
                >
                  <p className={Styles.organizationTextStyle}>Users</p>
                </Link>
              </span>
            </div>
            <br />
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={documenticon} alt="" />
                <Link to="/orgdocumentlist" style={{ textDecoration: "none" }} >
                <p className={Styles.organizationTextStyle}>
                  Documents
                </p>
                </Link>
              </span>
            </div>
          </div>
        </div>
        <AddOrgUser />
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p>@2024. All rights reserved by AM Chatbot</p>
        </footer>
      </div>
    </>
  );
}

export default OrgAdminSidebar;
