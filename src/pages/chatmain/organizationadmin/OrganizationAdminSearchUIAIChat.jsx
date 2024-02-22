import React, { useEffect, useState } from "react";
import Styles from "../../AMChatAdmin/SearchUIAMChat.jsx/SearchUIAIChat.module.css";
import { Card } from "antd";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Group2290 from "../../../asset/Group2290.png";
import Search from "../../../components/common/search/Search";
// import AMChatHeader from "../AMChatHeader/AMChatHeader";
import { useNavigate } from "react-router-dom";
import { useMessageState } from "../../../hooks/useapp-message";
import * as constants from "../../../constants/Constant";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../../store/authSlice";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import AMChatHeader from "../../AMChatAdmin/AMChatHeader/AMChatHeader";
import ChatSearch from "../../../components/common/chatSearch/ChatSearch";
import './OrganizationAdmin.css'

function OrganizationAdminSearchUIAIChat() {
  const [firstName, setFirstName] = useState("");
  const [responseData, setResponseData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const navigate = useNavigate();
  const [chat, setChat] = useState("");

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstNameOrganisation");
    setFirstName(storedFirstName || "");
  }, []);

  useEffect(() => {
    if (!jwt) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${constants.BASE_API_URL}/user/chat/dummy`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jwt]);

  const searchStyles = {
    width: "96%",
    height: "70px",
    borderRadius: "35px",
    border: "1px solid #94a3b8",
    color: "#94a3b8",
    paddingLeft: "30px",
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/chat/dummy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ query: searchQuery }), // Send the user input as query
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(); // Call handleSubmit when Enter key is pressed
    }
  };

  const handleSearchImageClick = () => {
    navigate("/chat");
    handleSubmit();
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <AMChatHeader
          componentName={`Welcome ${firstName || ""}`}
          name={firstName || ""}
          profileImageSrc={profile}
          customStyle={{
            containerStyle: {
              display: "flex",
              borderRadius: "8px",
            },
            imageStyle: {
              width: "50%",
              height: "70%",
            },
            textStyle: {
              color: "blue",
              fontWeight: "bold",
            },
          }}
        />

        <Card className={Styles.superAdminCardStyles}>
          <div className={Styles.responseContainer}>
            {responseData && responseData.data && (
              <div className={Styles.chatBubble}>{responseData.data}</div>
            )}
          </div>
          <div className='chat_container'>
            {/* <Search
              name={"Ask anything.."}
              style={searchStyles}
              searchImage={Group2290}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onSearchImageClick={handleSearchImageClick}
              onKeyPress={handleKeyPress}
            /> */}
              <ChatSearch
                name={'Ask anything..'}
                style={"searchStyles"}
                searchImage={Group2290}
                onSearchImageClick={handleSearchImageClick}
                readOnly={false}
                chat={chat}
                setChat={setChat}
              />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OrganizationAdminSearchUIAIChat;
