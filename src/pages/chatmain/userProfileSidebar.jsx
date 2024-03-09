import React from 'react';
import Logo from '../../asset/images/logo.png';
import Styles from '../AMChatAdmin/AMChatBackgound/AMChat.module.css';
import GeneralButton from '../../components/common/buttons/GeneralButton';
import frame from '../../asset/Frame 1.png';
import arrorLink from '../../asset/AmChatSuperAdmin/arrow-left.png';
// import SuperAdminAMChatCard from "../SuperAdminAMChatCard/SuperAdminAMChatCard";
// import OrganizationList from "../OrganizationList/OrganizationList";
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';

function userProfileSidebar() {
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
            <Link to="/user" style={{ textDecoration: 'none' }}>
              <div className={Styles.SuperAdminChildContainer}>
                <span>
                  <img src={arrorLink} alt="" />
                  <p className={Styles.organizationTextStyle}>
                    Back to Chat
                  </p>{' '}
                </span>
              </div>
            </Link>
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
        </div>

        <UserProfile />
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

export default userProfileSidebar;
