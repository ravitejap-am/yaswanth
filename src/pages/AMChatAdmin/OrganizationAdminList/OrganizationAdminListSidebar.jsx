import React from "react";
import Logo from "../../../asset/Vector.png";
import Styles from "../AMChatBackgound/AMChat.module.css";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import organizationimage from "../../../asset/AmChatSuperAdmin/Frame 2301.png";
import userImage from "../../../asset/AmChatSuperAdmin/users.png";
import circle from "../../../asset/AmChatSuperAdmin/Ellipse 6.png";
import SuperAdminAMChatCard from "../SuperAdminAMChatCard/SuperAdminAMChatCard";
import OrganizationList from "../OrganizationList/OrganizationList";
import { Link } from "react-router-dom";
import arrorLink from "../../../asset/AmChatSuperAdmin/arrow-left.png";
import OrganizationAdminList from "./OrganizationAdminList";
function OrganizationAdminListSidebar() {
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
                  <p className={Styles.organizationTextStyle}>Organizations</p>
                </Link>
              </span>
            </div>
            <br />
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={userImage} alt="" />
                <p className={Styles.organizationTextStyle}>
                  Organization Admin
                </p>
              </span>
            </div>
          </div>
        </div>
        <OrganizationAdminList />
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p>@2024. All rights reserved by AM Chatbot</p>
        </footer>
      </div>
    </>
  );
}

export default OrganizationAdminListSidebar;
