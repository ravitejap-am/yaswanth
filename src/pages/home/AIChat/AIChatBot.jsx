import React from "react";
import "./AIChatBot.css";
import LargeCardImage2 from "../../../asset/Frame.png";
import { Card } from "antd";
import Search from "../../../components/common/search/Search";

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
    "ipsum dolor sit ggipsum dolor sit",
    "ipsum dolor dolor sit",
    "ipsum dolor sit ggipsum dolor sit",
    "ipsum dolor dolor sit",
    "ipsum dolor sit ggipsum dolor sit",
    "ipsum dolor dolor sit",
  ];

  return (
    <div className="AIChatBotMainDiv">
      <div style={containerStyle}>
        <div style={backgroundStyle} className="AI_Chat_bot_Center_div_content">
          <div className="AI_chat_bot_heading">
            <span className="AI_chat_title">AI Chat Bot</span>
          </div>
          <div className="AI_chat_second_heading">
            <span className="AI_chat_secont_title">
              Horem ipsum dolor sit amet, consectetur adipiscing elit. Horem
              ipsum dolor sit amet,.
            </span>
          </div>
          <div className="AI_chat_Parent_Card">
            <Card className="AM_Chat_Main_Card">
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
                <Search name={"Ask anything.."} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatBot;
