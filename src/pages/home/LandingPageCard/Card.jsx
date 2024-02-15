import React from "react";
import Style from "./card.module.css";
const Card = ({ cardHeading, cardContent, cardImage }) => {
  return (
    <div className={Style.card}>
      <div className={Style.cardImg}>
       <img src={cardImage} className={Style.cardLogo} alt="cardLogo"/></div>
      <div className={Style.box}>
        <div className={Style.cardHeading}>
          <h3>{cardHeading}</h3>
        </div>
        <div className={Style.cardContent}>
          <p>{cardContent}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
