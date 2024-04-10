// ChatContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CHAT_GETSESSION } from '../../constants/Constant';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const user = useSelector(selectUser);
  const jwt = user?.userToken;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [sessionId, setSessionId] = useState("")


  // useEffect(() => {
  //   console.log("use effect is called");
  //   setQuestionIndex(0)
  //   setQuestions([])
  // },[])

  const getSessions = () => {
    axios
      .get(CHAT_GETSESSION, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log('response data of chat session', response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        chatHistory,
        setChatHistory,
        isNewChat,
        setIsNewChat,
        questionIndex,
        setQuestionIndex,
        questions,
        setQuestions,
        messageSent,
        setIsNewChat, 
        setMessageSent,
        messageSent,
        sessionId,
        setSessionId
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
