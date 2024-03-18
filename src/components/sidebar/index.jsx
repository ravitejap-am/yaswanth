import React from 'react';

import { Box, Hidden, Typography } from '@mui/material';

import { sideBar } from './sidebar';

import { selectUser } from '../../store/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokenDecodeJWT } from '../../utils/authUtils';
import './sidebarIndex.css';
function Sidebar() {
  const { userToken } = useSelector(selectUser);
  const { pathname } = useLocation();
  const { role } = tokenDecodeJWT(userToken);
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
          {sideBar(role, pathname)}
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
