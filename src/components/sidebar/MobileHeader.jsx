import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { Layout, Menu, Grid, Drawer } from 'antd';
import { navLinks } from './sidebar';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getChatSessions } from '../../apiCalls/ApiCalls';

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
  } = props;
  console.log('role', role, 'patname', pathname);
  const [visible, setVisible] = useState(false);
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleAddChat = () => {
    if (isNewChat) {
      setChatHistory([
        ...chatHistory,
        {
          session_title: 'chat one title for chat adress ',
          data: [],
          id: chatHistory.length + 1,
        },
      ]);
      setIsChatOpen(!isChatOpen);
      setMessageSent(false);
      setIsNewChat(false);
      setQuestionIndex(0);
      setQuestions([]);
      onClose();
    }
    console.error('please add the chat');
    onClose();
  };
  const showPreviousChats = async (id) => {
    onClose();
    try {
      console.log('previous chats id---->', id);
      const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await getChatSessions(headers, id);
      console.log('response--->', response);
      setSessionHandler(id);
    } catch (error) {
      console.log('throwing error in chat');
      const response = {
        data: [
          {
            created_at: 'Mon, 25 Mar 2024 10:54:30 GMT',
            doc_name: 'Invoice-899B3FD6-0001.pdf',
            id: 3,
            query: 'When is it due?',
            response: 'It is due on March 7, 2023.',
          },
          {
            created_at: 'Mon, 25 Mar 2024 10:54:12 GMT',
            doc_name: 'Invoice-899B3FD6-0001.pdf',
            id: 2,
            query: 'When is it due?',
            response: 'The amount is due on March 7, 2023.',
          },
        ],
        pagination: {
          page: 1,
          per_page: 10,
          total_count: 2,
          total_pages: 1.2,
        },
      };

      const modifiedData = response?.data;
      const changedData = modifiedData.map((data, index) => {
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
      setSessionHandler(id);
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <ListIcon sx={{ fontSize: 40 }} onClick={onOpen} />
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
