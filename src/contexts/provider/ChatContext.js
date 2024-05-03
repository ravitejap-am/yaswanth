// ChatContext.js

import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { CHAT_GETSESSION } from '../../constants/Constant'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'
import { getSessionList } from '../../apiCalls/ApiCalls'
import { segregateSessions } from '../../utils/dateSeggrigation'
import { scopes } from '../../constants/scopes'
import { tokenDecodeJWT } from '../../utils/authUtils'

const ChatContext = createContext()
const tempData = [
    'CHU',
    'CHR',
    'CHD',
    'CHC',
    'UU',
    'UR',
    'UD',
    'UC',
    'DCQR',
    'DCR',
]

export const ChatProvider = ({ children }) => {
    const user = useSelector(selectUser)
    const jwt = user?.userToken
    const permittedScopes = tokenDecodeJWT(jwt)?.scopes
    // const permittedScopes = tempData;
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [isNewChat, setIsNewChat] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState([])
    const [messageSent, setMessageSent] = useState(false)
    const [sessionId, setSessionId] = useState('')
    const [pageLoading, setPageLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [sessionHistory, setSessionHistory] = useState({})

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
                console.log('response data of chat session', response)
            })
            .catch((error) => console.error(error))
    }

    const fetchSessionList = async () => {
        if (permittedScopes?.includes(scopes.CHR)) {
            try {
                const headers = { Authorization: `Bearer ${jwt}` }
                console.log('headers---->', headers)
                const response = await getSessionList(headers)
                const fetchChatSessions = response?.data?.data
                console.log('fetchChatSessions---->', fetchChatSessions)
                const modifyData = fetchChatSessions.map((data) => {
                    return {
                        session_title: data?.session_title.split(':')[4],
                        // data: [],
                        id: data?.id,
                    }
                })
                setChatHistory(modifyData)

                const segregatedData = segregateSessions(fetchChatSessions)
                setSessionHistory(segregatedData)
                console.log('seggrigationData', segregatedData)
            } catch (error) {
                console.log('error in fetching session list', error)
            }
        }
    }

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
                pageLoading,
                setPageLoading,
                setSessionId,
                fetchSessionList,
                setInputValue,
                inputValue,
                sessionHistory,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}
