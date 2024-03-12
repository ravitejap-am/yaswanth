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
import OrgAdminChatPage from '../../chatmain/OrgadminChatPage/OrgAdminChatPage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { GetSetSessionToken, getUserType } from '../../../utils/SessionManager';
import { useState } from 'react'; 

function AMChat({ renderComponent }) {
  const navigationRoute = '/Info';
  const [hideChatInitialPage, setHideChatInitialPage] = useState(false);
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  const [chat, setChat] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className={Styles.dashboardContainer}>
        <div className={Styles.AMChatMainDiv}>
          <div className={Styles.AMChatSidebar}>
            <div className={Styles.AMChatSuperAdminSidebar}>
              <img src={Logo} alt="" className={Styles.appName} />
            </div>

            {/* <div className={Styles.bannerBtn}>
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
          </div> */}

          <div className={Styles.navbarTitles}>
          <div className={Styles.container} style={{backgroundColor:'#6366f1'}}>
          <Link
            to="/dashboard"
            style={{ textDecoration: 'none',width:'100%' }}>
            <div className={Styles.SuperAdminChildContainer}>
                <span>
                  <DashboardIcon style={{ color: 'white', fontSize:'20px', paddingRight:'5px' }}/>
                  <p className={Styles.organizationTextStyle}>Dashboard</p>
                </span>
            </div>
          </Link>
          </div>
          <div className={Styles.container}>
              <Link
                to="/organisations"
                style={{ textDecoration: 'none',width:'100%' }}
              >
            <div className={Styles.SuperAdminChildContainer}>
                <span>
                  <img src={organizationimage} alt="" />

                  <p className={Styles.organizationTextStyle}>Organisations</p>
                </span>
            </div>
              </Link>
          </div>
          </div>

            {
              getUserType()!==null && getUserType()!==undefined && getUserType() !==constants.SuperAdminAccount
               && 
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
            }
        
          </div>

          {/* <SuperAdminAMChatCard /> */}
          <OrgAdminChatPage 
          navigationRoute={navigationRoute} 
          hideChatInitialPage={hideChatInitialPage}
          setHideChatInitialPage={setHideChatInitialPage}
          questionAndAnswer={questionAndAnswer}
          setQuestionAndAnswer={setQuestionAndAnswer}
          chat={chat}
          setChat={setChat}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          />
        </div>
        <div className={Styles.AMChatFooterStyle}>
          <footer className="AMChat-admin-footer">
            <p className={Styles.footerPTagStyle}>
              @2024. All rights reserved by Areteminds
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default AMChat;
