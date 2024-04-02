import React, { useState } from "react";
import "./AIChatBot.css";
import Search from "../../../components/common/search/Search";
import SerchImages from "../../../asset/Group2290.png";
import { Typography } from "@mui/material";

function AIChatBot() {
  const [alertShown, setAlertShown] = useState(false);
  const contentArray = [
    "Can you tell me about GDPR policy?",
    "PCI compliance?",
    "PII compliance?",
    "Can you explain what's wrong with my lab report?",
    "Can you explain the Pythagorean theorem?",
  ];

  const handleSearchClick = () => {
    // Update the state to show the alert
    setAlertShown(true);
    // Additional logic can be added here if needed
  };

  return (
    <div className="AIChatBotMainDiv">
      <div className="AI_Chat_bot_Center_div_content">
        <div className="AI_chat_bot_heading">
          <Typography variant="h5" className="AI_chat_title">AM-Chat / Gen AI Chatbot</Typography>
        </div>
        <div className="AI_chat_second_heading">
          <Typography variant="subtitle2" className="AI_chat_secont_title">
            Utilize the power of generative AI to interact with your documents.
          </Typography >
        </div>
        <div className="AI_chat_Parent_Card">
          <div className="AM_Chat_Main_Card">
            <div className="AM_Chat_Main_Card_Title_Div">
              <div className="AM_chat_first_title">
                <Typography variant="h6" fontWeight="bold">Hello, I’m AM-Chat</Typography>
                <Typography variant="body2" className="AM_chat_second_title">
                  How can I help you today?
                </Typography>
              </div>
            </div>
            <div className="Example_main_div">
              <div className="Card_message_example_main" style={{marginBottom: "8px"}}>
                {contentArray.map((content, index) => (
                  <Typography variant="caption" color="#94a3b8" gutterBottom mt={2} key={index} className="Card_message_example">
                    {content}
                  </Typography>
                ))}
              </div>
            </div>
            <div className="AI_chat_input_box">
              <Search
                name={
                  "Explore your organisational knowledge base using the power of GenAI."
                }
                searchImage={SerchImages}
                onClick={handleSearchClick}
                readOnly={true}
              />
              {alertShown && (
                <Typography variant="body2" className="alert-message">
                  Please contact our sales team at sales@areteminds.com
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatBot;
