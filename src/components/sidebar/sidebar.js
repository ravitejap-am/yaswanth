import React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Box, Hidden, Typography } from '@mui/material'
import Dashboard from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import PeopleIcon from '@mui/icons-material/People'
import Chat from '@mui/icons-material/Chat'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import { Link } from 'react-router-dom'
import ChatMenuItems from './ChatMenuItems'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import './sidebarIndex.css'
import { Layout, Menu, Grid, Drawer } from 'antd'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import {
    getIndividualChatSessions,
    getSessionList,
} from '../../apiCalls/ApiCalls'
import { scopes } from '../../constants/scopes'

const ORG_ADMIN = [
    {
        name: 'Dashboard',
        icon: <Dashboard />,
        link: '/dashboard',
        activeLinks: ['dashboard'],
    },
    {
        name: 'Users',
        icon: <PeopleIcon />,
        link: '/users',
        activeLinks: ['users', 'adduser', 'user'],
    },
    {
        name: 'Documents',
        icon: <DescriptionIcon />,
        link: '/documents',
        activeLinks: ['documents', 'document'],
    },
    {
        name: 'Chat',
        icon: <Chat />,
        link: '/chat',
        activeLinks: ['chat'],
    },
]

const SUPER_ADMIN = [
    {
        name: 'Dashboard',
        icon: <Dashboard />,
        link: '/dashboard',
        activeLinks: ['dashboard'],
    },
    {
        name: 'Organisations',
        icon: <CorporateFareIcon />,
        link: '/organisations',
        activeLinks: ['organisations', 'organisation'],
    },
]
const USER = [
    {
        name: 'Chat',
        icon: <Chat />,
        link: '/user',
        activeLinks: ['chat'],
    },
]

const ORG_ADMIN_TWO = [
    {
        name: 'Dashboard',
        icon: <Dashboard />,
        link: '/dashboard',
        activeLinks: ['dashboard'],
    },
    {
        name: 'Users',
        icon: <PeopleIcon />,
        link: '/users',
        activeLinks: ['users', 'adduser', 'user'],
    },
    {
        name: 'Documents',
        icon: <DescriptionIcon />,
        link: '/documents',
        activeLinks: ['documents', 'document'],
    },
]

export const CHAT = [
    {
        name: 'Chat',
        icon: <Chat />,
        link: '/chat',
        activeLinks: ['chat'],
    },
]

export const navLinks = {
    ORG_ADMIN: ORG_ADMIN,
    SUPER_ADMIN: SUPER_ADMIN,
    USER: USER,
}

export const orgNavLinks = {
    DASHBOARD_NEXUS: ORG_ADMIN_TWO,
    CHAT: CHAT,
}

