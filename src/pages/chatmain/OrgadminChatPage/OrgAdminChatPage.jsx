import React, { useEffect, useState } from 'react';
import './OrgAdminChatPage.css';
import arrow from '../../../asset/inputarrow.png';
import documentIcon from '../../../asset/Group 23 (1).png';
import base from '../../../asset/Base.png';
import vector from '../../../asset/vectoricon.png';
import documentIconpink from '../../../asset/Group 23.png';
import orgvector from '../../../asset/orgVector (1).png';
import AMChatHeader from '../../AMChatAdmin/AMChatHeader/AMChatHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as constants from '../../../constants/Constant';
import { selectUser } from '../../../store/authSlice';
import OrganizationAdminHeader from '../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader';
import Search from '../../../components/common/search/Search';
import Group2290 from '../../../asset/Group2290.png';
import ChatSearch from '../../../components/common/chatSearch/ChatSearch';

const OrgAdminChatPage = (props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
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
  const [chat, setChat] = useState('');
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

  // useEffect(() => {
  //   // Retrieve firstName from localStorage
  //   const storedFirstName = localStorage.getItem("firstNameOrganisation");
  //   setFirstName(storedFirstName);
  // }, []);

  useEffect(() => {
    if (organisationId) {
      fetchDocumentCount();
      fetchUserList();
      fetchUserProfile();
    }
  }, [organisationId]);

  const fetchDocumentCount = () => {
    fetch(`${constants.BASE_DOC_API_URL}/${organisationId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDocumentCount(data.totalElements);
      })
      .catch((error) => console.error('Error fetching document count:', error));
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
        } else if (response.status === 405) {
          console.log('response 405');
        } else {
          console.log('response 405');
        }
        return;
      }
      const responseData = await response.json();

      setActiveUsersCount(responseData.totalElements); // Set active users count from the API response
    } catch (error) {
      navigate('/maintenance');
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
      localStorage.setItem(
        'firstNameOrganisation',
        userData?.data?.user?.firstName
      );
      localStorage.setItem(
        'lastNameOrganisation',
        userData?.data?.user?.lastName
      );

      setUserData(userData?.data?.user);
      setOrganisationName(userData?.data?.organisation?.name);
      setamChatUserStatus(userData?.data?.user.active);
      setFirstName(userData?.data?.user?.firstName);

      setUserStatus(userData.data.user.active ? 'Active' : 'Inactive');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile.');
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

  const arrowButton = () => {
    console.log('arrowButton clicked');
    navigate('/chatOrgAdmin', { state: { params: chat } });
  };

  return (
    <div className="orgadminchat-screen">
      <div className="orgadminchat-chat-container">
        <div className="orgadminchat-chat-header">
          <OrganizationAdminHeader
            componentName={`Welcome ${firstName || ''}`}
            name={firstName || ''}
            profileImageSrc={base}
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
                fontWeight: '500',
                fontSize: '24px',
              },
            }}
          />
        </div>
        <div className="hi-main">
          <div className="orgadminchat-chat-content-head">
            <div className="orgadminchat-chat-content">
              <div>
                <div className="orgadminchat-chat-ui-text">
                  <div className="orgadminchat-chat-ui-am-chat-text">
                    <p>
                      AM-Chat{' '}
                      <img className="orgchat-icon" src={orgvector} alt="" />
                    </p>
                  </div>
                </div>
                <div className="footer">
                  <div className="orgadminchat-chat-hello-text">
                    <h2>Hello, I’m AM-Chat</h2>
                    <p>How can I help you today?</p>
                  </div>

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
                  <div className={'AIChatInputBox'}>
                    <ChatSearch
                      name={'Ask anything..'}
                      style={'searchStyles'}
                      searchImage={Group2290}
                      onSearchImageClick={arrowButton}
                      readOnly={false}
                      chat={chat}
                      setChat={setChat}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hi">
              <div className="orgadminchat-orgadmin-cards">
                <div className="orgadminchat-orgadmindoc-card">
                  <div className="activeuser-vectorimage">
                    <div className="orgadminchat-orgadmindocument-card">
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
                <div className="orgadmin-vectorimage">
                  <div className="orgadminchat-orgadmin-activeuser-card">
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

                <div className="orgadmin-activeuser-card">
                  <div className="user-table">
                    {users.map((user, index) => (
                      <div key={index}>
                        <img className="orgadmin-profile-pic" src={base} />
                        {user.username}
                        <td className="orgadmin-lastseen">{user.lastseen}</td>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgAdminChatPage;
