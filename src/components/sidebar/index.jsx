import React from 'react';
import { Home, Movie, Bookmark } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Box, Hidden, Typography } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import Chat from '@mui/icons-material/Chat';

const navLinks = [
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

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        padding: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: {
          xs: 'row',
          lg: 'column',
        },
        alignItems: 'cente',
        justifyContent: 'space-between',
        width: {
          sm: '100%',
          lg: 200,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'row',
            lg: 'column',
          },
          gap: 5,
          alignItems: {
            xs: 'center',
            ls: 'start',
          },
          width: '100%',
        }}
      >
        <Hidden smDown>
          <Typography variant="h5" my={2} fontWeight={400} fontSize={18}>
            Am_chat
          </Typography>
        </Hidden>
        <Box
          sx={{
            py: {
              xs: '0px',
              ls: '16px',
            },
            display: 'flex',
            flexDirection: {
              xs: 'row',
              lg: 'column',
            },
            gap: 4,
          }}
        >
          {navLinks.map((item) => {
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
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
