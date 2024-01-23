import React, { useState } from 'react';
import './OrgAdminChatPage.css';
import arrow from '../../../asset/inputarrow.png';
import documentIcon from '../../../asset/Group 23 (1).png'; // Renamed variable to follow convention

const OrgAdminChatPage = () => {
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
        <div className='orgadminchat-screen'>
            <div className='chat-container'>
                <div className='chat-header'>
                    <div className='chat-user-name'>
                        <h2>Welcome, Clayton</h2>
                    </div>
                    <div className='chat-user-profile'>
                        <h3>Clayton Santos</h3>
                    </div>
                </div>
                <div className='chat-content-head'>

                    <div className='chat-content'>
                        <div className="chat-ui-card">
                            <div className='chat-ui-text'>
                                <div className="chat-ui-am-chat-text">
                                    <p>AM-Chat</p>
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
                                    <p onClick={() => handleQuestionClick('Can you tell me  what`s wrong in my lab reports? ')}>Can you tell me  what`s<br /> wrong in my lab reports?</p>
                                    <p onClick={() => handleQuestionClick('Can you explain me the quantum mechanics? ')}> Can you explain me the <br /> quantum mechanics?  </p>
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
                    <div className='orgadmin-cards'>
                        <div className='orgadmindoc-card'>
                            <div className='orgadmindocument-card'>
                                <img className='document-icon' src={documentIcon} alt="Document" />
                                <h2>Documents</h2>
                            </div>
                        </div>
                        <div className='orgadmin-activeuser-card'>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrgAdminChatPage;
