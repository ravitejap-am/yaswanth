import React from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

function Layout({ children, componentName }) {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(114deg,#0f172a 51.52%, #152346 73.32%,#1a2e5e 92.75%)',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
        color: 'white',
        padding: 3,
        gap: 3,
        overflowY: 'hidden',
        height: '100vh',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: {
            lg: '95%',
            xs: '90%',
            md: '93%',
            xl: '95%',
          },
          overflowY: {
            xs: 'auto',
            md: 'auto',
            lg: 'auto',
          },
          backgroundColor: '#F8FAFC',
          borderRadius: 5,
          padding: 3,
          color: 'black',
          height: '92%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            // display: 'flex',
            // justifyContent: 'flex-end',
            // alignItems: 'center',
          }}
        >
          <Header componentName={componentName} />
          <br />
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
