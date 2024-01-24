import React from "react";
import "./AIChatBot.css";
import LargeCardImage2 from "../../../asset/Frame.png";
import { Card } from "antd";
import Search from "../../../components/common/search/Search";
import SerchImages from "../../../asset/Group2290.png";

function AIChatBot() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    width: "80%",
  };

  const backgroundStyle = {
    backgroundImage: `url(${LargeCardImage2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  const contentArray = [
    "Can you tell me about GDPR policy?",
    "PCI compliance?",
    "PII compliance?",
    "Can you explain what's wrong with my lab report? ",
    " Can you explain the Pythagorean theorem?",
  ];

  return (
    <div className="AIChatBotMainDiv">
      <div style={containerStyle}>
        <div style={backgroundStyle} className="AI_Chat_bot_Center_div_content">
          <div className="AI_chat_bot_heading">
            <span className="AI_chat_title">AM Chat / GenAI Chat Bot</span>
          </div>
          <div className="AI_chat_second_heading">
            <span className="AI_chat_secont_title">
              Utilize the power of generative AI to interact with your
              documents.
            </span>
          </div>
          <div className="AI_chat_Parent_Card">
            <div className="AM_Chat_Main_Card">
              <div className="AM_Chat_Main_Card_Title_Div">
                <div className="AM_chat_first_title">
                  <div>Hello, I’m AM-Chat</div>
                  <div className="AM_chat_second_title">
                    How can I help you today?
                  </div>
                </div>
              </div>

              <div className="Example_main_div">
                <div className="Card_message_example_main">
                  {contentArray.map((content, index) => (
                    <p key={index} className="Card_message_example">
                      {content}
                    </p>
                  ))}
                </div>
              </div>

              <div className="AI_chat_input_box">
                <Search
                  name={
                    "Explore your organizational knowledge base using the power of GenAI."
                  }
                  searchImage={SerchImages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatBot;
