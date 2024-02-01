import React, { useState } from 'react';
import './AmchatMainUser.css';
import arrow from '../../../asset/inputarrow.png'
import docuementicon from '../../../asset/Group 23 (1).png'
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import frame1 from '../../../asset/Frame 1.png'
import threedot from '../../../asset/threedot.png'
import base from '../../../asset/Base.png'
import vector1 from '../../../asset/VectorAmchat(1).png'

const AmchatMainUser = () => {
  const [chat, setChat] = useState('');

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
    <div className='amchat-main'>
      <div className='sidebar-amchat'>
        <h2>AM-Chat <img className='amchat-vector-img-sidebar' src={vector1} alt="" /></h2>
        <div className='startchat-button'>
          <GeneralButton
            name="Start New Chat"
            type="primary"
            color="white"
            backgroundColor="#6366F1"
            width="150px"
            padding="10px 16px"
            height="40px"
            borderRadius="30px"
            icons={frame1}
          />
        </div>
        <div className='orgadmin-chats'>
          <h3>Chats</h3>
          <p className='orgadmin-chat'>How to upload my Docume.<img className='orgadmin-threedot' src={threedot} alt="" /></p>
          <p>What is AM-Chat? <img className='orgadmin-threedot-two' src={threedot} alt="" /></p>
        </div>
      </div>
      <div className='chat-profile-container'>
        <div className='userchatHeader'>
          <div className='amchatmain-user-name'>
            <h2>Welcome, Clayton</h2>
          </div>
          <div className='amchatmain-user-profile'>
            <div className='amchaitmain-profilepic'>
              <img className='amchat-profile-pic' src={base} alt="" />
            </div>
            <div className='amchatmain-profilename'> 
            <h3>Clayton Santos</h3>
            </div>
          </div>
        </div>
        <div className='document-card'>
          <img className='document-icon' src={docuementicon} alt="" />
          <div className='document-upload-text'>
            <h3>Document Uploaded</h3>
            <h1 className='document-quantity'>500</h1>

          </div>

        </div>
        <div className='chat-profile'>

          <div className="chatui-card">
            <div className='chatui-text'>
              <div className="chatui-AmChat-text">
                <p >AM-Chat <img className='amchat-vector-img' src={vector1} alt="" /> </p>
              </div>
              <div className='chat-hello-text'>
                <h2>Hello, I’m AM-Chat</h2>
                <p>How can I help you today?</p>
              </div>
            </div>
            <div className="trending-questions">
              <div className="question-row-first">
                <p onClick={() => handleQuestionClick('Could you help me with the maternity policy of my organization?')}>Could you help me with the <br /> maternity policy of my organization?</p>
                <p onClick={() => handleQuestionClick('Can you tell me about GDPR compliance Which I should follow in my organization?')}>Can you tell me about GDPR compliance. <br />Which I should follow in my organization?</p>
              </div>
              <div className="question-row-second">
                <p onClick={() => handleQuestionClick('Can you explain me the Pythagoras theorem based on Pythagoras theorem based on')}>Can you explain me the<br /> Pythagoras theorem based on</p>
                <p onClick={() => handleQuestionClick('Can you tell me  what`s wrong in my lab reports? ')}>Can you tell me  what`s<br /> wrong in my lab reports?</p>
                <p onClick={() => handleQuestionClick('Can you explain me the quantum mechanics? ')}> Can you explain me the <br /> quantum mechanics?  </p>
              </div>
            </div>
            <div className="input-main">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ask Anything"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                />
              </div>
              <div className='chat-arrow' onClick={arrowButton}>
                <img src={arrow} alt="arrowpic" />
              </div>
            </div>
          </div>
        </div>
        <div className="userprofile-footer">
          <p>@2024. All rights reserved by Areteminds</p>
        </div>
      </div>

    </div>
  );
};

export default AmchatMainUser;
