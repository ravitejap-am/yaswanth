import React from 'react';
import { Home, Movie, Bookmark } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
const navLinks = [
  {
    name: 'Home',
    icon: Home,
    link: '/home',
  },
  {
    name: 'Movies',
    icon: Movie,
    link: '/movies',
  },
  {
    name: 'Bookmarks',
    icon: Bookmark,
    link: '/bookmark',
  },
];

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        backgroundColor: '#161d2f',
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
    ></Box>
  );
}

export default Sidebar;
