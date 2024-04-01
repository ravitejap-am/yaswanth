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
  useMediaQuery,
} from "@mui/material";
import { Button, Modal, Skeleton } from "antd";
import styles from "./Chats.module.css";
import { SendOutlined, WarningOutlined } from "@ant-design/icons";
import uesrImg from "../../asset/userimg.avif";
import responseImg from "../../asset/responseimg.jpg";
import amchatImg from "../../asset/Vector (1).png";
import { useChat } from "../../contexts/provider/ChatContext";
import { AM_CHAT } from "../../constants/Constant";
import { getChatResponse } from "../../apiCalls/ApiCalls";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import { useLocation } from "react-router-dom";

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
  } = useChat();

  const [searchOption, setSearchOption] = useState("specificFileText");
  const [selectedFile, setSelectedFile] = useState("file1");
  const [inputValue, setInputValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [containerHeight, setContainerHight] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const scrollContainerRef = useRef(null);
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [errorMessage, setErrorMessage] = useState("");
  const defaultScroll = useRef(null);
  const location = useLocation();
  const pathName = location.pathname;
  console.log("pathname---->", pathName);

  useEffect(() => {
    setQuestions([]);
    setMessageSent(false);
  }, [isChatOpen]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const scrollToBottomForQuestions = () => {
    if (defaultScroll.current) {
      defaultScroll.current.scrollTop = defaultScroll.current.scrollHeight;
      console.log("scroll top---->", defaultScroll.current.scrollTop);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [questions, loading]);

  useEffect(() => {
    if (pathName === "/chat") {
      scrollToBottomForQuestions();
    }
  }, [pathName]);

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
    if (event.target.value.replace(/\s/g, "").length <= 1000) {
      setInputValue(event.target.value);
      setErrorMessage("");
    } else {
      setErrorMessage("Maximum 1000 characters allowed");
    }
    if (!messageSent) {
      setMessageSent(false);
    }
  };

  const calculateLastIndexOfText = (fullText, allowedLength) => {
    let i = 0;
    let k = 0
    while (k <=allowedLength + 1) {
      if (fullText[i] !== " ") {
        k = k + 1;
      }
      i++; 
    }
    return i;
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text");
    const existingInputLength = inputValue.replace(/\s/g, "").length;
    const pastedCharLength = pastedText.replace(/\s/g, "").length;

    let allowedLength = 0;
    if (pastedCharLength + existingInputLength > 1000) {
      const subLength =
        (pastedText + inputValue).replace(/\s/g, "").length - 1000;
      allowedLength =
        (pastedText + inputValue).replace(/\s/g, "").length - subLength;
    } else {
      allowedLength = pastedCharLength + existingInputLength;
    }
    let fullText = pastedText + inputValue

    const number =  calculateLastIndexOfText(fullText, 1000 )
    const allowedContent = fullText.substring(0, number)

    if (allowedContent.replace(/\s/g, "").length > 1000) {
      event.preventDefault();
      setErrorMessage("Maximum 1000 characters allowed");
    } else {
      const newValue = allowedContent;
      setInputValue(newValue);
    }
  };


  //   const pastedText = event.clipboardData.getData("text");
  //   const existingInputLength = inputValue.replace(/\s/g, "").length;
  //   const pastedCharLength = pastedText.replace(/\s/g, "").length;
  //   const textarea = event.target;

  //   let allowedLength = 0;
  //   if (pastedCharLength + existingInputLength > 1000) {
  //     const subLength = (pastedText + inputValue).replace(/\s/g, "").length - 1000;
  //     allowedLength = pastedText.length - subLength;
  //   } else {
  //     allowedLength = pastedCharLength + existingInputLength;
  //   }

  //   const allowedContent = pastedText.substring(0, allowedLength);

  //   console.log("allowed length content--->",allowedContent.replace(/\s/g, "").length);
  //   if (allowedContent.replace(/\s/g, "").length > 1000) {
  //     event.preventDefault();
  //     setErrorMessage("Maximum 1000 characters allowed");
  //   } else{
  //     setErrorMessage("");
  //   }
  //   // else {
  //     // Update input value with spaces preserved

  //     const newValue = allowedContent ;
  //     console.log("newValue length--->", newValue.replace(/\s/g, "").length);
  //     setInputValue(newValue);
  //   // }
  // };

  const handleSend = async () => {
    try {
      setLoading(true);
      if (inputValue.trim() !== "") {
        setIsNewChat(true);
        console.log("Sending message:", inputValue);

        let modifyData = {
          questionId: questionIndex,
          question: inputValue,
          answer: "",
          answerData: false,
        };
        const body = {
          doc_name: "Invoice-899B3FD6-0001.pdf",
          query: inputValue,
          session_id: "10003",
        };
        const headers = {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        };
        const updatedQuestionAndAnswer = [...questions, modifyData];
        const response = await getChatResponse(headers, body);
        console.log("response--->", response);
        // const response = {
        //   doc_name: "Invoice-899B3FD6-0001.pdf",
        //   query: "When is it due?",
        //   response: "It is due on March 7, 2023.",
        //   session_id: 10003,
        //   session_title: ""
        // }

        updatedQuestionAndAnswer[questionIndex].answer = response?.response;
        updatedQuestionAndAnswer[questionIndex].answerData = true;
        setQuestions(updatedQuestionAndAnswer);
        // setQuestionIndex(questionIndex + 1)

        setMessageSent(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      let modifyData = {
        questionId: questionIndex,
        question: inputValue,
        answer: "",
        answerData: false,
      };
      const updatedQuestionAndAnswer = [...questions, modifyData];
      setQuestions(updatedQuestionAndAnswer);
      console.log("showing error");
      const response = {
        doc_name: "Invoice-899B3FD6-0001.pdf",
        query: "When is it due?",
        response: "It is due on March 7, 2023.",
        session_id: 10003,
        session_title: "",
      };
      setErrorMessage("");
      console.log("question index--->", questionIndex);
      setInputValue("");
      setLoading(false);
      updatedQuestionAndAnswer[questionIndex].answer = response?.response;
      updatedQuestionAndAnswer[questionIndex].answerData = true;
      setQuestions(updatedQuestionAndAnswer);
      setQuestionIndex(questionIndex + 1);
      setMessageSent(true);
      console.error("Error fetching data:", error);
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
    if (isMobile) {
      element.style.height = "20px";
      element.style.height = Math.min(element.scrollHeight, 20 * 7) + "px";

      const number = parseInt(element.style.height.match(/\d+/)[0]);
      if (number > 20 && number < 239) {
        setContainerHight(element.style.height);
      }
    } else {
      element.style.height = "34px";
      if (element.scrollHeight >= 0 && element.scrollHeight < 188) {
        element.style.height = Math.min(element.scrollHeight, 34 * 7) + "px";
        const number = parseInt(element.style.height.match(/\d+/)[0]);
        if (number > 30 && number < 65) {
          setContainerHight(element.style.height);
        }
      } else {
        element.style.height = "188px";
        setContainerHight(0);
      }
    }
  };

  const handleOkWarning = () => {
    setShowWarning(false);
    setSearchOption("acrossFiles");
    setSelectedFile("  ");
  };

  const handleCancelWarning = () => {
    setShowWarning(false);
  };

  const chatRef = useRef(null);

  useEffect(() => {
    if (pathName) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  console.log("chatRef----->", chatRef);
  return (
    <Layout componentName="Chat">
      <Box
        sx={{
          height: isMobile ? "83%" : "85%",
          width: isMobile ? "94%" : "98%",
          backgroundColor: "white",
          borderRadius: "10px",
          display: "flex",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: { sm: "8em", md: "3em" },
            borderBottom: "1px solid lightGrey",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "space-between" : "space-around",
            flexDirection: "row",
            // flexDirection: {
            //   xs: "row",
            //   sm: "row",
            //   md: "row",
            //   xl: "row",
            //   lg: "row",
            // },
            gap: "1rem",
            paddingBottom: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <input
              type="radio"
              value="acrossFiles"
              checked={searchOption === "acrossFiles"}
              onChange={() => handleSearchOptionChange("acrossFiles")}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                paddingTop: "0.19rem",
              }}
            >
              Across
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <input
              type="radio"
              value="specificFileText"
              checked={searchOption === "specificFileText"}
              onChange={() => handleSearchOptionChange("specificFileText")}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                paddingTop: "0.19rem",
              }}
            >
              Specific
            </Typography>
          </Box>
          <Box sx={{ width: "140px" }}>
            <FormControl
              className={styles.chatFormControl}
              size="large"
              variant="outlined"
              fullWidth

              // style={{ marginTop: "1rem", border: `1px solid ${selectedFile ? '#a9a9a9' : ''}` }}
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
                style={{ textAlign: "left", height: "30px" }}
              >
                <MenuItem value="  ">
                  <em>Select file</em>
                </MenuItem>
                <MenuItem value="file1">File 1</MenuItem>
                <MenuItem value="file2">File 2</MenuItem>
                <MenuItem value="file3">File 3</MenuItem>
              </Select>
            </FormControl>
            <Dialog open={showWarning} onClose={handleCancelWarning}>
              <DialogTitle>
                <WarningOutlined
                  style={{ color: "#faad14", marginRight: "8px" }}
                />
                Warning
              </DialogTitle>
              <DialogContent>
                <Typography>
                  Searching across files is a costly, time-consuming process and
                  may result in inefficient results. Would you like to continue?
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
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {!messageSent && (
            <Box
              ref={chatRef}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "column",
                justifyContent: isMobile ? "flex-start" : "space-between",
                alignItems: isMobile ? "center" : "center",
                flexWrap: isMobile ? "" : "",
                height: isMobile
                  ? `calc(120% - ${containerHeight})`
                  : `calc(100% - ${containerHeight})`,
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "lightgrey #f5f5f5",
                scrollHeight: "3px",
                scrollPaddingRight: "3px",
                padding: "0.8rem",
                paddingLeft: isMobile ? "" : "20%",
                paddingRight: isMobile ? "" : "20%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  // paddingLeft: isMobile ? "15%" : "",
                  // paddingRight: isMobile ? "15%" : "",
                }}
              >
                {!isMobile ? (
                  <Typography variant="h4" textAlign={"center"}>
                    {" "}
                    {AM_CHAT}{" "}
                    <img src={amchatImg} alt="" className={styles.chatimg} />
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Box
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // paddingLeft: isMobile ? "15%" : "",
                    // paddingRight: isMobile ? "15%" : "",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign={"center"}
                  >
                    Hello, I’m AM-Chat
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign={"center"}
                  >
                    How can I help you today?
                  </Typography>
                </Box>
              </Box>
              <Box
              // sx={{display:'flex'}}
              >
                <Grid container spacing={2}>
                  {defaultQuestions.map((questions, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      key={index}
                      style={{ display: "flex" }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        className={styles.chatParagraphSuggestion}
                        onClick={() => handleSuggestionClick(questions)}
                        style={{ flex: 1, minHeight: 0, textAlign: "center" }}
                      >
                        {questions}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
          {messageSent && (
            <Box
              ref={scrollContainerRef}
              sx={{
                display: "flex",
                height: isMobile ? "100%" : "90%",
                overflowY: "auto",
                scrollbarWidth: "3px",
                scrollbarColor: "lightgrey #f5f5f5",
                scrollHeight: "3px",
                scrollPaddingRight: "3px",
                padding: "0.8rem",
                // flexWrap: 'wrap',
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {questions.map((item, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <div className={styles.responseContent}>
                    <div className={styles.askedQuestion}>
                      <img
                        src={uesrImg}
                        alt="User"
                        className={styles.userImage}
                      />
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        className={styles.askedQuestionText}
                        style={{ fontSize: "14px" }}
                      >
                        {" "}
                        {item.question}
                      </Typography>
                    </div>
                    {loading && (item?.answer == null || item?.answer == "") ? (
                      <div className={styles.response}>
                        <Skeleton active />
                      </div>
                    ) : (
                      <div className={styles.response}>
                        <img
                          src={responseImg}
                          alt="User"
                          className={styles.userImage}
                        />
                        <Typography
                          variant="subtitle1"
                          mt={1}
                          style={{ fontSize: "14px" }}
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
            display: "flex",
            justifyContent: "center",
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
              minHeight: "34px",
              overflowY: "auto",
              paddingRight: "4rem",
              scrollbarWidth: "thin",
              scrollbarColor: "lightgrey #f5f5f5",
              scrollHeight: "3px",
              scrollPaddingRight: "6px",
              scrollMarginRight: "6px",
              WebkitScrollbarCorner: {
                background: "transparent",
                paddingRight: "16px",
              },
              resize: "none",
            }}
            onPaste={handlePaste}
          />
          {inputValue && (
            <Box sx={{ position: "relative" }}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                className={styles.SendButton}
                onClick={handleSend}
              />
            </Box>
          )}
        </Box>
        <Box style={{ width: "100%", height: "1rem" }}>
          {errorMessage && (
            <Typography
              variant="body2"
              style={{ color: "red", textAlign: "center", marginTop: "0.4rem" }}
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
