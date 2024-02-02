import React, { useState } from "react";
import "./OrgAdminChatPage.css";
import arrow from "../../../asset/inputarrow.png";
import documentIcon from "../../../asset/Group 23 (1).png";
import base from "../../../asset/Base.png";
import vector from "../../../asset/vectoricon.png";
import documentIconpink from "../../../asset/Group 23.png";
import orgvector from "../../../asset/orgVector (1).png";
// import './OrgAdminChatPageSidebar.module.css'

const OrgAdminChatPage = () => {
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

  const [chat, setChat] = useState("");

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
          <div className="orgadminchat-user-name">
            <h2>Welcome, Jack</h2>
          </div>
          <div className="orgadminchat-chat-user-profile-main">
            <div className="orgadminchat-chat-user-profile-image">
              <img className="orgadmin-profilepic" src={base} alt="" />
            </div>
            <div className="orgadminchat-chat-user-profile">
              <h3>Jack Markban</h3>
              <p>Marvel web</p>
            </div>
          </div>
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
                      <h1 className="document-value">500</h1>
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
                    <h1 className="activeusers-value">500</h1>
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

{
  /* <div className='orgadminchat-orgadmin-cards'>
<div className='orgadminchat-orgadmindoc-card'>
    <div className='orgadminchat-orgadmindocument-card'>
        <img className='orgadminchat-document-icon' src={documentIcon} alt="Document" />
        <h2>Documents</h2>
    </div>
</div>
<div className='orgadminchat-orgadmin-activeuser-card'>
</div>
</div> */
}
