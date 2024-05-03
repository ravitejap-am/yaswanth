import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { Layout, Menu, Grid, Drawer } from "antd";
import { navLinks } from "./sidebar";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  getChatSessions,
  getIndividualChatSessions,
} from "../../apiCalls/ApiCalls";
import ShortTextIcon from "@mui/icons-material/ShortText";
import defaultImage from "../../asset/defaultProfile.jpg";
import { Dropdown, Space } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { icons } from "antd/es/image/PreviewGroup";
import "./sidebarIndex.css";
import { scopes } from "../../constants/scopes";
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
    setInputValue,
    inputValue,
    componentName,
    sessionHistory,
    permitedScopes,
  } = props;
  console.log("role", role, "patname", pathname, "props", props);
  const [visible, setVisible] = useState(false);
  const headerImage = localStorage.getItem("userImageUrl") ?? defaultImage;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  const handleViewProfile = () => {
    window.location.href = "/Info";
  };

  const itemsOne = [
    {
      label: "View Profile",
      key: "0",
      icon: <PersonIcon />,
      onClick: handleViewProfile,
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlinedIcon />,
      onClick: handleLogout,
    },
  ];
  const itemsTwo = [
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlinedIcon />,
      onClick: handleLogout,
    },
  ];

  const items = permitedScopes.includes(scopes.UR) ? itemsOne : itemsTwo;

  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleAddChat = async () => {
    try {
      onClose();
      console.log("is new chat--->", isNewChat);
      setIsChatOpen(!isChatOpen);
      setMessageSent(false);
      setIsNewChat(false);
      setQuestionIndex(0);
      setQuestions([]);
      setSessionId("");
      console.error("please add the chat");
    } catch (error) {
      console.log("error in fetching chat session list", error);
    }
  };

  const showPreviousChats = async (id) => {
    onClose();
    try {
      console.log("previous chats id---->", id);

      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
      setPageLoading(true);
      const response = await getIndividualChatSessions(id, headers);

      console.log("response--->12", response);
      const modifiedData = response?.data;
      const changedData = modifiedData?.data.map((data, index) => {
        return {
          questionId: index,
          question: data?.query,
          answer: data?.response,
          answerData: true,
        };
      });
      console.log("changed data--->", changedData);
      setQuestionIndex(changedData?.length);
      setQuestions(changedData);
      setMessageSent(true);
      setSessionId(id);
      setPageLoading(false);
      setInputValue("");
      setSessionId(id);
      setPageLoading(false);
      // setSessionHandler(id);
    } catch (error) {
      console.log("throwing error in chat");
      setPageLoading(false);
    }
  };
  const sessionRendering = (data) => {
    return (
      <>
        {data?.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px",
            }}
            className="hoverDiv"
          >
            <p
              style={{
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                cursor: "pointer",
                color: "black",
                paddingTop: "0.5em",
                fontFamily: "Montserrat",
              }}
              onClick={() => {
                showPreviousChats(item.id);
              }}
            >
              {item?.session_title.split(":")[4]}
            </p>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "10px",
          borderBottom: "1px solid #b4b4b4",
          paddingRight: "10px",
          // paddingTop: '2px',
          // paddingBottom: '2px',
        }}
      >
        <ShortTextIcon
          sx={{ fontSize: 40, color: "#676767" }}
          onClick={onOpen}
        />
        <Typography variant="h5" color={"#312e81"}>
          {componentName.split(" ").length > 2
            ? componentName.split(" ").slice(0, 1).join(" ") + "..."
            : componentName}
        </Typography>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <img
            src={headerImage}
            alt=""
            style={{
              height: "44px",
              width: "44px",
              borderRadius: "50%",
              marginRight: "0.6em",
              paddingBottom: "2px",
              paddingTop: "2px",
            }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      </Box>

      <Drawer
        title={
          <Typography variant="h5" sx={{ color: "black" }}>
            Menu
          </Typography>
        }
        placement="left"
        closable={true}
        onClose={onClose}
        open={visible}
        mask
        style={{
          backgroundColor: "rgb(248, 250, 252)",
          width: "75%",
        }}
        className="closeIcon"
      >
        {navLinks[role]?.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none" }}
              className="hoverDiv"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "white",
                  textDecoration: "none",
                  padding: "8px",
                }}
              >
                {React.cloneElement(item.icon, {
                  style: {
                    color: item?.activeLinks.includes(pathname.split("/")[1])
                      ? "#4F46E5"
                      : "black",
                  },
                })}

                <Typography style={{ color: "black" }}>{item.name}</Typography>
              </Box>
            </Link>
          );
        })}
        {(role == "ORG_ADMIN" || role == "USER") &&
          (pathname == "/chat" || pathname == "/user") &&
          permitedScopes.includes(scopes.CHC) && (
            <Link
              to="/chat"
              style={{ textDecoration: "none" }}
              className="hoverDiv"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  padding: "8px",
                }}
                onClick={handleAddChat}
              >
                <AddIcon style={{ color: "black" }} />

                <Typography style={{ color: "black" }}>New Chat</Typography>
              </Box>
            </Link>
          )}
        {(role == "ORG_ADMIN" || role == "USER") &&
          (pathname == "/chat" || pathname == "/user") && (
            <>
              <Typography variant="h6" sx={{ color: "black" }}>
                Sessions
              </Typography>
              <Box
                sx={{
                  height: "95%",
                  overflowY: "auto",
                }}
                className="chat_history"
              >
                {sessionHistory["today"]?.length > 0 && (
                  <>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      Today
                    </Typography>
                    {sessionRendering(sessionHistory["today"])}
                    <br />
                  </>
                )}

                {sessionHistory["yesterday"]?.length > 0 && (
                  <>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      Yesterday
                    </Typography>
                    {sessionRendering(sessionHistory["yesterday"])}
                    <br />
                  </>
                )}

                {sessionHistory["past_7_days"]?.length > 0 && (
                  <>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      Previous 7 Days
                    </Typography>
                    {sessionRendering(sessionHistory["past_7_days"])}
                    <br />
                  </>
                )}

                {sessionHistory["past_30_days"]?.length > 0 && (
                  <>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      Previous 30 Days
                    </Typography>
                    {sessionRendering(sessionHistory["past_30_days"])}
                  </>
                )}
                {/* {console.log('chat history', chatHistory)}
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
                     
                      <p
                        style={{
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%',
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
            </>
          )}
      </Drawer>
    </>
  );
}

export default MobileHeader;
