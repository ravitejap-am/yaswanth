import React, { useEffect, useState, useRef } from 'react';
import Layout from '../../Layout';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';
import { Button, Modal, Skeleton } from 'antd';
import styles from './Chats.module.css';
import { SendOutlined, WarningOutlined } from '@ant-design/icons';
import uesrImg from '../../asset/userimg.avif';
import responseImg from '../../asset/responseimg.jpg';
import amchatImg from '../../asset/Vector (1).png';
import { useChat } from '../../contexts/provider/ChatContext';
import { AM_CHAT } from '../../constants/Constant';
import {
  getChatResponse,
  getQuestions,
  getSessionList,
} from '../../apiCalls/ApiCalls';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import { useLocation } from 'react-router-dom';
import Vector from '../../asset/Vector.png';
import * as constants from '../../constants/Constant';
import axios from 'axios';
import { CHAT } from '../../constants/Constant';
import PageLoader from '../../components/loader/loader';
import AMChato from '../../asset/AMChato.png';
import { useMessageState } from '../../hooks/useapp-message';

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
    fetchSessionList
  } = useChat();

  const [searchOption, setSearchOption] = useState('specificFileText');
  const [selectedFile, setSelectedFile] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [containerHeight, setContainerHight] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');
  const scrollContainerRef = useRef(null);
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [errorMessage, setErrorMessage] = useState('');
  const defaultScroll = useRef(null);
  const location = useLocation();
  const pathName = location.pathname;
  const userImageUrl = localStorage.getItem('userImageUrl');
  const [documents, setDocuments] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageSize: 10,
    page: 0,
    totalCount: null,
    totalPages: null,
  });
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const isAndroid = /Android/.test(navigator.userAgent);

  let { isReset, setIsReset, showNotifyMessage, hideNotifyMessage } =
    useMessageState();

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  useEffect(() => {
    setQuestions([]);
    setMessageSent(false);
    setQuestionIndex(0);
  }, [isChatOpen]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (
      selectedFile === '' ||
      selectedFile === null ||
      typeof selectedFile === 'string'
    ) {
      setDefaultQuestions([]);
    } else {
      fetchQuestions();
    }
  }, [selectedFile]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const scrollToBottomForQuestions = () => {
    if (defaultScroll.current) {
      defaultScroll.current.scrollTop = defaultScroll.current.scrollHeight;
      console.log('scroll top---->', defaultScroll.current.scrollTop);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [questions, loading]);

  useEffect(() => {
    if (pathName === '/chat') {
      scrollToBottomForQuestions();
    }
  }, [pathName]);

  const addNewChat = () => {
    setIsChatOpen(!isChatOpen);
    setMessageSent(false);
    setIsNewChat(false);
    setQuestionIndex(0);
    setQuestions([]);
    setSessionId('');
  };

  const handleSearchOptionChange = (option) => {
    if (option === 'acrossFiles') {
      setShowWarning(true);
    } else {
      setSearchOption(option);
      if (documents?.length > 0) {
        setSelectedFile(documents[0]?.id);
      }
      if (isNewChat) {
        addNewChat();
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleInputChange = (event) => {
    if (event.target.value.replace(/\s/g, '').length <= 1000) {
      setInputValue(event.target.value);
      setErrorMessage('');
    } else {
      setErrorMessage('Maximum 1000 characters allowed');
    }
    if (!messageSent) {
      setMessageSent(false);
    }
  };

  const calculateLastIndexOfText = (fullText, allowedLength) => {
    let i = 0;
    let k = 0;
    while (k <= allowedLength + 1) {
      if (fullText[i] !== ' ') {
        k = k + 1;
      }
      i++;
    }
    return i;
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text');
    const existingInputLength = inputValue.replace(/\s/g, '').length;
    const pastedCharLength = pastedText.replace(/\s/g, '').length;

    let allowedLength = 0;
    if (pastedCharLength + existingInputLength > 1000) {
      const subLength =
        (pastedText + inputValue).replace(/\s/g, '').length - 1000;
      allowedLength =
        (pastedText + inputValue).replace(/\s/g, '').length - subLength;
    } else {
      allowedLength = pastedCharLength + existingInputLength;
    }
    let fullText = pastedText + inputValue;

    const number = calculateLastIndexOfText(fullText, 1000);
    const allowedContent = fullText.substring(0, number);

    if (allowedContent.replace(/\s/g, '').length > 1000) {
      event.preventDefault();
      setErrorMessage('Maximum 1000 characters allowed');
    } else {
      const newValue = allowedContent;
      setInputValue(newValue);
    }
  };

  const handleSend = async () => {
    let docName = '';
    if (
      selectedFile &&
      typeof selectedFile === 'number' &&
      searchOption === 'specificFileText'
    ) {
      docName = documents.filter((doc) => {
        if (doc.id === selectedFile) {
          return doc;
        }
      });
    } else {
      if (searchOption === 'specificFileText') {
        showNotifyMessage('error', 'Please select file', messageHandler);
        return;
      }
    }
    try {
      setLoading(true);
      if (inputValue.trim() !== '') {
        setIsNewChat(true);
        console.log('Sending message:', inputValue);

        let modifyData = {
          questionId: questionIndex,
          question: inputValue,
          answer: '',
          answerData: false,
        };
        const body = {
          doc_name: docName[0]?.name,
          query: inputValue,
          session_id: `${sessionId}`,
          across: searchOption === 'specificFileText' ? false : true,
        };
        const headers = {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        };
        const updatedQuestionAndAnswer = [...questions, modifyData];
        setQuestions(updatedQuestionAndAnswer);
        setErrorMessage('');
        setMessageSent(true);
        const response = await getChatResponse(body, headers);

        console.log('chat response---->', response);
        updatedQuestionAndAnswer[questionIndex].answer =
          response?.data?.response;
        updatedQuestionAndAnswer[questionIndex].answerData = true;
        setInputValue('');
        setQuestions(updatedQuestionAndAnswer);
        setQuestionIndex(questionIndex + 1);
        if (response?.data?.session_id) {
          setSessionId(response?.data?.session_id);
        }
        if(!sessionId){
          fetchSessionList()
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('error in fetching chat response--->', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      setPageLoading(true);
      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
      console.log('headers in api--->', headers);
      console.log('selectedFile---->', selectedFile);
      const response = await getQuestions(headers, selectedFile);
      console.log('question response---->', response);
      setDefaultQuestions(response?.data?.data);
      setPageLoading(false);
    } catch (error) {
      console.log('error in fetching questions');
      setPageLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      setPageLoading(true);
      const documentUrl = `${constants.BASE_DOC_API_URL}`;
      console.log('documentUrl---->', documentUrl);
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
      });

      console.log('fetch documents--->', response);

      if (!response.data || !response.data.data) {
        throw new Error('Failed to fetch documents');
      }
      console.log('response----->', response);
      setDocuments(response.data.data.filter((items) => items.active === true));
      if (response?.data?.data?.length > 0) {
        console.log('intial selected file---->', response?.data?.data[0].name);
        setSelectedFile(response?.data?.data[0].id);
      }
      setPageInfo({
        ...pageInfo,
        pageSize: response?.data?.pageSize,
        page: response?.data?.page,
        totalCount: response?.data?.totalCount,
        totalPages: response?.data?.totalPages,
      });
      setPageLoading(false);
    } catch (error) {
      setDocuments([]);
      setPageLoading(false);
      console.error('Error fetching documents:', error.message);
    }
  };

  const handleSuggestionClick = (question) => {
    setInputValue(question);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const resizeTextarea = (element) => {
    if (isMobile) {
      element.style.height = '20px';
      element.style.height = Math.min(element.scrollHeight, 20 * 7) + 'px';

      const number = parseInt(element.style.height.match(/\d+/)[0]);
      if (number > 20 && number < 239) {
        setContainerHight(element.style.height);
      }
    } else {
      element.style.height = '34px';
      if (element.scrollHeight >= 0 && element.scrollHeight < 188) {
        element.style.height = Math.min(element.scrollHeight, 34 * 7) + 'px';
        const number = parseInt(element.style.height.match(/\d+/)[0]);
        if (number > 30 && number < 65) {
          setContainerHight(element.style.height);
        }
      } else {
        element.style.height = '188px';
        setContainerHight(0);
      }
    }
  };

  const handleOkWarning = () => {
    setShowWarning(false);
    console.log('is new chat---->', isNewChat);
    if (isNewChat) {
      console.log('add new chat');
      addNewChat();
    }
    setSearchOption('acrossFiles');
    setSelectedFile('');
  };

  const handleCancelWarning = () => {
    setShowWarning(false);
  };

  const chatRef = useRef(null);

  useEffect(() => {
    if (pathName) {
      chatRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  return (
    <Layout componentName="Chat">
      {pageLoading && <PageLoader loadingStatus={pageLoading} />}
      <Box
        sx={{
          height: isMobile ? isAndroid ? '80vh' : '72vh' : '85%',
          width: isMobile ? '100%' : '98%',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            height: { sm: '8em', md: '3em' },
            borderBottom: '1px solid lightGrey',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'space-around' : 'flex-start',
            flexDirection: 'row',
            gap: isMobile ? '0.6rem' : '2rem',
            paddingBottom: '5px',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <input
              type="radio"
              value="acrossFiles"
              checked={searchOption === 'acrossFiles'}
              onChange={() => handleSearchOptionChange('acrossFiles')}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                paddingTop: '0.19rem',
              }}
            >
              Across
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <input
              type="radio"
              value="specificFileText"
              checked={searchOption === 'specificFileText'}
              onChange={() => handleSearchOptionChange('specificFileText')}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                paddingTop: '0.19rem',
              }}
            >
              Specific
            </Typography>
          </Box>
          {searchOption === 'specificFileText' && (
            <Box sx={{ width: isMobile ? '125px' : '140px' }}>
              <FormControl
                className={styles.chatFormControl}
                size="large"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="file-select-label" shrink={true}>
                  Document
                </InputLabel>
                <Select
                  labelId="file-select-label"
                  id="file-select"
                  value={selectedFile}
                  onChange={handleFileChange}
                  label="Document"
                  className={styles.chatSelect}
                  style={{ textAlign: 'left', height: '30px' }}
                >
                  <MenuItem value="  ">
                    <em>Select file</em>
                  </MenuItem>
                  {documents?.length > 0 &&
                    documents.map((item) => {
                      return <MenuItem value={item.id}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              <Dialog open={showWarning} onClose={handleCancelWarning}>
                <DialogTitle>
                  <WarningOutlined
                    style={{ color: '#faad14', marginRight: '8px' }}
                  />
                  Warning
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    Interacting across files is a costly and time-consuming
                    process. Would you like to continue ?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleOkWarning} type="primary">
                    <Typography variant="button"> Ok </Typography>
                  </Button>
                  <Button onClick={handleCancelWarning}>
                    <Typography variant="button"> Cancel </Typography>
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {!messageSent && (
            <Box
              ref={chatRef}
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'column',
                justifyContent: isMobile ? 'space-between' : 'space-between',
                alignItems: isMobile ? 'center' : 'center',
                flexWrap: isMobile ? '' : '',
                height: isMobile
                  ? `calc(100% - ${containerHeight})`
                  : `calc(100% - ${containerHeight})`,
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
                  <Typography variant="h4" textAlign={'center'}>
                    <img src={AMChato} alt="" className={styles.chatimg} />
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
                      defaultQuestions.map((questions, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={defaultQuestions?.length === 1 ? 12 : 6}
                          lg={defaultQuestions?.length === 1 ? 12 : 6}
                          xl={defaultQuestions?.length === 1 ? 12 : 6}
                          key={index}
                          style={{ display: 'flex' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            className={styles.chatParagraphSuggestion}
                            onClick={() =>
                              handleSuggestionClick(questions?.question)
                            }
                            style={{
                              flex: 1,
                              minHeight: 0,
                              textAlign: 'center',
                            }}
                          >
                            {questions?.question}
                          </Typography>
                        </Grid>
                      ))}
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
                <div key={index} style={{ display: 'flex' }}>
                  <div className={styles.responseContent}>
                    <div className={styles.askedQuestion}>
                      <img
                        src={userImageUrl}
                        alt="User"
                        className={styles.userImage}
                      />
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        className={styles.askedQuestionText}
                        style={{ fontSize: '14px' }}
                        mt={1}
                      >
                        {' '}
                        {item.question}
                      </Typography>
                    </div>
                    {loading && (item?.answer == null || item?.answer == '') ? (
                      <div
                        className={styles.response}
                        style={{ width: '100%' }}
                      >
                        <Skeleton active />
                      </div>
                    ) : (
                      <div className={styles.response}>
                        <img
                          src={Vector}
                          alt="User"
                          className={styles.userImage}
                        />
                        <Typography
                          variant="subtitle1"
                          mt={1}
                          style={{ fontSize: '14px' }}
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
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
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
            if (textarea) resizeTextarea(textarea);
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
          onPaste={handlePaste}
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
      <Box style={{ width: '100%', height: '1rem' }}>
        {errorMessage && (
          <Typography
            variant="body2"
            style={{ color: 'red', textAlign: 'center', marginTop: '0.4rem' }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
      </Box>
     
    </Layout>
  );
}

export default Chats;
