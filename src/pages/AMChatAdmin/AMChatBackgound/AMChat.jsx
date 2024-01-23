import React from "react";
import Logo from "../../../asset/Vector.png";
import Styles from "./AMChat.module.css";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import organizationimage from "../../../asset/AmChatSuperAdmin/Frame 2301.png";
import userImage from "../../../asset/AmChatSuperAdmin/users.png";
import circle from "../../../asset/AmChatSuperAdmin/Ellipse 6.png";
import SuperAdminAMChatCard from "../SuperAdminAMChatCard/SuperAdminAMChatCard";
import OrganizationList from "../OrganizationList/OrganizationList";
import GroupCircleDot from "../../../asset/AmChatSuperAdmin/Group2306.png";
import { Link } from "react-router-dom";

function AMChat({ renderComponent }) {
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <div className={Styles.appLogo}>
              <span className={Styles.amChatTitle}>AM-Chat</span>
              <span>
                <img src={Logo} alt="" className={Styles.appName} />
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
                width={"148px"}
                height={"45px"}
              />
            </div>
          </div>

          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
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
              <Link
                to="/dashboardadmin/organizationadminlist"
                style={{ textDecoration: "none" }}
              >
                <span>
                  <img src={userImage} alt="" />

                  <p className={Styles.organizationTextStyle}>
                    Organization Admin
                  </p>
                </span>
              </Link>
            </div> */}
          </div>

          <div className={Styles.AMchatMainDiv}>
            <p className={Styles.AmChatMainTextStyle}>Chats</p>
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

        <SuperAdminAMChatCard />
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p className={Styles.footerPTagStyle}>
            @2024. All rights reserved by AM Chatbot
          </p>
        </footer>
      </div>
    </>
  );
}

export default AMChat;