export const sideBar = (
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
    jwt,
    messageSent,
    setMessageSent,
    sessionId,
    fetchSessionList,
    pageLoading,
    setPageLoading,
    setSessionId,
    setInputValue,
    inputValue,
    sessionHistory,
    permitedScopes
) => {
    const handleAddChat = async () => {
        try {
            console.log('is new chat--->', isNewChat)
            setIsChatOpen(!isChatOpen)
            setMessageSent(false)
            setIsNewChat(false)
            setQuestionIndex(0)
            setQuestions([])
            setSessionId('')
            console.error('please add the chat')
        } catch (error) {
            console.log('error in fetching chat session list', error)
        }
    }
    const onClose = () => {
        setVisible(false)
    }

    const showPreviousChats = async (id) => {
        onClose()
        try {
            console.log('previous chats id---->', id)

            const headers = {
                Authorization: `Bearer ${jwt}`,
            }
            setPageLoading(true)
            const response = await getIndividualChatSessions(id, headers)

            console.log('response--->12', response)
            const modifiedData = response?.data
            const changedData = modifiedData?.data.map((data, index) => {
                return {
                    questionId: index,
                    question: data?.query,
                    answer: data?.response,
                    answerData: true,
                }
            })
            console.log('changed data--->', changedData)
            setQuestionIndex(changedData?.length)
            setQuestions(changedData)
            setMessageSent(true)
            setSessionId(id)
            setPageLoading(false)
            setIsNewChat(true)
            setInputValue('')
            // setSessionHandler(id);
        } catch (error) {
            console.log('throwing error in chat')
            setPageLoading(false)
        }
    }

    const sessionRendering = (data) => {
        return (
            <>
                {data?.map((item) => (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '4px',
                        }}
                        className="hoverDiv"
                    >
                        <p
                            style={{
                                margin: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '8em',
                                cursor: 'pointer',
                                color: 'black',
                                paddingTop: '0.5em',
                                // fontWeight: 500,
                            }}
                            onClick={() => {
                                showPreviousChats(item.id)
                            }}
                        >
                            {item?.session_title.split(':')[4]}
                        </p>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {role == 'ORG_ADMIN' ? (
                <>
                    <Hidden lgDown>
                        <Accordion sx={{ bgcolor: 'rgb(248, 250, 252)' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                    '&.MuiPaper-root-MuiAccordion-root': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                <Typography>Overview</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {orgNavLinks['DASHBOARD_NEXUS']?.map((item) => {
                                    const isActive = pathname === item.link
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
                                                        color: item?.activeLinks.includes(
                                                            pathname.split(
                                                                '/'
                                                            )[1]
                                                        )
                                                            ? '#4F46E5'
                                                            : 'black',
                                                    },
                                                })}

                                                <Typography
                                                    sx={{ color: 'black' }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </Link>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </Hidden>
                    <Hidden lgUp>
                        {navLinks[role]?.map((item) => {
                            const isActive = pathname === item.link
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
                                                color: item?.activeLinks.includes(
                                                    pathname.split('/')[1]
                                                )
                                                    ? '#4F46E5'
                                                    : 'black',
                                            },
                                        })}
                                        <Hidden mdDown>
                                            <Typography sx={{ color: 'black' }}>
                                                {item.name}
                                            </Typography>
                                        </Hidden>
                                    </Box>
                                </Link>
                            )
                        })}
                    </Hidden>
                </>
            ) : (
                <>
                    {navLinks[role]?.map((item) => {
                        const isActive = pathname === item.link
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
                                            color: item?.activeLinks.includes(
                                                pathname.split('/')[1]
                                            )
                                                ? '#4F46E5'
                                                : 'black',
                                        },
                                    })}
                                    <Hidden mdDown>
                                        <Typography sx={{ color: 'black' }}>
                                            {item.name}
                                        </Typography>
                                    </Hidden>
                                </Box>
                            </Link>
                        )
                    })}
                </>
            )}

            {role == 'USER' &&
                pathname == '/user' &&
                permitedScopes.includes(scopes.CHC) && (
                    <Link
                        to={'/user'}
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
                            <AddIcon style={{ color: 'black' }} />
                            <Hidden mdDown>
                                <Typography style={{ color: 'black' }}>
                                    New Chat
                                </Typography>
                            </Hidden>
                        </Box>
                    </Link>
                )}

            {role == 'ORG_ADMIN' && (
                <>
                    <Hidden lgUp>
                        {permitedScopes.includes(scopes.CHC) && (
                            <Link
                                to={role == '/chat'}
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
                                    <AddIcon style={{ color: 'black' }} />
                                    <Hidden mdDown>
                                        <Typography style={{ color: 'black' }}>
                                            New Chat
                                        </Typography>
                                    </Hidden>
                                </Box>
                            </Link>
                        )}
                    </Hidden>
                    <Hidden lgDown>
                        <Accordion sx={{ bgcolor: 'rgb(248, 250, 252)' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                    '&.MuiPaper-root-MuiAccordion-root': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                <Typography>Chat</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {orgNavLinks['CHAT']?.map((item) => {
                                    const isActive = pathname === item.link
                                    return (
                                        <>
                                            <Link
                                                key={item.name}
                                                to={item.link}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
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
                                                    {React.cloneElement(
                                                        item.icon,
                                                        {
                                                            style: {
                                                                color: item?.activeLinks.includes(
                                                                    pathname.split(
                                                                        '/'
                                                                    )[1]
                                                                )
                                                                    ? '#4F46E5'
                                                                    : 'black',
                                                            },
                                                        }
                                                    )}

                                                    <Typography
                                                        sx={{ color: 'black' }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            </Link>
                                            {permitedScopes.includes(
                                                scopes.CHC
                                            ) && (
                                                <Link
                                                    to={role == '/chat'}
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                    className="hoverDiv"
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 2,
                                                            color: 'white',
                                                            textDecoration:
                                                                'none',
                                                            cursor: 'pointer',
                                                            padding: '8px',
                                                        }}
                                                        onClick={handleAddChat}
                                                    >
                                                        <AddIcon
                                                            style={{
                                                                color: 'black',
                                                            }}
                                                        />
                                                        <Hidden mdDown>
                                                            <Typography
                                                                style={{
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                New Chat
                                                            </Typography>
                                                        </Hidden>
                                                    </Box>
                                                </Link>
                                            )}
                                        </>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </Hidden>
                </>
            )}
            {(role == 'ORG_ADMIN' || role == 'USER') &&
                (pathname == '/chat' || pathname == '/user') && (
                    <Hidden lgUp>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                color: 'white',
                                textDecoration: 'none',
                                padding: '8px',
                            }}
                            onClick={() => {
                                setVisible(true)
                            }}
                        >
                            <WorkHistoryIcon color="black" />
                        </Box>
                    </Hidden>
                )}

            {(role == 'ORG_ADMIN' || role == 'USER') &&
                (pathname == '/chat' || pathname == '/user') && (
                    <>
                        <Hidden lgDown>
                            <Typography variant="h6" sx={{ color: 'black' }}>
                                Sessions
                            </Typography>
                            <Box
                                sx={{
                                    height:
                                        role == 'ORG_ADMIN' ? '50%' : '100%',
                                    overflowY: 'auto',
                                }}
                                className="chat_history"
                            >
                                {sessionHistory['today']?.length > 0 && (
                                    <>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'gray' }}
                                        >
                                            Today
                                        </Typography>
                                        {sessionRendering(
                                            sessionHistory['today']
                                        )}
                                        <br />
                                    </>
                                )}

                                {sessionHistory['yesterday']?.length > 0 && (
                                    <>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'gray' }}
                                        >
                                            Yesterday
                                        </Typography>
                                        {sessionRendering(
                                            sessionHistory['yesterday']
                                        )}
                                        <br />
                                    </>
                                )}

                                {sessionHistory['past_7_days']?.length > 0 && (
                                    <>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'gray' }}
                                        >
                                            Previous 7 Days
                                        </Typography>
                                        {sessionRendering(
                                            sessionHistory['past_7_days']
                                        )}
                                        <br />
                                    </>
                                )}

                                {sessionHistory['past_30_days']?.length > 0 && (
                                    <>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'gray' }}
                                        >
                                            Previous 30 Days
                                        </Typography>
                                        {sessionRendering(
                                            sessionHistory['past_30_days']
                                        )}
                                    </>
                                )}
                                {/* {chatHistory.length > 0 &&
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
                      <p
                        style={{
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '8em',
                          cursor: 'pointer',
                          color: 'black',
                        }}
                        onClick={() => {
                          showPreviousChats(item.id);
                        }}
                      >
                        {item?.session_title}
                      </p>
                    </div>
                  ))} */}
                            </Box>
                        </Hidden>
                        <Hidden lgUp>
                            <Drawer
                                title={
                                    <p style={{ color: 'white' }}>Sessions</p>
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
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    defaultSelectedKeys={['Home_page']}
                                    selectedKeys={[]}
                                >
                                    {chatHistory.length > 0 &&
                                        chatHistory.map((item, index) => (
                                            <Menu.Item
                                                key={index}
                                                onClick={() => {
                                                    showPreviousChats(item.id)
                                                }}
                                            >
                                                {item.session_title}
                                            </Menu.Item>
                                        ))}
                                </Menu>
                            </Drawer>
                        </Hidden>
                    </>
                )}
        </>
    )
}
