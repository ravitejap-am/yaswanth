import React from 'react';
import Logo from '../../../../asset/logo.png';
// import
import Styles from './OrgEditDocument.module.css';
import GeneralButton from '../../../../components/common/buttons/GeneralButton';
import frame from '../../../../asset/Frame 1.png';
import organizationimage from '../../../../asset/AmChatSuperAdmin/Frame 2301.png';
import userImage from '../../../../asset/AmChatSuperAdmin/users.png';
import { Link } from 'react-router-dom';
import arrorLink from '../../../../asset/AmChatSuperAdmin/arrow-left.png';
// import OrganizationAdminListSidebar from "../OrganizationAdminList/OrganizationAdminListSidebar";
import OrgAddDocument from "../../../chatmain/orgadddocument/OrgAddDocument";
import usersicon from "../../../../asset/users.png";
import documenticon from "../../../../asset/document1.png";
import OrgEditDocument from "./OrgEditDocument";
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';

function OrgEditDocumentSidebar() {
  const navigationRoute = '/Info';

  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <div className={Styles.appLogo}>
              {/* <span className={Styles.amChatTitle}>AM-Chat</span> */}
              <span className={Styles.appName}>
                <img className={Styles.icon} src={Logo} alt="" />
              </span>
            </div>
          </div>

          <div className={Styles.bannerBtn}>
            <div className={Styles.bannerButton}>
              {/* <GeneralButton
                name={"Start New Chat"}
                type={"submit"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"140px"}
                height={"45px"}
              /> */}
            </div>
          </div>

          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <span>
                <img src={arrorLink} alt="" />
                <Link to="/documents" style={{ textDecoration: "none" }}>
                  <p className={Styles.organizationTextStyle}>Back</p>{" "}
                </Link>
              </span>
            </div>
            <div className={Styles.SuperAdminChildContainer}>
            <Link to="/chat" style={{ textDecoration: "none" }}>
                <span>
                  <DashboardIcon style={{ color: 'white', paddingLeft : '4px', fontSize:'20px', paddingRight:'5px' }}/>
                  <p className={Styles.organizationTextStyle}>Dashboard</p>
                </span>
            </Link>
            </div>
            <div className={Styles.SuperAdminChildContainer}>
            <Link to="/users" style={{ textDecoration: "none" }}>
                <span>
                  <GroupIcon style={{ color: 'white', paddingLeft : '4px', fontSize:'20px', paddingRight:'5px' }}/>
                  <p className={Styles.organizationTextStyle}>Users</p>
                </span>
            </Link>
            </div>
            <div className={Styles.SuperAdminChildContainer} style={{backgroundColor:'#6366f1', borderRadius: '5px'}}>
            <Link to="/documents" style={{ textDecoration: "none" }}>
                <span>
                  <img src={documenticon} alt="" />
                  <p className={Styles.organizationTextStyle}>Documents</p>
                </span>
              </Link>
            </div>
            <div className={Styles.SuperAdminChildContainer}>
            <Link to="/chat" style={{ textDecoration: "none" }}>
                <span>
                <ChatIcon style={{ color: 'white', paddingLeft : '4px', fontSize:'20px', paddingRight:'5px' }}/>
                  <p className={Styles.organizationTextStyle}>Chat</p>
                </span>
            </Link>
            </div>
          </div>
        </div>
        <OrgEditDocument navigationRoute={navigationRoute} />
      </div>
      <div className={Styles.AMChatFooterStyle}>
        <footer className="AMChat-admin-footer">
          <p>@2024. All rights reserved by AM Chatbot</p>
        </footer>
      </div>
    </>
  );
}

export default OrgEditDocumentSidebar;
