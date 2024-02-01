import React from "react";
import Logo from "../../../asset/images/logo.png";
import Styles from "../AMChatBackgound/AMChat.module.css";
import organizationimage from "../../../asset/AmChatSuperAdmin/Frame 2301.png";
import OrganizationList from "../OrganizationList/OrganizationList";
import { Link } from "react-router-dom";
import arrorLink from "../../../asset/AmChatSuperAdmin/arrow-left.png";

function OrganizationSidebar() {
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <img src={Logo} alt="" className={Styles.appName} />
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
            {/* <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={userImage} alt="" />
                <Link
                  to="/dashboardadmin/organizationadminlist"
                  style={{ textDecoration: "none" }}
                >
                  <p className={Styles.organizationTextStyle}>
                    Organization Admin
                  </p>
                </Link>
              </span>
            </div> */}
          </div>
        </div>
        <OrganizationList />
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

export default OrganizationSidebar;
