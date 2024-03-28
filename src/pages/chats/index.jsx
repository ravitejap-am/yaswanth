import React, { useEffect, useState, useRef } from "react";
import Layout from "../../Layout";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
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
  useMediaQuery
} from "@mui/material";
import { Button, Modal, Skeleton } from "antd";
import styles from "./Chats.module.css";
import { SendOutlined, WarningOutlined } from "@ant-design/icons";
import uesrImg from "../../asset/userimg.avif";
import responseImg from "../../asset/responseimg.jpg";
import amchatImg from "../../asset/Vector (1).png";
import { useChat } from "../../contexts/provider/ChatContext";
import { AM_CHAT } from "../../constants/Constant";
function Chats() {
  const { isChatOpen, setIsChatOpen, isNewChat, setIsNewChat } = useChat();
  const [searchOption, setSearchOption] = useState("specificFileText");
  const [selectedFile, setSelectedFile] = useState("file1");
  const [inputValue, setInputValue] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [containerHeight, setContainerHight] = useState(0)
  const isMobile = useMediaQuery("(max-width:600px)");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setQuestions([]);
    setMessageSent(false);
  }, [isChatOpen]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [questions, loading]);

  const handleSearchOptionChange = (option) => {
    if (option === "acrossFiles") {
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
      setIsNewChat(true);
      console.log('Sending message:', inputValue);
      setLoading(true);
      setTimeout(() => {
        const newQuestion = inputValue;
        const response = generateResponse(newQuestion);
        setQuestions([...questions, { question: newQuestion, response }]);
        setInputValue("");
        setMessageSent(true);
        setLoading(false);
      }, 1000);
    }
  };

  const defaultQuestions = [
    "Could you help me with the maternity policy of my organisation?",
    "Can you tell me about GDPR compliance.  Which I should follow in my organisation?",
    "Can you tell me about GDPR compliance.  Which I should follow in my organisation?,",
    "Can you explain me the Pythagoras theorem based on. , ",
    "Can you tell me what's wrong in my lab reports?",
    "Can you explain me the quantum?",
  ];

  const generateResponse = (question) => {
    switch (question) {
      case "Could you help me with the maternity policy of my organisation?":
        return "Sure, here is the link to the maternity policy document: [link]";
      case "Can you tell me about GDPR compliance.  Which I should follow in my organisation?":
        return "GDPR compliance is crucial for protecting user data. Here are the key aspects you should focus on: [list of key aspects]";
      case "Can you explain me the Pythagoras theorem based on. ":
        return "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.";
      case "Can you tell me what's wrong in my lab reports? ":
        return "Sure, please upload your lab reports, and I'll take a look.";
      case "Can you explain me the quantum? ":
        return "Quantum mechanics is the branch of physics that studies the behavior of particles at the quantum level, where classical physics principles no longer apply.";
      default:
        return "I'm sorry, I didn't understand your question. Can you please provide more details?";
    }
  };

  const handleSuggestionClick = (question) => {
    setInputValue(question);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };


  const resizeTextarea = (element) => {
    console.log("is mobile--->",isMobile);
    console.log("element height-->",element.style.height);
    if(isMobile){
      element.style.height = '20px'; 
      element.style.height = Math.min(element.scrollHeight, 20 * 7) + "px";
      
      const number = parseInt(element.style.height.match(/\d+/)[0]);
      console.log("number---->",number);
      if(number > 20 && number < 239){
        setContainerHight(element.style.height)
      }
    }else{
      element.style.height = '34px'; 
      element.style.height = Math.min(element.scrollHeight, 34 * 7) + "px";
      const number = parseInt(element.style.height.match(/\d+/)[0]);
      if(number > 30 && number < 239){
        setContainerHight(element.style.height)
      }
    }

    console.log("element.style.height---->",element.style.height); 
  };

  const handleOkWarning = () => {
    setShowWarning(false);
    setSearchOption("acrossFiles");
  };

  const handleCancelWarning = () => {
    setShowWarning(false);
  };

  console.log("is mobile b--->",isMobile);

  // console.log("textarea---->",textarea.style.height);

  return (
    <Layout componentName="Chat">
      <div style={{height:'90%'}}>
        <div className={styles.chatContainer}>
          <div className={styles.textContext}>
            {" "}
            <Typography variant="subtitle2" fontWeight="bold">
              {" "}
              Context{" "}
            </Typography>
          </div>
          <div style={{ padding: "10px" }}>
            <Grid container spacing={2} alignItems="left" justifyContent="left">
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="body1">
                  <label className={styles.chatLabel}>
                    <input
                      type="radio"
                      value="acrossFiles"
                      checked={searchOption === "acrossFiles"}
                      onChange={() => handleSearchOptionChange("acrossFiles")}
                    />
                    Across
                  </label>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Typography>
                  <label className={styles.chatLabel}>
                    <input
                      type="radio"
                      value="specificFileText"
                      checked={searchOption === "specificFileText"}
                      onChange={() =>
                        handleSearchOptionChange("specificFileText")
                      }
                    />
                    Specific
                  </label>
                </Typography>
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
                      style={{ textAlign: 'left', height: '30px' }}
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
                  <WarningOutlined
                    style={{ color: "#faad14", marginRight: "8px" }}
                  />
                  Warning
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    Searching across files is a costly, time-consuming process
                    and may result in inefficient results. Would you like to
                    continue?
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
            </Grid>
          </div>
        </div>
        <Box 
          style={{
            height: '88%',
            marginTop: '1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box 
            sx={{
              '@media (max-width: 600px)': {
                width: '100%',
                flexWrap: 'wrap',
                display: 'flex',
                height: 'auto',
                overflow: 'auto',
                // padding: '0.8rem',
                
              },
              '@media (min-width: 601px)': {
                height: '90%',
                flexWrap: 'wrap',
                width: '100%',
                
              }
            }}
          
          >
            {!messageSent && 
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile? "" : "column",
                justifyContent: isMobile ? "" : "space-between",
                alignItems: isMobile ? "" : "center",
                flexWrap: isMobile ?  "wrap" : "",
                height:   `calc(98% - ${containerHeight})` ,
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'lightgrey #f5f5f5',
                scrollHeight: '3px',
                scrollPaddingRight: '3px',
                padding: '0.8rem',
                paddingLeft: isMobile? "" : "15%",
                paddingRight: isMobile? "" : "15%",
              }}
            > 
            
            <Box sx={{display: "flex", paddingLeft: isMobile? "15%" : "", paddingRight: isMobile? "15%" : ""  }}>
              <Typography variant="h4" textAlign={"center"} 
              >
                {" "}
                {AM_CHAT}{" "}
                <img src={amchatImg} alt="" className={styles.chatimg} />
              </Typography>
              </Box>
              <Box 
              sx={{ display:'flex', flexDirection: 'column',  paddingLeft: isMobile? "15%" : "", paddingRight: isMobile? "15%" : "" }}
              >
                <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
                  Hello, I’m AM-Chat
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" textAlign={"center"}>
                  How can I help you today?
                </Typography>
              </Box>
              <Box 
              // sx={{display:'flex'}}
              >
                <Grid container spacing={2} >
                  {defaultQuestions.map((questions, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index} 
                    style={{ display: 'flex' }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        className={styles.chatParagraphSuggestion}
                        onClick={() => handleSuggestionClick(questions)}
                        style={{ flex: 1, minHeight: 0, textAlign: 'center'  }}
                      >
                        {questions}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>}
            {messageSent && (
              <Box 
                ref={scrollContainerRef}
                sx={{
                  height: `calc(98% - ${containerHeight})`,
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'lightgrey #f5f5f5',
                  scrollHeight: '3px',
                  scrollPaddingRight:'3px',
                  padding: '0.8rem',
                }}
              >
               {questions.map((item, index) => (
                  <div key={index}>
                    <div className={styles.responseContent}>
                      <div className={styles.askedQuestion}>
                        <img
                          src={uesrImg}
                          alt="User"
                          className={styles.userImage}
                        />
                        <Typography variant='subtitle1' gutterBottom className={styles.askedQuestionText} style={{fontSize: '14px'}}
                        >
                          {' '}
                          {item.question}
                        </Typography>
                      </div>
                      {loading && index === questions.length - 1 ? (
                        <Skeleton active />
                      ) : (
                        <div className={styles.response}>
                          <img
                            src={responseImg}
                            alt="User"
                            className={styles.userImage}
                          />
                          <Typography variant='subtitle1' mt={1} style={{fontSize: '14px'}}>{item.response}</Typography>
                        </div>)}

                      </div>
                    </div>
                  
                ))}
              </Box>
            )}
              <Box
              sx={{position: "relative", marginTop:"1rem", display:'flex', width: '100%'}}
              >
                <Box 
                sx={{  
                  position: "relative",
                  width: "100%",
                  maxHeight: "10%",
                  padding: isMobile ? '0.8rem' : "",
                  paddingLeft: isMobile? "" : "15%",
                  paddingRight:  isMobile? "" : "15%",
                }}
                >
                  <textarea
                    className={styles.bigInput}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask Anything..."
                    autoSize={{ minRows: 1}}
                    onKeyPress={handleKeyPress}
                    ref={(textarea) => {
                      if (textarea) resizeTextarea(textarea);
                    }}
                    style={{
                      minHeight: '34px',
                      overflowY: 'auto',
                      paddingRight: '4rem',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'lightgrey #f5f5f5',
                      scrollHeight: '3px',
                      scrollPaddingRight:'3px',
                    }}
                  />
                  {inputValue && (
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      className={styles.SendButton}
                      onClick={handleSend}
                    />
                  )}
                </Box>
              </Box>
          </Box>
        </Box>
      </div>
    </Layout>
  );
}

export default Chats;
