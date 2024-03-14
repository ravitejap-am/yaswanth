import React from 'react';
import { Box, Hidden, Typography } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import Chat from '@mui/icons-material/Chat';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Link } from 'react-router-dom';

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
export const sideBar = (role, pathname) => {
  return (
    <>
      {navLinks[role]?.map((item) => {
        const isActive = pathname === item.link;
        return (
          <Link
            key={item.name}
            to={item.link}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'white',
                textDecoration: 'none',
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
    </>
  );
};
