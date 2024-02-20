import React from 'react';
import Logo from '../../../asset/images/logo.png';
import Styles from './AMChat.module.css';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import frame from '../../../asset/Frame 1.png';
import organizationimage from '../../../asset/AmChatSuperAdmin/Frame 2301.png';
import SuperAdminAMChatCard from '../SuperAdminAMChatCard/SuperAdminAMChatCard';
import GroupCircleDot from '../../../asset/AmChatSuperAdmin/Group2306.png';
import { Link } from 'react-router-dom';
import { setUser, selectUser } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import * as constants from '../../../constants/Constant';

function AMChat({ renderComponent }) {
  return (
    <>
      <div className={Styles.AMChatMainDiv}>
        <div className={Styles.AMChatSidebar}>
          <div className={Styles.AMChatSuperAdminSidebar}>
            <img src={Logo} alt="" className={Styles.appName} />
          </div>

          <div className={Styles.bannerBtn}>
            <div className={Styles.bannerButton}>
              <GeneralButton
                name={'Start New Chat'}
                type={'submit'}
                color={'#f8fafc'}
                borderRadius={'30px'}
                backgroundColor={'#6366f1'}
                icons={frame}
                width={'148px'}
                height={'45px'}
              />
            </div>
          </div>

          <div className={Styles.container}>
            <div className={Styles.SuperAdminChildContainer}>
              <Link
                to="/dashboardadmin/organizationlist"
                style={{ textDecoration: 'none' }}
              >
                <span>
                  <img src={organizationimage} alt="" />

                  <p className={Styles.organizationTextStyle}>Organizations</p>
                </span>
              </Link>
            </div>
            <br />
          </div>

          <div className={Styles.AMchatMainDiv}>
            <p className={Styles.AmChatMainTextStyle}>Chats</p>
            <div className={Styles.AmChatsTwoContents}>
              <div className={Styles.AmChatBelowTwoDiv}>
                <p className={Styles.AmChatChatPlaceholder}>
                  How to upload my Docume...{' '}
                </p>{' '}
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
                  style={{ marginRight: '40px' }}
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
            @2024. All rights reserved by Areteminds
          </p>
        </footer>
      </div>
    </>
  );
}

export default AMChat;
