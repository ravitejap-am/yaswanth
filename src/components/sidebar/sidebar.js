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
    link: '/user',
    activeLinks: ['user'],
  },
];

const navLinks = {
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
  setVisible
) => {
  const handleAddChat = () => {
    setChatHistory([
      ...chatHistory,
      {
        title: 'chat one title for chat adress',
        data: [],
        id: chatHistory.length + 1,
      },
    ]);
    setIsChatOpen(!isChatOpen);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      {console.log('pathname', pathname)}
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
                padding: '4px',
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
      <></>
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
              <Typography variant="h6">Chats</Typography>
              <Box
                sx={{
                  height: '45%',
                  overflowY: 'auto',
                }}
                className="chat_history"
              >
                {chatHistory.map((item) => (
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
                    >
                      {item?.title}
                    </p>
                    {/* </Tooltip> */}

                    {/* <ChatMenuItems /> */}
                  </div>
                ))}
              </Box>
            </Hidden>
            <Hidden lgUp>
              <Drawer
                title={<p style={{ color: 'white' }}>Menu</p>}
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
                  {chatHistory.map((item, index) => (
                    <Menu.Item
                      key={index}
                      onClick={() => {
                        // item.onClick();
                        // onClose();
                      }}
                    >
                      {item.title}
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
