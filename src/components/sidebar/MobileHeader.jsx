import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { Layout, Menu, Grid, Drawer } from 'antd';
import { navLinks } from './sidebar';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
  getChatSessions,
  getIndividualChatSessions,
} from '../../apiCalls/ApiCalls';

function MobileHeader(props) {
  const {
    role,
    pathname,
    setChatHistory,
    chatHistory,
    setIsChatOpen,
    isChatOpen,
    setMessageSent,
    setIsNewChat,
    setQuestionIndex,
    setQuestions,
    isNewChat,
    jwt,
    setSessionHandler,
    fetchSessionList,
    setPageLoading,
    pageLoading,
    setSessionId,
    sessionId,
  } = props;
  console.log('role', role, 'patname', pathname);
  const [visible, setVisible] = useState(false);
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleAddChat =async () => {
    try{
      onClose()
      console.log("is new chat--->",isNewChat);
      setIsChatOpen(!isChatOpen);
      setMessageSent(false);
      setIsNewChat(false);
      setQuestionIndex(0);
      setQuestions([]);
      setSessionId('');
      console.error('please add the chat');
    } catch (error) {
      console.log('error in fetching chat session list', error);
    }
  };

  const showPreviousChats = async (id) => {
    onClose();
    try {
      console.log('previous chats id---->', id);

      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
      setPageLoading(true);
      const response = await getIndividualChatSessions(id, headers);

      console.log('response--->12', response);
      const modifiedData = response?.data;
      const changedData = modifiedData?.data.map((data, index) => {
        return {
          questionId: index,
          question: data?.query,
          answer: data?.response,
          answerData: true,
        };
      });
      console.log('changed data--->', changedData);
      setQuestionIndex(changedData?.length);
      setQuestions(changedData);
      setMessageSent(true);
      setSessionId(id);
      setPageLoading(false);
      // setSessionHandler(id);
    } catch (error) {
      console.log('throwing error in chat');
      setPageLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        zIndex: 999,
      }}
    >
      <ListIcon sx={{ fontSize: 40, color: 'black' }} onClick={onOpen} />
      <Drawer
        title={
          <Typography variant="h5" sx={{ color: 'white' }}>
            Menu
          </Typography>
        }
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

                <Typography>{item.name}</Typography>
              </Box>
            </Link>
          );
        })}
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
                  padding: '8px',
                }}
                onClick={handleAddChat}
              >
                <AddIcon style={{ color: 'white' }} />

                <Typography>New Chat</Typography>
              </Box>
            </Link>
          )}
        {(role == 'ORG_ADMIN' || role == 'USER') &&
          (pathname == '/chat' || pathname == '/user') && (
            <>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Sessions
              </Typography>
              <Box
                sx={{
                  height: '45%',
                  overflowY: 'auto',
                }}
                className="chat_history"
              >
                {console.log('chat history', chatHistory)}
                {chatHistory.length > 0 &&
                  chatHistory?.map((item) => (
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
                          width: '100%',
                          cursor: 'pointer',
                          color: 'white',
                        }}
                        onClick={() => {
                          showPreviousChats(item.id);
                        }}
                      >
                        {item?.session_title}
                      </p>
                      {/* </Tooltip> */}

                      {/* <ChatMenuItems /> */}
                    </div>
                  ))}
              </Box>
            </>
          )}
      </Drawer>
    </Box>
  );
}

export default MobileHeader;
