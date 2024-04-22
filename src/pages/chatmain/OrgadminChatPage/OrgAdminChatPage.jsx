import React, { useEffect, useState, useRef } from 'react';
import './OrgAdminChatPage.css';
import arrow from '../../../asset/inputarrow.png';
import documentIcon from '../../../asset/Group 23 (1).png';
import base from '../../../asset/Base.png';
import vector from '../../../asset/vectoricon.png';
import documentIconpink from '../../../asset/Group 23.png';
import orgvector from '../../../asset/orgVector (1).png';
import AMChatHeader from '../../AMChatAdmin/AMChatHeader/AMChatHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as constants from '../../../constants/Constant';
import { selectUser } from '../../../store/authSlice';
import OrganizationAdminHeader from '../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader';
import Search from '../../../components/common/search/Search';
import Group2290 from '../../../asset/Group2290.png';
import ChatSearch from '../../../components/common/chatSearch/ChatSearch';
import { Card } from 'antd';
import Styles from '../../AMChatAdmin/SearchUIAMChat/SearchUIAIChat.module.css';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import Image from '../../../components/common/image/image';
// import { PROFILE_URL } from '../../../apiCalls/Constants';
import profilePlaceholder from '../../../asset/profilePlaceholder.png';
import editIcon from '../../../asset/AmChatSuperAdmin/pencil-alt.png';
import Button from '../../../components/common/buttons/GeneralButton';
import {
  BASE_USER_IMAGE_URL,
  BASE_DOC_API_URL,
  BASE_ORG_API_URL,
} from '../../../constants/Constant';
import SAStyles from '../../AMChatAdmin/SuperAdminAMChatCard/SuperAdminAMChatCard.module.css';
import circle1 from '../../../asset/AmChatSuperAdmin/Group23.png';
import circle2 from '../../../asset/AmChatSuperAdmin/Group24.png';
import flow from '../../../asset/AmChatSuperAdmin/flow.png';
import flowImage2 from '../../../asset/AmChatSuperAdmin/flow2.png';
import axios from 'axios';
import PageLoader from '../../../components/loader/loader';
import { getActiveUserList } from '../../../apiCalls/ApiCalls';
import { timeExtracter } from '../../../../src/utils/timeStampGenerateUtils'
import {setErrorMsg } from '../../../store/authSlice'
import { getUserType } from '../../../utils/SessionManager';
// import FilterChatContainer from './FilterContainer';

