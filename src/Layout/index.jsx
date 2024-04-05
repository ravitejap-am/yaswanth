import React, {useEffect, useState, useRef} from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

function Layout({ children, componentName }) {

  const topRef = useRef(null);

  const handleScrollToTop = () => {

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {
    handleScrollToTop()
  },[])
  

  return (
    <Box
    ref={topRef}
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
        height: '100vh' ,
        overflowY:'hidden'
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: {
            lg: '95%',
            xs: '88%',
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
          height: {
            lg: '88%',
            xs: '78%',
            md: '88%',
            xl: '88%',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
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
