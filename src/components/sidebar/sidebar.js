import React from 'react';
import { Box, Hidden, Typography } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import Chat from '@mui/icons-material/Chat';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Link } from 'react-router-dom';
import ChatMenuItems from './ChatMenuItems';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import './sidebarIndex.css';
import { Layout, Menu, Grid, Drawer } from 'antd';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { getChatSessions } from '../../apiCalls/ApiCalls';

const ORG_ADMIN = [
  {
    name: 'Dashboard',
    icon: <Dashboard />,
    link: '/dashboard',
    activeLinks: ['dashboard'],
  },
  {
    name: 'Users',
    icon: <PeopleIcon />,
    link: '/users',
    activeLinks: ['users', 'adduser', 'user'],
  },
  {
    name: 'Documents',
    icon: <DescriptionIcon />,
    link: '/documents',
    activeLinks: ['documents', 'document'],
  },
  {
    name: 'Chat',
    icon: <Chat />,
    link: '/chat',
    activeLinks: ['chat'],
  },
];

const SUPER_ADMIN = [
  {
    name: 'Dashboard',
    icon: <Dashboard />,
    link: '/dashboard',
    activeLinks: ['dashboard'],
  },
  {
    name: 'Organisations',
    icon: <CorporateFareIcon />,
    link: '/organisations',
    activeLinks: ['organisations', 'organisation'],
  },
];
const USER = [
  {
    name: 'Chat',
    icon: <Chat />,
    link: '/chat',
    activeLinks: ['chat'],
  },
];

export const navLinks = {
  ORG_ADMIN: ORG_ADMIN,
  SUPER_ADMIN: SUPER_ADMIN,
  USER: USER,
};

export const sideBar = (
  role,
  pathname,
  chatHistory,
  setChatHistory,
  setIsChatOpen,
  isChatOpen,
  screens,
  visible,
  setVisible,
  isNewChat,
  setIsNewChat,
  setSessionHandler,
  questionIndex,
  setQuestionIndex,
  questions,
  setQuestions,
  user,
  jwt,
  messageSent,
  setMessageSent
) => {
  const handleAddChat = () => {
    if (isNewChat) {
      setChatHistory([
        ...chatHistory,
        {
          session_title: 'chat one title for chat adress',
          data: [],
          id: chatHistory.length + 1,
        },
      ]);
      setIsChatOpen(!isChatOpen);
      setMessageSent(false);
      setIsNewChat(false);
      setQuestionIndex(0);
      setQuestions([]);
    }
    console.error('please add the chat');
  };
  const onClose = () => {
    setVisible(false);
  };

  const showPreviousChats = async (id) => {
    try {
      console.log('previous chats id---->', id);
      const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await getChatSessions(headers, id);
      console.log('response--->', response);
      setSessionHandler(id);
    } catch (error) {
      console.log('throwing error in chat');
      const response = {
        data: [
          {
            created_at: 'Mon, 25 Mar 2024 10:54:30 GMT',
            doc_name: 'Invoice-899B3FD6-0001.pdf',
            id: 3,
            query: 'When is it due?',
            response: 'It is due on March 7, 2023.',
          },
          {
            created_at: 'Mon, 25 Mar 2024 10:54:12 GMT',
            doc_name: 'Invoice-899B3FD6-0001.pdf',
            id: 2,
            query: 'When is it due?',
            response: 'The amount is due on March 7, 2023.',
          },
        ],
        pagination: {
          page: 1,
          per_page: 10,
          total_count: 2,
          total_pages: 1.2,
        },
      };

      const modifiedData = response?.data;
      const changedData = modifiedData.map((data, index) => {
        return {
          questionId: index,
          question: data?.query,
          answer: data?.response,
          answerData: true,
        };
      });
      console.log('changed data--->', changedData);
      setQuestionIndex(changedData?.length);
      setQuestions(changedData);
      setMessageSent(true);
      setSessionHandler(id);
    }
  };

  return (
    <>
      {navLinks[role]?.map((item) => {
        const isActive = pathname === item.link;
        return (
          <Link
            key={item.name}
            to={item.link}
            style={{ textDecoration: 'none' }}
            className="hoverDiv"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'white',
                textDecoration: 'none',
                padding: '8px',
              }}
            >
              {React.cloneElement(item.icon, {
                style: {
                  color: item?.activeLinks.includes(pathname.split('/')[1])
                    ? '#4F46E5'
                    : 'white',
                },
              })}
              <Hidden mdDown>
                <Typography>{item.name}</Typography>
              </Hidden>
            </Box>
          </Link>
        );
      })}
      {(role == 'ORG_ADMIN' || role == 'USER') &&
        (pathname == '/chat' || pathname == '/user') && (
          <Link
            to="/chat"
            style={{ textDecoration: 'none' }}
            className="hoverDiv"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                padding: '8px',
              }}
              onClick={handleAddChat}
            >
              <AddIcon style={{ color: 'white' }} />
              <Hidden mdDown>
                <Typography>New Chat</Typography>
              </Hidden>
            </Box>
          </Link>
        )}
      {(role == 'ORG_ADMIN' || role == 'USER') &&
        (pathname == '/chat' || pathname == '/user') && (
          <Hidden lgUp>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'white',
                textDecoration: 'none',
                padding: '8px',
              }}
              onClick={() => {
                setVisible(true);
              }}
            >
              <WorkHistoryIcon color="white" />
            </Box>
          </Hidden>
        )}

      {(role == 'ORG_ADMIN' || role == 'USER') &&
        (pathname == '/chat' || pathname == '/user') && (
          <>
            <Hidden lgDown>
              <Typography variant="h6">Sessions</Typography>
              <Box
                sx={{
                  height: '45%',
                  overflowY: 'auto',
                }}
                className="chat_history"
              >
                {console.log('chat history', chatHistory)}
                {chatHistory.length > 0 &&
                  chatHistory?.map((item) => (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '4px',
                      }}
                      className="hoverDiv"
                    >
                      {/* <Tooltip title={item?.title}> */}
                      <p
                        style={{
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '8em',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          showPreviousChats(item.id);
                        }}
                      >
                        {item?.session_title}
                      </p>
                      {/* </Tooltip> */}

                      {/* <ChatMenuItems /> */}
                    </div>
                  ))}
              </Box>
            </Hidden>
            <Hidden lgUp>
              <Drawer
                title={<p style={{ color: 'white' }}>Sessions</p>}
                placement="left"
                closable={true}
                onClose={onClose}
                open={visible}
                mask
                style={{
                  background:
                    'linear-gradient(114deg,#0f172a 51.52%,#152346 73.32%,#1a2e5e 92.75%)',
                }}
              >
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={['Home_page']}
                >
                  {chatHistory.length > 0 &&
                    chatHistory.map((item, index) => (
                      <Menu.Item
                        key={index}
                        onClick={() => {
                          showPreviousChats(item.id);
                          // setSessionHandler(item.id);
                        }}
                      >
                        {item.session_title}
                      </Menu.Item>
                    ))}
                </Menu>
              </Drawer>
            </Hidden>
          </>
        )}
    </>
  );
};
