import React from 'react';
import Logo from '../../../asset/images/logo.png';
import Styles from '../AMChatBackgound/AMChat.module.css';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import frame from '../../../asset/Frame 1.png';
import organizationimage from '../../../asset/AmChatSuperAdmin/Frame 2301.png';
import userImage from '../../../asset/AmChatSuperAdmin/users.png';
import { Link } from 'react-router-dom';
import arrorLink from '../../../asset/AmChatSuperAdmin/arrow-left.png';
import OrganizationAdminListSidebar from '../OrganizationAdminList/OrganizationAdminListSidebar';
import AddOrganizationAdmin from './AddOrganizationAdmin';

function AddOrganizationAdminSidebar() {
  return (
    <>
      <div className={Styles.AMChatMainDiv} style={{ height: '100vh' }}>
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
            <Link to="/organisations" style={{ textDecoration: 'none' }}>
              <div className={Styles.SuperAdminChildContainer}>
                <span>
                  <img src={arrorLink} alt="" />
                  <p className={Styles.organizationTextStyle}>
                    Organisations
                  </p>{' '}
                </span>
              </div>
            </Link>
            <br />
          </div>
        </div>
        <AddOrganizationAdmin />
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

export default AddOrganizationAdminSidebar;
