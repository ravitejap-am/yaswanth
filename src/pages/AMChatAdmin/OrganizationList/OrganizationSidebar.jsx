import React from 'react';
import Logo from '../../../asset/images/logo.png';
import Styles from '../AMChatBackgound/AMChat.module.css';
import organizationimage from '../../../asset/AmChatSuperAdmin/Frame 2301.png';
import OrganizationList from '../OrganizationList/OrganizationList';
import { Link } from 'react-router-dom';
import arrorLink from '../../../asset/AmChatSuperAdmin/arrow-left.png';
import DashboardIcon from '@mui/icons-material/Dashboard';

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
            <Link to="/dashboard" style={{ textDecoration: 'none',width:'100%' }}>
            <div className={Styles.SuperAdminChildContainer}>
                <span>
                  {/* <img src={arrorLink} alt="" /> */}
                  <DashboardIcon style={{ color: 'white', fontSize:'20px', paddingRight:'5px' }}/>
                  <p className={Styles.organizationTextStyle}>
                    Dashboard
                  </p>
                </span>
            </div>
            </Link>

          </div>
          <div className={Styles.container} style={{backgroundColor:'#6366f1'}}>
            <Link to="/organisations" style={{ textDecoration: 'none', width:'100%' }}>
            <div className={Styles.SuperAdminChildContainer}>
                <span>
                <img src={organizationimage} alt="" />
                  <p className={Styles.organizationTextStyle}>
                  Organisations
                  </p>
                </span>
            </div>
            </Link>
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
