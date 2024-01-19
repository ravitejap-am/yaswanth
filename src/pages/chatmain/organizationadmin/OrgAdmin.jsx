import React, { useState } from 'react';
import './OrgAdmin.css';
import arrow from '../../../asset/inputarrow.png';
import docuementicon from '../../../asset/Group 23 (1).png';

const OrgAdmin = () => {
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
    <div className='orgadmin-amchat-main'>
      <div className='orgadmin-sidebar-amchat'>
        <h2>AM-Chat</h2>
        <button className='orgadmin-start-chat' onClick={handleStartChat}>
          StartChat
        </button>
      </div>
      <div className='orgadmin-chat-profile-container'>
        <div className='orgadmin-userchatHeader'>
          <div className='orgadmin-amchatmain-user-name'>
            <h2>Welcome, OrgAdmin Clayton</h2>
          </div>
          <div className='orgadmin-amchatmain-user-profile'>
            <h3>OrgAdmin Clayton Santos</h3>
          </div>
        </div>

        <div className='orgadmin-chat-profile'>
          <div className="orgadmin-chatui-card">
            <div className='orgadmin-chatui-text'>
              <div className="orgadmin-chatui-AmChat-text">
                <p>AM-Chat <img src="" alt="" /></p>
              </div>
              <div className='orgadmin-chat-hello-text'>
                <h2>Hello, I’m AM-Chat</h2>
                <p>How can I help you today?</p>
              </div>
            </div>
            <div className="orgadmin-trending-questions">
              <div className="orgadmin-question-row-first">
                <p onClick={() => handleQuestionClick('Could you help me with the maternity policy of my organization?')}>Could you help me with the <br /> maternity policy of my organization?</p>
                <p onClick={() => handleQuestionClick('Can you tell me about GDPR compliance Which I should follow in my organization?')}>Can you tell me about GDPR compliance. <br />Which I should follow in my organization?</p>
              </div>
              <div className="orgadmin-question-row-second">
                <p onClick={() => handleQuestionClick('Can you explain me the Pythagoras theorem based on Pythagoras theorem based on')}>Can you explain me the<br /> Pythagoras theorem based on</p>
                <p onClick={() => handleQuestionClick('Can you tell me  what`s wrong in my lab reports? ')}>Can you tell me  what`s<br /> wrong in my lab reports?</p>
                <p onClick={() => handleQuestionClick('Can you explain me the quantum mechanics? ')}> Can you explain me the <br /> quantum mechanics?  </p>
              </div>
            </div>
            <div className="orgadmin-input-main">
              <div className="orgadmin-input-container">
                <input
                  type="text"
                  placeholder="Ask Anything"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                />
              </div>
              <div className='orgadmin-chat-arrow' onClick={arrowButton}>
                <img src={arrow} alt="arrowpic" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgAdmin;
