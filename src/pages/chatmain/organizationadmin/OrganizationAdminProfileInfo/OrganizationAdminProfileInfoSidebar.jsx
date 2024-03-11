import React from 'react';
import Logo from '../../../../asset/images/logo.png';
import Styles from '../../../AMChatAdmin/AMChatBackgound/AMChat.module.css';
import GeneralButton from '../../../../components/common/buttons/GeneralButton';
import frame from '../../../../asset/Frame 1.png';
import arrorLink from '../../../../asset/AmChatSuperAdmin/arrow-left.png';
// import SuperAdminAMChatCard from "../SuperAdminAMChatCard/SuperAdminAMChatCard";
// import OrganizationList from "../OrganizationList/OrganizationList";
import { Link } from "react-router-dom";
import UserProfile from "./OrganizationAdminProfileInfo";
import OrganizationAdminProfileInfo from "./OrganizationAdminProfileInfo";
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import documenticon from '../../../../asset/document1.png'

function OrganizationAdminProfileInfoSidebar() {
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
                width={"148px"}
                height={"45px"}
              />
            </div>
          </div> */}

          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={arrorLink} alt="" />
                <Link to="/chat" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Back</p>{" "}
                </Link>
              </span>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
              <DashboardIcon style={{ color: 'white', paddingLeft : '5px', fontSize:'20px', paddingRight:'5px'}}/>
                <Link to="/chat" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Dashboard</p>{" "}
                </Link>
              </span>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
              <GroupIcon style={{ color: 'white', paddingLeft : '5px', fontSize:'20px', paddingRight:'5px'}}/>
                <Link to="/users" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Users</p>{" "}
                </Link>
              </span>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
              <img src={documenticon} alt="" />
                <Link to="/documents" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Documents</p>{" "}
                </Link>
              </span>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
              <ChatIcon style={{ color: 'white', paddingLeft : '5px', fontSize:'20px', paddingRight:'5px'}}/>
                <Link to="/chat" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Chat</p>{" "}
                </Link>
              </span>
            </div>
          </div>
        </div>

        <OrganizationAdminProfileInfo />
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

export default OrganizationAdminProfileInfoSidebar;
