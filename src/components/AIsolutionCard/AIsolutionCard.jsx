import React from "react";
import { Typography } from "@mui/material"; 
import "./AiSolutionCard.css"


const AIsolutionCard = (props) => {
  const { column, index } = props
  return (
    <div className="AI_Solution_Content_Child_div" key={index}>
      <div className="AI_Solution_Content_Image_Style">
        <img src={column.img} alt={`Image ${index + 1}`} className="AI_Icon"/>
      </div>
      <Typography
        variant="h6"
        gutterBottom
        className="AI_Solution_Content_Title_Style"
      >
        {column.title}
      </Typography>
      <Typography
        variant="subtitle1"
        className="AI_Solution_Content_SubTitle_Style"
      >
        {column.subTitle}
      </Typography>
    </div>
  );
};

export default AIsolutionCard;
