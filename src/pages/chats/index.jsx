import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../Layout'
import { Box, Typography, Grid, useMediaQuery } from '@mui/material'
import { Button, Skeleton } from 'antd'
import styles from './Chats.module.css'
import { SendOutlined } from '@ant-design/icons'
import { useChat } from '../../contexts/provider/ChatContext'
import { getChatResponse, getQuestions } from '../../apiCalls/ApiCalls'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'
import { useLocation } from 'react-router-dom'
import Vector from '../../asset/Vector.png'
import * as constants from '../../constants/Constant'
import axios from 'axios'
import PageLoader from '../../components/loader/loader'
import AMChato from '../../asset/logo/logofinal.png'
import { useMessageState } from '../../hooks/useapp-message'
import { tokenDecodeJWT } from '../../utils/authUtils'
import { scopes } from '../../constants/scopes'
import NoDocumentError from '../../components/errors/NoDocumentError'
import { GrDocumentMissing } from 'react-icons/gr'
import DocumentSelection from './DocumentSelection'


function Chats() {
    const {
        isChatOpen,
        setIsChatOpen,
        isNewChat,
        setIsNewChat,
        questionIndex,
        setQuestionIndex,
        questions,
        setQuestions,
        messageSent,
        setMessageSent,
        sessionId,
        pageLoading,
        setPageLoading,
        setSessionId,
        fetchSessionList,
        setInputValue,
        inputValue,
    } = useChat()
    const userId = localStorage.getItem('userRole')
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [containerHeight, setContainerHight] = useState(0)
    const isMobile = useMediaQuery('(max-width:600px)')
    const scrollContainerRef = useRef(null)
    const user = useSelector(selectUser)
    const jwt = user.userToken
    const permittedScopes = tokenDecodeJWT(jwt).scopes
    const [searchOption, setSearchOption] = useState(
        permittedScopes?.includes(scopes.DCR)
            ? 'specificFileText'
            : 'acrossFiles'
    )
    const [errorMessage, setErrorMessage] = useState('')
    const defaultScroll = useRef(null)
    const location = useLocation()
    const pathName = location.pathname
    const userImageUrl = localStorage.getItem('userImageUrl')
    const [documents, setDocuments] = useState([])
    const [pageInfo, setPageInfo] = useState({
        pageSize: 10,
        page: 0,
        totalCount: null,
        totalPages: null,
    })
    const [defaultQuestions, setDefaultQuestions] = useState([])
    const isIos =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    let { isReset, setIsReset, showNotifyMessage, hideNotifyMessage } =
        useMessageState()

    const messageHandler = () => {
        setIsReset(false)
        hideNotifyMessage()
    }

    const noDocumentsErrorMsg =
        userId === 'ORG_ADMIN'
            ? 'Please upload relevant organisation documents.'
            : 'Please ask your admin to upload relevant organisation documents.'
    const errorMsgTitle = 'No documents found !'
    const noDocumentErrorIcon = <GrDocumentMissing size={35} />

    useEffect(() => {
        setQuestions([])
        setMessageSent(false)
        setQuestionIndex(0)
    }, [isChatOpen])

    useEffect(() => {
        if (
            permittedScopes?.includes(scopes.CHC) &&
            permittedScopes?.includes(scopes.DCR)
        ) {
            fetchDocuments()
        }
    }, [])

    useEffect(() => {
        if (pathName === '/user') {
            const disableBack = () => {
                window.history.pushState(null, '', window.location.href)
                window.onpopstate = () => {
                    window.history.pushState(null, '', window.location.href)
                }
            }
            disableBack()
            return () => {
                window.onpopstate = null
            }
        }
    }, [pathName])

    useEffect(() => {
        console.log('selected file---->', selectedFile)
        if (
            selectedFile?.id === '' ||
            selectedFile?.id === null ||
            typeof selectedFile?.id !== 'number'
        ) {
            setDefaultQuestions([])
        } else {
            if (permittedScopes?.includes(scopes.DCQR)) {
                fetchQuestions()
            } else {
                setDefaultQuestions([])
            }
        }
    }, [selectedFile])

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight
        }
    }

    const scrollToBottomForQuestions = () => {
        if (defaultScroll.current) {
            defaultScroll.current.scrollTop = defaultScroll.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [questions, loading])

    useEffect(() => {
        if (pathName === '/chat') {
            scrollToBottomForQuestions()
        }
    }, [pathName])

    const addNewChat = () => {
        setIsChatOpen(!isChatOpen)
        setMessageSent(false)
        setIsNewChat(false)
        setQuestionIndex(0)
        setQuestions([])
        setSessionId('')
    }

    const handleSearchOptionChange = (option) => {
        if (option === 'acrossFiles') {
            setShowWarning(true)
        } else {
            setSearchOption(option)
            setInputValue('')
            if (documents?.length > 0) {
                setSelectedFile({ ...documents[0] })
            }
            if (isNewChat) {
                addNewChat()
            }
        }
    }

    const handleFileChange = (newValue) => {
        if (isNewChat) {
            addNewChat()
        }
        setInputValue('')
        setSelectedFile(newValue)
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value
        const newLength = newValue.replace(/\s/g, '').length

        if (newLength <= 1000) {
            setInputValue(newValue)
            setErrorMessage('')
        } else {
            const allowedContent = newValue.substring(
                0,
                calculateLastIndexOfText(newValue, 1003)
            )
            setInputValue(allowedContent)
            setErrorMessage('Maximum 1000 characters allowed')
        }

        if (!messageSent) {
            setMessageSent(false)
        }
    }

    const calculateLastIndexOfText = (fullText, allowedLength) => {
        let i = 0
        let k = 0
        while (k <= allowedLength + 1) {
            if (fullText[i] !== ' ') {
                k = k + 1
            }
            i++
        }
        return i
    }

    const handleSend = async () => {
        let docName = ''
        if (
            selectedFile?.id &&
            typeof selectedFile?.id === 'number' &&
            searchOption === 'specificFileText'
        ) {
            docName = documents.filter((doc) => {
                if (doc.id === selectedFile?.id) {
                    return doc
                }
            })
        } else {
            if (searchOption === 'specificFileText') {
                showNotifyMessage('error', 'Please select file', messageHandler)
                return
            }
        }
        try {
            setLoading(true)
            if (inputValue.trim() !== '') {
                setIsNewChat(true)
                let modifyData = {
                    questionId: questionIndex,
                    question: inputValue,
                    answer: '',
                    answerData: false,
                }
                const body = {
                    doc_name: docName[0]?.name,
                    query: inputValue,
                    session_id: `${sessionId}`,
                    across: searchOption === 'specificFileText' ? false : true,
                }
                const headers = {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                }
                const updatedQuestionAndAnswer = [...questions, modifyData]
                setQuestions(updatedQuestionAndAnswer)
                setErrorMessage('')
                setMessageSent(true)
                const response = await getChatResponse(body, headers)
                updatedQuestionAndAnswer[questionIndex].answer =
                    response?.data?.response
                updatedQuestionAndAnswer[questionIndex].answerData = true
                setInputValue('')
                setQuestions(updatedQuestionAndAnswer)
                setQuestionIndex(questionIndex + 1)
                if (response?.data?.session_id) {
                    setSessionId(response?.data?.session_id)
                }
                if (!sessionId) {
                    fetchSessionList()
                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log('error in fetching chat response--->', error)
        }
    }

    const fetchQuestions = async () => {
        try {
            setPageLoading(true)
            const headers = {
                Authorization: `Bearer ${jwt}`,
            }
            const response = await getQuestions(headers, selectedFile?.id)
            setDefaultQuestions(response?.data?.data)
            setPageLoading(false)
        } catch (error) {
            console.log('error in fetching questions')
            setPageLoading(false)
        }
    }

    const fetchDocuments = async () => {
        try {
            setPageLoading(true)
            const documentUrl = `${constants.BASE_DOC_API_URL}`
            const response = await axios.get(documentUrl, {
                params: {
                    page: 0,
                    size: 10,
                    sortField: 'uploadDate',
                    sortDirection: 'desc',
                    name: '',
                    isActive: 1,
                    version: '',
                    fileSize: '',
                },
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })

            if (!response.data || !response.data.data) {
                throw new Error('Failed to fetch documents')
            }

            const filteredDocs = response?.data?.data.filter(
                (items) => items?.status === 'LLM_TRAINING_COMPLETED'
            )
            setDocuments(filteredDocs)
            if (filteredDocs?.length > 0) {
                setSelectedFile({ ...filteredDocs[0] })
            }
            setPageInfo({
                ...pageInfo,
                pageSize: response?.data?.pageSize,
                page: response?.data?.page,
                totalCount: response?.data?.totalCount,
                totalPages: response?.data?.totalPages,
            })
            setPageLoading(false)
        } catch (error) {
            setDocuments([])
            setPageLoading(false)
            console.error('Error fetching documents:', error.message)
        }
    }

    const handleSuggestionClick = (question) => {
        setInputValue(question)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSend()
        }
    }

    const resizeTextarea = (element) => {
        if (isMobile) {
            element.style.height = '20px'
            element.style.height = Math.min(element.scrollHeight, 20 * 7) + 'px'

            const number = parseInt(element.style.height.match(/\d+/)[0])
            if (number > 20 && number < 239) {
                setContainerHight(element.style.height)
            }
        } else {
            element.style.height = '34px'
            if (element.scrollHeight >= 0 && element.scrollHeight < 188) {
                element.style.height =
                    Math.min(element.scrollHeight, 34 * 7) + 'px'
                const number = parseInt(element.style.height.match(/\d+/)[0])
                if (number > 30 && number < 65) {
                    setContainerHight(element.style.height)
                }
            } else {
                element.style.height = '188px'
                setContainerHight(0)
            }
        }
    }

    const handleOkWarning = () => {
        setShowWarning(false)
        if (isNewChat) {
            addNewChat()
        }
        setInputValue('')
        setSearchOption('acrossFiles')
        setSelectedFile('')
    }

    const handleCancelWarning = () => {
        setShowWarning(false)
    }

    const chatRef = useRef(null)

    useEffect(() => {
        if (pathName) {
            chatRef?.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }
    }, [isNewChat])

    return (
        <Layout componentName="Chat">
            {pageLoading && <PageLoader loadingStatus={pageLoading} />}
            {!pageLoading && documents.length === 0 ? (
                <Box
                    sx={{
                        height: isMobile ? '85vh' : '85%',
                        width: '100%',
                        borderRadius: '10px',
                        display: 'flex',
                    }}
                >
                    <NoDocumentError
                        ErrorIcon={noDocumentErrorIcon}
                        errorMsgTitle={errorMsgTitle}
                        errorMsgBody={noDocumentsErrorMsg}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        height: isMobile ? '85vh' : '90%',
                        width: isMobile ? '100%' : '98%',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <DocumentSelection
                        isMobile={isMobile}
                        selectedFile={selectedFile}
                        documents={documents}
                        showWarning={showWarning}
                        searchOption={searchOption}
                        setSearchOption={setSearchOption}
                        permittedScopes={permittedScopes}
                        handleSearchOptionChange={handleSearchOptionChange}
                        handleFileChange={handleFileChange}
                        handleOkWarning={handleOkWarning}
                        handleCancelWarning={handleCancelWarning}
                    />
                    <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        {!messageSent && (
                            <Box
                                ref={chatRef}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: {
                                        xs: `calc(100% - ${containerHeight})`,
                                        sm: '98%',
                                        lg: '95%',
                                        xl: '96%',
                                    },
                                    overflowY: 'auto',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'lightgrey #f5f5f5',
                                    scrollHeight: '3px',
                                    scrollPaddingRight: '3px',
                                    padding: '0.8rem',
                                    paddingLeft: isMobile ? '' : '20%',
                                    paddingRight: isMobile ? '' : '20%',
                                }}
                            >
                                {!isMobile ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            textAlign={'center'}
                                        >
                                            <img
                                                src={AMChato}
                                                alt=""
                                                className={styles.chatimg}
                                            />
                                        </Typography>
                                    </Box>
                                ) : (
                                    ''
                                )}
                                <Box
                                    sx={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            textAlign={'center'}
                                        >
                                            Hello, I’m AM-Chat
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="bold"
                                            textAlign={'center'}
                                        >
                                            How can I help you today?
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    {searchOption === 'specificFileText' && (
                                        <Grid container spacing={2}>
                                            {defaultQuestions?.length > 0 &&
                                                defaultQuestions.map(
                                                    (questions, index) => (
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={12}
                                                            md={
                                                                defaultQuestions?.length ===
                                                                1
                                                                    ? 12
                                                                    : 6
                                                            }
                                                            lg={
                                                                defaultQuestions?.length ===
                                                                1
                                                                    ? 12
                                                                    : 6
                                                            }
                                                            xl={
                                                                defaultQuestions?.length ===
                                                                1
                                                                    ? 12
                                                                    : 6
                                                            }
                                                            key={index}
                                                            style={{
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="caption"
                                                                display="block"
                                                                className={
                                                                    styles.chatParagraphSuggestion
                                                                }
                                                                onClick={() =>
                                                                    handleSuggestionClick(
                                                                        questions?.question
                                                                    )
                                                                }
                                                                style={{
                                                                    flex: 1,
                                                                    minHeight: 0,
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                            >
                                                                {
                                                                    questions?.question
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    )
                                                )}
                                        </Grid>
                                    )}
                                </Box>
                            </Box>
                        )}
                        {messageSent && (
                            <Box
                                ref={scrollContainerRef}
                                sx={{
                                    display: 'flex',
                                    height: isMobile ? '96%' : '90%',
                                    overflowY: 'auto',
                                    scrollbarWidth: '3px',
                                    scrollbarColor: 'lightgrey #f5f5f5',
                                    scrollHeight: '3px',
                                    scrollPaddingRight: '3px',
                                    padding: '0.8rem',
                                    // flexWrap: 'wrap',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                {questions.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{ display: 'flex' }}
                                    >
                                        <div className={styles.responseContent}>
                                            <div
                                                className={styles.askedQuestion}
                                            >
                                                <img
                                                    src={userImageUrl}
                                                    alt="User"
                                                    className={styles.userImage}
                                                />
                                                <Typography
                                                    variant="subtitle1"
                                                    gutterBottom
                                                    className={
                                                        styles.askedQuestionText
                                                    }
                                                    style={{ fontSize: '14px' }}
                                                    mt={1}
                                                >
                                                    {' '}
                                                    {item.question}
                                                </Typography>
                                            </div>
                                            {loading &&
                                            (item?.answer == null ||
                                                item?.answer == '') ? (
                                                <div
                                                    className={styles.response}
                                                    style={{ width: '100%' }}
                                                >
                                                    <Skeleton active />
                                                </div>
                                            ) : (
                                                <div
                                                    className={styles.response}
                                                >
                                                    <img
                                                        src={Vector}
                                                        alt="User"
                                                        className={
                                                            styles.userImage
                                                        }
                                                    />
                                                    <Typography
                                                        variant="subtitle1"
                                                        mt={1}
                                                        style={{
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {item.answer}
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </Box>
                        )}
                    </Box>
                    {(permittedScopes?.includes(scopes.CHC) ||
                        (permittedScopes?.includes(scopes.CHU) &&
                            !permittedScopes?.includes(scopes.CHC) &&
                            questions.length > 0)) && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '5px',
                                marginBottom: isIos ? '2em' : '0px',
                            }}
                        >
                            <textarea
                                className={styles.bigInput}
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Ask Anything..."
                                autoSize={{ minRows: 1 }}
                                onKeyPress={handleKeyPress}
                                ref={(textarea) => {
                                    if (textarea) resizeTextarea(textarea)
                                }}
                                style={{
                                    minHeight: '34px',
                                    overflowY: 'auto',
                                    paddingRight: '4rem',
                                    scrollHeight: '3px',
                                    scrollPaddingRight: '6px',
                                    WebkitScrollbarCorner: {
                                        background: 'transparent',
                                        paddingRight: '16px',
                                    },
                                    resize: 'none',
                                }}
                            />
                            {inputValue && (
                                <Box sx={{ position: 'relative' }}>
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        className={styles.SendButton}
                                        onClick={handleSend}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}

                    <Box style={{ width: '100%', height: '1rem' }}>
                        {errorMessage && (
                            <Typography
                                variant="body2"
                                style={{
                                    color: 'red',
                                    textAlign: 'center',
                                    marginTop: '0.4rem',
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}
        </Layout>
    )
}

export default Chats
