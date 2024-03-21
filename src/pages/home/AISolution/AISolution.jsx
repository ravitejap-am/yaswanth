import React from "react";
import "./AISolution.css";
import img1 from "../../../asset/img1.png";
import img2 from "../../../asset/img2.png";
import img3 from "../../../asset/img3.png";
import img4 from "../../../asset/img4.png";

function AISolution() {
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
        "Learn & Explore what’s hidden knowledge in your organsational document.",
    },
    {
      img: img2,
      title: "Multilingual Support",
      subTitle: "Use the Gen AI based chat in your language. ",
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
        <span>Explore a Gen AI Chatbot Solution for your Business</span>
      </div>
      <br />
      <div className="AI_Solution_title_style2">
        <span>It's completely secured, personalized and scalable.</span>
      </div>
      <div className="AI_Solution_Content_Main_Style">
        <div className="AI_Solution_Content_Style">
          {columns.map((column, index) => (
            <div className="AI_Solution_Content_Child_div" key={index}>
              <div className="AI_Solution_Content_Image_Style">
                <img src={column.img} alt={`Image ${index + 1}`} />
              </div>
              <span className="AI_Solution_Content_Title_Style">
                {column.title}
              </span>
              <span className="AI_Solution_Content_SubTitle_Style">
                {column.subTitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AISolution;
