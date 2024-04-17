import React from "react";
import "./AISolution.css";
import img1 from "../../../asset/img1.png";
import img2 from "../../../asset/img2.png";
import img3 from "../../../asset/img3.png";
import img4 from "../../../asset/img4.png";
import { Typography, useMediaQuery } from "@mui/material";
import AIsolutionCard from "../../../components/AIsolutionCard/AIsolutionCard";
import lang1 from "../../../asset/lang1.png"


function AISolution() {

  const isMobile = useMediaQuery('(max-width:600px)');

  const smallTextStyles = isMobile ? {
    fontSize: "23px", 
    lineHeight: "1.5",
    // fontWeight: "bold"
  } : {};

  const columns = [
    {
      img: img4,
      title: "Analytics",
      subTitle: "Find about the usage of your organisational knowledge base.",
    },
    {
      img: img3,
      title: "Insights",
      subTitle:
        "Chat & Explore what’s hidden knowledge in your organsational document.",
    },
    {
      img:lang1,
      title: "Multilingual Support",
      subTitle: "Use the Gen AI based chat in your language, say goodbye to language barriers. ",
    },
    {
      img: img1,
      title: "Gen AI Chatbots",
      subTitle:
        "Use the power of generative AI to interact with your document.",
    },
  ];

  return (
    <div className="AI_Solution_Main_div">
      <div className="AI_Solution_title_style">
        <Typography variant="h4" sx={smallTextStyles}>Explore a Gen AI Chatbot Solution for your Business</Typography >
      </div>
      <br />
      <div className="AI_Solution_title_style2">
        <Typography variant="body2" style={{fontSize:'16px'}}>It's completely secured, personalized and scalable.</Typography >
      </div>
      <div className="AI_Solution_Content_Main_Style">
        <div className="AI_Solution_Content_Style">
          {columns.map((column, index) => (
            <AIsolutionCard column={column} index={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AISolution;
