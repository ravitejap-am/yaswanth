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

const ORG_ADMIN = [
  {
    name: 'Dashboard',
    icon: <Dashboard />,
    link: '/dashboard',
  },
  {
    name: 'Users',
    icon: <PeopleIcon />,
    link: '/users',
  },
  {
    name: 'Documents',
    icon: <DescriptionIcon />,
    link: '/documents',
  },
  {
    name: 'Chat',
    icon: <Chat />,
    link: '/chat',
  },
];

const SUPER_ADMIN = [
  {
    name: 'Dashboard',
    icon: <Dashboard />,
    link: '/dashboard',
  },
  {
    name: 'Organisations',
    icon: <CorporateFareIcon />,
    link: '/organisations',
  },
];
const USER = [
  {
    name: 'Chat',
    icon: <Chat />,
    link: '/user',
  },
];

const navLinks = {
  ORG_ADMIN: ORG_ADMIN,
  SUPER_ADMIN: SUPER_ADMIN,
  USER: USER,
};

export const sideBar = (role, pathname, chatHistory, setChatHistory) => {
  const handleAddChat = () => {
    setChatHistory([
      ...chatHistory,
      {
        title: 'chat one title for chat adress',
        data: [],
        id: chatHistory.length + 1,
      },
    ]);
    // setChatHistory((prevhistory) => {
    //   prevhistory.push({
    //     title: 'chat one title for chat adress',
    //     data: [],
    //     id: prevhistory.length + 1,
    //   });
    //   console.log(prevhistory);
    //   return prevhistory;
    // });
  };
  return (
    <>
      {role == 'ORG_ADMIN' && pathname == '/chat' && (
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
          className="hoverDiv"
          onClick={handleAddChat}
        >
          <AddIcon style={{ color: 'white' }} />
          <Hidden mdDown>
            <Typography>New Chat</Typography>
          </Hidden>
        </Box>
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
                padding: '4px',
              }}
            >
              {React.cloneElement(item.icon, {
                style: { color: isActive ? '#4F46E5' : 'white' },
              })}
              <Hidden mdDown>
                <Typography>{item.name}</Typography>
              </Hidden>
            </Box>
          </Link>
        );
      })}

      {role == 'ORG_ADMIN' && pathname == '/chat' && (
        <Hidden mdDown>
          <Typography variant="h6">Chats</Typography>
          <Box
            sx={{
              height: '46%',
              overflowY: 'auto',
            }}
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
                    width: '10em',
                    cursor: 'pointer',
                  }}
                >
                  {item?.title}
                </p>
                {/* </Tooltip> */}

                <ChatMenuItems />
              </div>
            ))}
          </Box>
        </Hidden>
      )}
    </>
  );
};
