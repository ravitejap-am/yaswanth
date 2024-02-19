import React from "react";
import Style from "./largeCard.module.css";
// import LargeCardImage from '../../../asset/Data analysis-amico.webp'

const LargeCard = ({
  largeCardImageInput,
  largeCardHeading,
  largeCardContent,
  alignmentLargeCard,
}) => {
  return (
    <>
      {
        (alignmentLargeCard==="left" ? (
          <div className={Style.largeCardLeft}>
            <div className={Style.largeCardImage}>
              <img
                src={largeCardImageInput}
                className={Style.largeImage}
                alt=""
              />
            </div>
            <div className={Style.largeCardContent}>
              <h3 className={Style.largeCardContentHeading}>
                {largeCardHeading}
              </h3>
              <p className={Style.largeCardContentPara}>{largeCardContent}</p>
            </div>
          </div>
        ) : (
          <div className={Style.largeCardRight}>
            <div className={Style.largeCardContentRight}>
              <h3 className={Style.largeCardContentHeading}>
                {largeCardHeading}
              </h3>
              <p className={Style.largeCardContentPara}>{largeCardContent}</p>
            </div>
            <div className={Style.largeCardImage}>
              <img
                src={largeCardImageInput}
                className={Style.largeImage}
                alt=""
              />
            </div>
          </div>
        ))
      }
    </>
  );
};

export default LargeCard;
