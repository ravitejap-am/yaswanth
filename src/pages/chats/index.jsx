import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Modal, Skeleton } from 'antd';
import styles from './Chats.module.css';
import { SendOutlined, WarningOutlined } from '@ant-design/icons';
import uesrImg from '../../asset/userimg.avif'
import responseImg from '../../asset/responseimg.jpg'
import amchatImg from '../../asset/Vector (1).png'
import { useChat } from '../../contexts/provider/ChatContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { AM_CHAT } from "../../constants/Constant";
function Chats() {
  const { isChatOpen, setIsChatOpen } = useChat();
  const [searchOption, setSearchOption] = useState('specificFileText');
  const [selectedFile, setSelectedFile] = useState('file1');
  const [inputValue, setInputValue] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false); 

  useEffect(() => {
    setQuestions([]);
    setMessageSent(false);
  }, [isChatOpen]);

  
  const handleSearchOptionChange = (option) => {
    if (option === 'acrossFiles') {
      setShowWarning(true);
    } else {
      setSearchOption(option);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (!messageSent) {
      setMessageSent(false);
    }
  };

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      console.log('Sending message:', inputValue);
      setLoading(true);
      setTimeout(() => {
        const newQuestion = inputValue;
        const response = generateResponse(newQuestion);
        setQuestions([...questions, { question: newQuestion, response }]);
        setInputValue('');
        setMessageSent(true);
        setLoading(false);
      }, 1000);
    }
  };

  const generateResponse = (question) => {
    switch (question) {
      case 'Could you help me with the maternity policy of my organization?':
        return 'Sure, here is the link to the maternity policy document: [link]';
      case 'Can you tell me about GDPR compliance.  Which I should follow in my organization?':
        return 'GDPR compliance is crucial for protecting user data. Here are the key aspects you should focus on: [list of key aspects]';
      case 'Can you explain me the Pythagoras theorem based on. ':
        return 'The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.';
      case "Can you tell me what's wrong in my lab reports? ":
        return "Sure, please upload your lab reports, and I'll take a look.";
      case 'Can you explain me the quantum? ':
        return 'Quantum mechanics is the branch of physics that studies the behavior of particles at the quantum level, where classical physics principles no longer apply.';
      default:
        return "I'm sorry, I didn't understand your question. Can you please provide more details?";
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
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };


  const handleOkWarning = () => {
    setShowWarning(false);
    setSearchOption('acrossFiles');
  };

  const handleCancelWarning = () => {
    setShowWarning(false);
  };

  return (
    <Layout componentName="Chat" >
      <div  >
      <div className={styles.chatContainer}>
      <div className={styles.textContext}>Context</div>
      <div style={{ padding: "10px"}}>
        <Grid container spacing={2} alignItems="left" justifyContent="left">
          <Grid item xs={12} sm={2} md={2}>
            <label className={styles.chatLabel}>
              <input
                type="radio"
                value="acrossFiles"
                checked={searchOption === 'acrossFiles'}
                onChange={() => handleSearchOptionChange('acrossFiles')}
              />
              Across
            </label>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <label className={styles.chatLabel}>
              <input
                type="radio"
                value="specificFileText"
                checked={searchOption === 'specificFileText'}
                onChange={() => handleSearchOptionChange('specificFileText')}
              />
              Specific 
            </label>
          </Grid>
          {searchOption === 'specificFileText' && (
            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                className={styles.chatFormControl}
                size="small"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="file-select-label">Document</InputLabel>
                <Select
                  labelId="file-select-label"
                  id="file-select"
                  value={selectedFile}
                  onChange={handleFileChange}
                  label="Document"
                  className={styles.chatSelect}
                  style={{ textAlign: 'left', height: "30px" }}
                >
                  <MenuItem value="">
                    <em>Select file</em>
                  </MenuItem>
                  <MenuItem value="file1">File 1</MenuItem>
                  <MenuItem value="file2">File 2</MenuItem>
                  <MenuItem value="file3">File 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
      <Dialog open={showWarning} onClose={handleCancelWarning}>
        <DialogTitle>
          <WarningOutlined style={{ color: '#faad14', marginRight: '8px' }} />
          Warning
        </DialogTitle>
        <DialogContent>
          <Typography>
            Searching across files is a costly, time-consuming process and may result in inefficient results. Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkWarning} type="primary">
            Ok
          </Button>
          <Button onClick={handleCancelWarning}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </Grid>
        </div>
      </div>
        <div className={styles.chatCardContainer}>
          <Card variant="" className={styles.chatCardNew}>
            <div className={styles.chatCard}>
              {!messageSent && (
                <CardContent className={styles.chatCardContent}>
                  <h1 className={styles.chatHeading}>{AM_CHAT} <img src={amchatImg} alt="" className={styles.chatimg} /></h1>
                  <p className={styles.chatParagraph}>Hello, I’m AM-Chat</p>
                  <p className={styles.chatParagraphText}>
                    How can I help you today?
                  </p>
                  <br />
                  <br />
                  <Grid container spacing={2}>
                    <Grid item>
                      <p
                        className={styles.chatParagraphSuggestion}
                        onClick={() =>
                          handleSuggestionClick(
                            'Could you help me with the maternity policy of my organization?'
                          )
                        }
                      >
                        Could you help me with the maternity policy of my
                        organization?
                      </p>
                    </Grid>
                    <Grid item>
                      <p
                        className={styles.chatParagraphSuggestion}
                        onClick={() =>
                          handleSuggestionClick(
                            'Can you tell me about GDPR compliance.  Which I should follow in my organization?'
                          )
                        }
                      >
                        Can you tell me about GDPR compliance. Which I should
                        follow in my organization?
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item>
                      <p
                        className={styles.chatParagraphSuggestion}
                        onClick={() =>
                          handleSuggestionClick(
                            'Can you explain me the Pythagoras theorem based on. '
                          )
                        }
                      >
                        Can you explain me the Pythagoras theorem based on. 
                      </p>
                    </Grid>
                    <Grid item>
                      <p
                        className={styles.chatParagraphSuggestion}
                        onClick={() =>
                          handleSuggestionClick(
                            "Can you tell me what's wrong in my lab reports? "
                          )
                        }
                      >
                        Can you tell me what's wrong in my lab reports? 
                      </p>
                    </Grid>
                    <Grid item>
                      <p
                        className={styles.chatParagraphSuggestion}
                        onClick={() =>
                          handleSuggestionClick(
                            'Can you explain me the quantum? '
                          )
                        }
                      >
                        Can you explain me the quantum? 
                      </p>
                    </Grid>
                  </Grid>
                </CardContent>
              )}
            </div>
            {messageSent && (
              
              <CardContent className={styles.chatCardContent}>
                <div className={styles.chatScroll}>
                {questions.map((item, index) => (
                  <div key={index}>
                    <div className={styles.responseContent}>
                      <div className={styles.askedQuestion}>
                        <img
                          src={uesrImg}
                          alt="User"
                          className={styles.userImage}
                        />
                        <p className={styles.askedQuestionText}>
                          {' '}
                          {item.question}
                        </p>
                      </div>
                      {loading && index === questions.length - 1 ? (
                        <Skeleton active />
                      ) : (
                        <div className={styles.response}>
                          <img
                            src={responseImg}
                            alt="Response"
                            className={styles.responseImage}
                          />
                          <p>{item.response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </CardContent>
            )}
            <CardContent>
              <div className={styles.inputContainer}>
                <div className={styles.textarea}>
                  <textarea
                    className={styles.bigInput}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask Anything..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    onKeyPress={handleKeyPress}
                    ref={(textarea) => {
                      if (textarea) resizeTextarea(textarea);
                    }}
                  />
                  {inputValue && (
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<SendOutlined />}
                      className={styles.SendButton}
                      onClick={handleSend}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Chats;
