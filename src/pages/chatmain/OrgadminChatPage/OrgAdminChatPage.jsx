import React, { useEffect, useState } from "react";
import "./OrgAdminChatPage.css";
import arrow from "../../../asset/inputarrow.png";
import documentIcon from "../../../asset/Group 23 (1).png";
import base from "../../../asset/Base.png";
import vector from "../../../asset/vectoricon.png";
import documentIconpink from "../../../asset/Group 23.png";
import orgvector from "../../../asset/orgVector (1).png";
import AMChatHeader from "../../AMChatAdmin/AMChatHeader/AMChatHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as constants from "../../../constants/Constant";
import { selectUser } from "../../../store/authSlice";
import OrganizationAdminHeader from "../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader";

const OrgAdminChatPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => {
            return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };
  const decodedToken = decodeJWT(jwt);
  const organisationId = decodedToken ? decodedToken.organisationId : null;
  const [documentCount, setDocumentCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [chat, setChat] = useState("");
  const [page, setPage] = useState(0);
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem("firstName");
    setFirstName(storedFirstName);
  }, []);

  useEffect(() => {
    if (organisationId) {
      fetchDocumentCount();
      fetchUserList();
    }
  }, [organisationId]);

  const fetchDocumentCount = () => {
    fetch(`${constants.BASE_API_URL}/document/${organisationId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDocumentCount(data.totalElements);
      })
      .catch((error) => console.error("Error fetching document count:", error));
  };

  const fetchUserList = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/userlist/?page=0&size=5&sortField=createdAt&sortDirection=desc&email=&active=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.log("400 error ");
        } else if (response.status === 405) {
          console.log("response 405");
        } else {
          console.log("response 405");
        }
        return;
      }
      const responseData = await response.json();
      setActiveUsersCount(responseData.totalCount); // Set active users count from the API response
    } catch (error) {
      navigate("/maintenance");
    }
  };

  const users = [
    {
      profile_img: { base },
      username: "Radhi Gupta",
      lastseen: "Last chat time : 5:00 PM",
    },
    {
      profile_img: { base },
      username: "Radhi Gupta",
      lastseen: "Last chat time : 5:00 PM",
    },
    {
      profile_img: { base },
      username: "Radhi Gupta",
      lastseen: "Last chat time : 5:00 PM",
    },
    {
      profile_img: { base },
      username: "Radhi Gupta",
      lastseen: "Last chat time : 5:00 PM",
    },
  ];

  const handleStartChat = () => {
    console.log("start chatButton clicked");
  };

  const handleQuestionClick = (question) => {
    console.log(`Question clicked: ${question}`);
    setChat(question);
  };

  const arrowButton = () => {
    console.log("arrowButton clicked");
    console.log(chat);
  };

  return (
    <div className="orgadminchat-screen">
      <div className="orgadminchat-chat-container">
        <div className="orgadminchat-chat-header">
          <OrganizationAdminHeader
            componentName={`Welcome ${firstName || ""}`}
            name={firstName || ""}
            profileImageSrc={base}
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
        </div>
        <div className="hi-main">
          <div className="orgadminchat-chat-content-head">
            <div className="orgadminchat-chat-content">
              <div className="orgadminchat-chat-ui-card">
                <div className="orgadminchat-chat-ui-text">
                  <div className="orgadminchat-chat-ui-am-chat-text">
                    <p>
                      AM-Chat{" "}
                      <img className="orgchat-icon" src={orgvector} alt="" />
                    </p>
                  </div>
                  <div className="orgadminchat-chat-hello-text">
                    <h2>Hello, I’m AM-Chat</h2>
                    <p>How can I help you today?</p>
                  </div>
                </div>
                <div className="orgadminchat-trending-questions">
                  <div className="orgadminchat-question-row-first">
                    <p
                      onClick={() =>
                        handleQuestionClick(
                          "Could you help me with the maternity policy of my organization?"
                        )
                      }
                    >
                      Could you help me with the <br /> maternity policy of my
                      organization?
                    </p>
                    <p
                      onClick={() =>
                        handleQuestionClick(
                          "Can you tell me about GDPR compliance Which I should follow in my organization?"
                        )
                      }
                    >
                      Can you tell me about GDPR compliance. <br />
                      Which I should follow in my organization?
                    </p>
                  </div>
                  <div className="orgadminchat-question-row-second">
                    <p
                      onClick={() =>
                        handleQuestionClick(
                          "Can you explain me the Pythagoras theorem based on Pythagoras theorem based on"
                        )
                      }
                    >
                      Can you explain me the
                      <br /> Pythagoras theorem based on
                    </p>
                    <p
                      onClick={() =>
                        handleQuestionClick(
                          "Can you tell me  what`s wrong in my lab reports? "
                        )
                      }
                    >
                      Can you tell me what`s
                      <br /> wrong in my lab reports?
                    </p>
                    <p
                      onClick={() =>
                        handleQuestionClick(
                          "Can you explain me the quantum mechanics? "
                        )
                      }
                    >
                      {" "}
                      Can you explain me the <br /> quantum mechanics?{" "}
                    </p>
                  </div>
                </div>
                <div className="orgadminchat-orgadmin-input-main">
                  <div className="orgadminchat-orgadmin-input-container">
                    <input
                      type="text"
                      placeholder="Ask Anything"
                      value={chat}
                      onChange={(e) => setChat(e.target.value)}
                    />
                  </div>
                  <div
                    className="orgadminchat-chat-arrow"
                    onClick={arrowButton}
                  >
                    <img src={arrow} alt="arrowpic" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hi">
              <div className="orgadminchat-orgadmin-cards">
                <div className="orgadminchat-orgadmindoc-card">
                  <div className="activeuser-vectorimage">
                    <div className="orgadminchat-orgadmindocument-card">
                      <img
                        className="orgadminchat-document-icon"
                        src={documentIcon}
                        alt="Document"
                      />
                      <h2>Documents</h2>
                      <h1 className="document-value">{documentCount}</h1>
                    </div>
                    <div className="vector-card-image">
                      <img
                        className="vector-image-activeuser"
                        src={vector}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="orgadmin-vectorimage">
                  <div className="orgadminchat-orgadmin-activeuser-card">
                    <img
                      className="orgadminchat-activeuser-icon"
                      src={documentIconpink}
                      alt="Document"
                    />
                    <h2>Active Users</h2>
                    <h1 className="activeusers-value">
                      {activeUsersCount}
                    </h1>{" "}
                    {/* Display active users count */}
                  </div>
                  <div className="vector-card-image">
                    <img
                      className="vector-image-activeuser"
                      src={vector}
                      alt=""
                    />
                  </div>
                </div>

                <div className="orgadmin-activeuser-card">
                  <div className="user-table">
                    {users.map((user, index) => (
                      <div key={index}>
                        <img className="orgadmin-profile-pic" src={base} />
                        {user.username}
                        <td className="orgadmin-lastseen">{user.lastseen}</td>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgAdminChatPage;
