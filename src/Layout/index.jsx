import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

function Layout({ children, componentName }) {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const { width, height } = getWindowDimensions();
  const calculatedHeight = `${height * 0.8}px`;

  const topRef = useRef(null);

  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleScrollToTop();
  }, []);

  return (
    <Box
      ref={topRef}
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
        color: 'white',
        // padding: 3,
        height: '100vh',
        overflowY: 'hidden',
        paddingLeft: 1,
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: '100%',
          overflowY: {
            xs: 'auto',
            md: 'auto',
            lg: 'auto',
          },

          color: 'black',
          height: '100*',
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
