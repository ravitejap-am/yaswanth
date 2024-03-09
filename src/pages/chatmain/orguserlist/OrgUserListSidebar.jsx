import React from "react";
import Logo from "../../../asset/logo.png";
import Styles from "./OrgUserListSidebar.module.css";
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
import usersicon from "../../../asset/users.png";
import documenticon from "../../../asset/document1.png";
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';


function OrgUserListSidebar() {
  const navigationRoute = "/organizationPersonalInfo";
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <div className={Styles.appLogo}>
              {/* <span className={Styles.amChatTitle}>AM-Chat</span> */}
              <span className={Styles.appName}>
                <img className={Styles.logoicon} src={Logo} alt="" />
              </span>
            </div>
          </div>

          <div className={Styles.bannerBtn}>
            {/* <div className={Styles.bannerButton}>
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
            </div> */}
          </div>
          
          <div className={Styles.container}>
            {/* <div className={Styles.SuperAdminChildContainer}>
              <Link to="/orgdocumentlist" style={{ textDecoration: "none" }}>
              <span>
                <img src={arrorLink} alt="" />
                  <p className={Styles.organizationTextStyle}>Back </p>
              </span>
              </Link>
            </div> */}
            <div className={Styles.SuperAdminChildContainer}>
              <Link to="/orgadminchat" style={{ textDecoration: "none" }}>
              <span>
                  <DashboardIcon style={{ color: 'white', fontSize:'20px', paddingRight:'10px' }}/>
                  <p className={Styles.organizationTextStyle}>Dashboard</p>
              </span>
              </Link>
            </div>
            <div className={Styles.SuperAdminChildContainer}>
              <Link to="/orguserlist" style={{ textDecoration: "none" }}>
              <span>
                  <GroupIcon style={{ color: 'white', fontSize:'20px', paddingRight:'10px' }}/>
                  <p className={Styles.organizationTextStyle}>Users</p>
              </span>
              </Link>
            </div>
            <div className={Styles.SuperAdminChildContainer} style={{backgroundColor:'#6366f1', borderRadius: '5px'}}>
              <Link to="/orgdocumentlist" style={{ textDecoration: "none" }}>
              <span>
              <img src={documenticon} alt="" />
                  <p className={Styles.organizationTextStyle}>Documents</p>
              </span>
              </Link>
            </div>
            <div className={Styles.SuperAdminChildContainer}>
              <Link to="/orgadminchat" style={{ textDecoration: "none" }}>
              <span>
                  <ChatIcon style={{ color: 'white', fontSize:'20px', paddingRight:'10px' }}/>
                  <p className={Styles.organizationTextStyle}>Chat</p>
              </span>
              </Link>
            </div>
          </div>
        </div>
        <OrgUserList navigationRoute={navigationRoute}/>
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p>@2024. All rights reserved by Areteminds</p>
        </footer>
      </div>
    </>
  );
}

export default OrgUserListSidebar;