const OrgAdminChatPage = (props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const dispatch = useDispatch();

  console.log('admin props--->', props);
  const { navigationRoute, rightSideDashBoard , hideChatInitialPage, setHideChatInitialPage,questionAndAnswer, setQuestionAndAnswer, chat, setChat,isLoading, setIsLoading} = props;
  const userRole = localStorage.getItem('userRole');
  console.log('userRole--->', userRole);
  console.log('navigationRoute----->', navigationRoute);
  const decodeJWT = (token) => {
    try {
            const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };
  const decodedToken = decodeJWT(jwt);
  const organisationId = decodedToken ? decodedToken.organisationId : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const [documentCount, setDocumentCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  // const [chat, setChat] = useState('');
  const [page, setPage] = useState(0);
  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState('active');
  const [error, setError] = useState(null);
  const [organisationName, setOrganisationName] = useState('');
  const [amChatUserStatus, setamChatUserStatus] = useState('');
  const [firstName, setFirstName] = useState('');
  const contentArray = [
    'Could you help me with the maternity policy of my organization?',
    'Can you tell me about GDPR compliance.  Which I should follow in my organization?',
    'Can you explain me the Pythagoras theorem based on. ',
    "Can you tell me what's wrong in my lab reports?  ",
    'Can you explain me the quantum mechanics? ',
  ];

  // const [hideChatInitialPage, setHideChatInitialPage] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [questions, setQuestions] = useState([]);
  // const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  const profileUrl = constants.PROFILE_URL;
  // const [profileSrc, setProfileSrc] = useState(localStorage.getItem("profileImage") || profilePlaceholder);
  const [profileSrc, setProfileSrc] = useState(profilePlaceholder);
  const [isEditing, setIsEditing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const submitButtonProperty = {
    name: 'Save & Submit',
    color: 'white',
    backgroundColor: '#6366F1',
    type: 'primary',
    width: '130px',
    height: '40px',
    borderRadius: '15px',
    marginTop: '.6em',
    fontSize: '0.7rem',
  };

  const cancelButtonProperty = {
    name: 'Cancel',
    color: 'white',
    backgroundColor: '#6366F1',
    type: 'primary',
    width: '90px',
    height: '40px',
    borderRadius: '15px',
    marginTop: '.6em',
    fontSize: '0.7rem',
  };

  const [orgCount, setOrgCount] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const [fullName, setFullName] = useState('');
  const [activeUserList, setActiveUserList] = useState([]);
  const endRef = useRef(null);
  const [adjustChatHeight, setAdjustChatHeight] = useState(0)

  const getDocumentsCount = async () => {
    try {
      console.log('jwt', jwt);
      const response = await axios.get(`${BASE_DOC_API_URL}/total`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('get total document', response);
      setDocCount(response?.data?.totalElements);
    } catch (error) {
      console.log('Failed to fetch user profile.', error);
      // throw new Error('Failed to fetch user profile-1');
      setIsLoading(false);
    }
  };

  const getOrganisationCount = async () => {
    try {
      console.log('jwt', jwt);
      const response = await axios.get(`${BASE_ORG_API_URL}/all?active=true`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setOrgCount(response?.data?.totalElements);
      setIsLoading(false);
    } catch (error) {
      console.log('Failed to fetch user profile.', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        const errorMsgprops = {
          message : {
            title : "Something went wrong",
            content: "Please contact our customer support team"
          },
          handleVerification: handleVerification,
          onOkButtonText:"Retry"
        }
        dispatch(setErrorMsg({...errorMsgprops}))
      
    }
      // throw new Error('Failed to fetch user profile-1');
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/chat/dummy`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const modifyData = {
        question: chat,
        answer: data?.data,
      };
      setQuestionAndAnswer([...questionAndAnswer, modifyData]);
      setChat('');
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when questionAndAnswer changes
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [questionAndAnswer]);

  // useEffect(() => {
  //   // Retrieve firstName from localStorage
  //   const storedFirstName = localStorage.getItem("firstNameOrganisation");
  //   setFirstName(storedFirstName);
  // }, []);
  const callAPiForSuperAdmin = async () => {
    // await fetchUserProfile();
    await getDocumentsCount();
    await getOrganisationCount();
  };

  useEffect(() => {
    setHideChatInitialPage(false);
    setIsLoading(true);
    if (organisationId) {
      fetchUserProfile();
      fetchDocumentCount();
      fetchUserList();
      fetchActiveUserList();
    }
    if (userRole === 'SUPER_ADMIN') {
      callAPiForSuperAdmin();
    }
  }, [organisationId]);

  const handleVerification = () => {
    const isValidJwtToken = true
    if(isValidJwtToken){
      // navigate("/dashboardadmin")
      console.log("valid jwt token");
      // verify jwt token
      navigate("/dashboardadmin")
    }else{
      localStorage.clear()
      navigate("/signin")
    }
  }

  const fetchDocumentCount = () => {
    fetch(`${constants.BASE_DOC_API_URL}/${organisationId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data---->123', data);
        console.log('data.totalElements---->', data.totalElements);
        setDocumentCount(data.totalElements);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response?.status == 500 || error?.response?.status == '500') {
          const errorMsgprops = {
            message : {
              title : "Something went wrong",
              content: "Please contact our customer support team"
            },
            handleVerification: handleVerification,
            onOkButtonText:"Retry"
          }
          dispatch(setErrorMsg({...errorMsgprops}))
        
      }
        console.error('Error fetching document count:', error);
      });
  };

  const fetchUserList = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_ORG_API_URL}/totalUsers/?active=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.log('400 error ');
          setIsLoading(false);
        } else if (response.status === 405) {
          console.log('response 405');
          setIsLoading(false);
        } else {
          console.log('response 405');
          setIsLoading(false);
        }
        return;
      }
      const responseData = await response.json();

      setActiveUsersCount(responseData.totalElements); // Set active users count from the API response
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate('/maintenance');
    }
  };

  const fetchActiveUserList = async () => {
    try {
      const headers = { Authorization: `Bearer ${jwt}` };
      const response = await getActiveUserList(headers);
      console.log('response of active users---->', response);
      if (response.data?.data) {
        setActiveUserList(response.data?.data);
      } else {
        setActiveUserList([]);
      }
    } catch (error) {
      setActiveUserList([]);
      console.log('Failed to get active users.', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/getUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user profile.');
      }

      const userData = await response.json();
      console.log('userData---->', userData);
      const fullName = `${userData?.data?.user?.firstName || ''} ${
        userData?.data?.user?.lastName || ''
      }`;
      localStorage.setItem('fullName', fullName);
      setFullName(fullName);
      localStorage.setItem(
        'firstNameOrganisation',
        userData?.data?.user?.firstName
      );
      localStorage.setItem('firstName', userData?.data?.user?.firstName);
      localStorage.setItem(
        'lastNameOrganisation',
        userData?.data?.user?.lastName
      );
      console.log(
        'profile image path---->',
        userData?.data?.user?.profileImagePath
      );
      if (userData?.data?.user?.profileImagePath) {
        const imagePath = `${profileUrl}${userData?.data?.user?.profileImagePath}`;
        setProfileSrc(imagePath);
        localStorage.setItem('profileImage', imagePath);
        localStorage.setItem('userImageUrl', imagePath);
      } else {
        localStorage.setItem('profileImage', profilePlaceholder);
      }
      setUserData(userData?.data?.user);
      setOrganisationName(userData?.data?.organisation?.name);
      setamChatUserStatus(userData?.data?.user.active);
      setFirstName(userData?.data?.user?.firstName);
      // if(userData?.data?.user){
      //   let { profileImagePath } = userData?.data?.user;
      //   localStorage.setItem(
      //     'userImageUrl',
      //     `${BASE_USER_IMAGE_URL}${profileImagePath}`
      //   );
      // }

      setUserStatus(userData.data.user.active ? 'Active' : 'Inactive');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile.');
      setIsLoading(false);
    }
  };
  const users = [
    {
      profile_img: { base },
      username: 'Radhi Gupta',
      lastseen: 'Last chat time : 5:00 PM',
    },
    {
      profile_img: { base },
      username: 'Radhi Gupta',
      lastseen: 'Last chat time : 5:00 PM',
    },
    {
      profile_img: { base },
      username: 'Radhi Gupta',
      lastseen: 'Last chat time : 5:00 PM',
    },
    {
      profile_img: { base },
      username: 'Radhi Gupta',
      lastseen: 'Last chat time : 5:00 PM',
    },
  ];

  const handleStartChat = () => {
    console.log('start chatButton clicked');
  };

  const handleQuestionClick = (question) => {
    console.log(`Question clicked: ${question}`);
    setChat(question);
  };

  const arrowButton = async () => {
    // console.log("arrowButton clicked");
    // navigate('/chatOrgAdmin', { state: { params: chat } });
    setQuestions([...questions, chat]);
    await fetchData();
    setHideChatInitialPage(true);
    // setChat("");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  console.log('hide initial page', hideChatInitialPage);
  console.log('questionAndAnswer------>', questionAndAnswer);

  return (
    <>
      {isLoading && <PageLoader loadingStatus={isLoading} />}
      <div className="orgadminchat-screen">
        <div
          className="orgadminchat-chat-container"
          // style={{width: '79vw' }}
        >
          <div className="orgadminchat-chat-header">
            <OrganizationAdminHeader
              componentName={`Welcome ${fullName || ''}`}
              name={fullName || ''}
              profileImageSrc={localStorage.getItem('userImageUrl')}
              customStyle={{
                containerStyle: {
                  display: 'flex',
                  borderRadius: '8px',
                },
                imageStyle: {
                  width: '44px',
                  height: '44px',
                },
                textStyle: {
                  color: 'black',
                  fontWeight: '600',
                  fontSize: '18px',
                },
              }}
              navigationRoute={navigationRoute}
            />
          </div>
          {/* super admin dashboard */}
          {userRole === 'SUPER_ADMIN' && (
            <div
              className={SAStyles.superAdminMiddleChildDiv}
              style={{ marginBottom: '15px' }}
            >
              <div
                className={SAStyles.superAdminMiddleCardStyle}
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div  style={{cursor:'pointer' ,display: 'flex'}} onClick={()=>{
                  if(getUserType()=== constants.SuperAdminAccount)
                  { 
                    window.location.href="organisations"
                  }
                
                }} >
                  {' '}
                  <div  className={SAStyles.superAdminMiddleCardCircle1Style}>
                    {' '}
                    <img src={circle1} alt="" />
                  </div>
                  <div       className={SAStyles.titlePriceStyle}>
                    <p className={SAStyles.titleStyle}>Organisations</p>
                    <p className={SAStyles.priceStyle}>{orgCount}</p>
                  </div>
                </div>

                <div className={SAStyles.flowImageParentDiv}>
                  <img src={flow} alt="" className={SAStyles.flowImageStyle} />
                  <img
                    src={flowImage2}
                    alt=""
                    className={SAStyles.flowBelowImageStyle}
                  />
                </div>
              </div>

              <div
                className={SAStyles.superAdminMiddleCardStyle}
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div style={{ display: 'flex' }}>
                  <div className={SAStyles.superAdminMiddleCardCircle1Style}>
                    {' '}
                    <img src={circle2} alt="" />
                  </div>
                  <div className={SAStyles.titlePriceStyle}>
                    <div className={SAStyles.titleStyle}>
                      <p>Documents Uploaded</p>
                    </div>
                    <div>
                      <p className={SAStyles.priceStyle}>{docCount}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <img src={flow} alt="" className={SAStyles.flowImageStyle} />
                  <img
                    src={flowImage2}
                    alt=""
                    className={SAStyles.flowBelowImageStyle}
                  />
                </div>
              </div>
            </div>
          )}


        {userRole !== 'SUPER_ADMIN' &&
        <div className="hi-main">
          <div className="orgadminchat-chat-content-head">
            <div className="orgadminchat-chat-content" > 
                <div className={Styles.questionAndAnswerContainer}>
                  {/* {hideChatInitialPage && (
                    <div style={{display:'flex'}}>
                      <Card
                        className={Styles.superAdminCardStyles}
                        style={{ overflowY: 'auto',height:'80vh'}}
                      >
                        {questionAndAnswer &&
                          questionAndAnswer.length > 0 &&
                          questionAndAnswer.map((item) => {
                            return (
                              <div>
                                <div className={Styles.questionContainer}>
                                  <Image
                                    className={Styles.answerImageContainer}
                                    src={profileSrc}
                                    alt=""
                                  />
                                  <div className={Styles.name}>You</div>
                                </div>
                                <div 
                                className={Styles.responseContainer}
                                >
                                  <div>
                                      <div
                                        className={Styles.chatBubble}
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'flex-start',
                                          // backgroundColor:'yellow',
                                          textAlign: 'left',
                                        }}
                                      >
                                        {item.question}{' '}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={Styles.questionContainer}>
                                    <div
                                      className={Styles.questionImageContainer}
                                    >
                                      <div>A</div>
                                    </div>
                                    <div className={Styles.name}>AM-Chat</div>
                                  </div>
                                  <div className={Styles.responseContainer}>
                                    <div
                                      className={Styles.chatBubble}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                      }}
                                    >
                                      {item?.answer}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          <div ref={endRef} />
                        </Card>
                      </div>
                    )} */}
                    {!hideChatInitialPage && (
                      <div className="orgadminchat-chat-ui-text">
                        <div className="orgadminchat-chat-ui-am-chat-text">
                          <p>
                            AM-Chat{' '}
                            <img
                              className="orgchat-icon"
                              src={orgvector}
                              alt=""
                            />
                          </p>
                        </div>
                      </div>
                    )}
                    <div
                      className={
                        userRole === 'USER' || userRole === 'SUPER_ADMIN'
                          ? 'footer_for_user'
                          : 'footer_for_admin'
                      }
                      
                    >
                  {hideChatInitialPage && (
                    <div >
                      <Card
                        className={Styles.superAdminCardStyles}
                        style={{ overflowY: 'auto',height:'72vh'}}
                      >
                        {questionAndAnswer &&
                          questionAndAnswer.length > 0 &&
                          questionAndAnswer.map((item) => {
                            return (
                              <div>
                                <div className={Styles.questionContainer}>
                                  <Image
                                    className={Styles.answerImageContainer}
                                    src={profileSrc}
                                    alt=""
                                  />
                                  <div className={Styles.name}>You</div>
                                </div>
                                <div 
                                className={Styles.responseContainer}
                                >
                                  <div>
                                      <div
                                        className={Styles.chatBubble}
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'flex-start',
                                          // backgroundColor:'yellow',
                                          textAlign: 'left',
                                        }}
                                      >
                                        {item.question}{' '}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={Styles.questionContainer}>
                                    <div
                                      className={Styles.questionImageContainer}
                                    >
                                      <div>A</div>
                                    </div>
                                    <div className={Styles.name}>AM-Chat</div>
                                  </div>
                                  <div className={Styles.responseContainer}>
                                    <div
                                      className={Styles.chatBubble}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                      }}
                                    >
                                      {item?.answer}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          <div ref={endRef} />
                        </Card>
                      </div>
                    )}
                      {!hideChatInitialPage && (
                        <div className="orgadminchat-chat-hello-text">
                          <h2>Hello, I’m AM-Chat</h2>
                          <p>How can I help you today?</p>
                        </div>
                      )}
                      {!hideChatInitialPage && (
                        <div className="example_main_div">
                          {contentArray.map((content, index) => (
                            <p
                              key={index}
                              className="card_message_example"
                              onClick={() => handleQuestionClick(content)}
                            >
                              {content}
                            </p>
                          ))}
                        </div>
                      )}
                      <div className={'AIChatInputBox'}>
                        <ChatSearch
                          name={'Ask anything..'}
                          style={'searchStyles'}
                          searchImage={Group2290}
                          onSearchImageClick={arrowButton}
                          readOnly={false}
                          chat={chat}
                          setChat={setChat}
                          setAdjustChatHeight={setAdjustChatHeight}
                          adjustChatHeight={adjustChatHeight}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {rightSideDashBoard && (
                  <div className="hi">
                    <div className="orgadminchat-orgadmin-cards">
                      <div className="orgadminchat-orgadmindoc-card">
                        <div className="activeuser-vectorimage">

                        <div style={{cursor:'pointer'}} onClick={()=>{
                            if(getUserType()===constants.OrgAdminAccount)
                            { 
                              window.location.href="documents"
                            }
                          
                          }} className="orgadminchat-orgadmindocument-card">
                            <img
                              className="orgadminchat-document-icon"
                              src={documentIcon}
                              alt="Document"
                            />
                            <h2>Documents</h2>
                            <h1 className="document-value">{documentCount}</h1>
                          </div> 
                          <div className="vector-card-image">
                            <img
                              className="vector-image-activeuser"
                              src={vector}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div  className="orgadmin-vectorimage">
                        <div 
                        style={{cursor:'pointer'}} onClick={()=>{
                  
                          if(getUserType()===constants.OrgAdminAccount)
                          {     window.location.href="users"
                            
                          }
                        }}

                         className="orgadminchat-orgadmin-activeuser-card">
                          <img
                            className="orgadminchat-activeuser-icon"
                            src={documentIconpink}
                            alt="Document"
                          />
                          <h2>Active Users</h2>
                          <h1 className="activeusers-value">
                            {activeUsersCount}
                          </h1>{' '}
                          {/* Display active users count */}
                        </div>
                        <div className="vector-card-image">
                          <img
                            className="vector-image-activeuser"
                            src={vector}
                            alt=""
                          />
                        </div>
                      </div>

                      {/* <div className="orgadmin-activeuser-card">
                    
                      <div className="user-table">
                      <span>Active Users</span>
                      <div className="divider"></div>
                        {users.map((user, index) => (
                          <div key={index} style={{marginTop: '0px'}}>
                            <img className="orgadmin-profile-pic" src={base} />
                            <span className='name-text'>{user.username}</span>
                            <td className="orgadmin-lastseen">
                              {user.lastseen}
                            </td>
                            <div className="divider"></div>
                          </div>
                        ))}
                      </div>
                    </div> */}

                      <div className="activeuser-dashboard">
                        <div className="title-container">
                          {/* <span className='title-text'>Active Users</span> */}
                          <span className="title-text">
                            Organisation Chat Session
                          </span>
                        </div>
                        <div className="divider"></div>
                        {activeUserList.map((user, index) => {
                          const imagePath = user?.imageUrl
                            ? `${BASE_USER_IMAGE_URL}${user?.imageUrl}`
                            : profilePlaceholder;
                          return (
                            <div key={index} className="content-container">
                              <div>
                                <img className="user-pic" src={imagePath} />
                              </div>
                              <div className="content-bg">
                                <span className="name-text">{user.name}</span>
                                <br />
                                <span className="lastseen-text">{`Last session Time: ${timeExtracter(
                                  user.lastChatTime
                                )}`}</span>
                              </div>
                              <div className="divider"></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default OrgAdminChatPage;
