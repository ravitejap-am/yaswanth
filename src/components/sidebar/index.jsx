import React, { useEffect, useState } from 'react';

import { Box, Hidden, Typography } from '@mui/material';

import { sideBar } from './sidebar';
import sidebarImg from '../../asset/images/logo.png';
import {
  selectUser,
  selectSessionId,
  setChatSessionId,
} from '../../store/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokenDecodeJWT } from '../../utils/authUtils';
import { useChat } from '../../contexts/provider/ChatContext';
import { Layout, Menu, Grid, Drawer } from 'antd';
import { UseDispatch } from 'react-redux';


function Sidebar() {
  const { useBreakpoint } = Grid;
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const { userToken } = useSelector(selectUser);
  const { pathname } = useLocation();
  const { role } = tokenDecodeJWT(userToken);
  const {
    isChatOpen,
    setIsChatOpen,
    chatHistory,
    setChatHistory,
    isNewChat,
    setIsNewChat,
    questionIndex, 
    setQuestionIndex, 
    questions, 
    setQuestions ,
    messageSent,
    setMessageSent
  } = useChat();

  const [visible, setVisible] = useState(false);
  const user = useSelector(selectUser);
  const jwt = user.userToken;


  const setSessionHandler = (id) => {
    dispatch(setChatSessionId(id));
  };

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
        <Hidden lgDown>
          <Link to={role == 'USER' ? '/user' : '/dashboard'}>
            <img src={sidebarImg} alt="" height={40} />
          </Link>
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
          {sideBar(
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
            jwt , 
            messageSent, 
            setMessageSent
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
