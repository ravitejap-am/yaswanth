import React from "react";
import Style from "./banner.module.css";
// import BannerImage from "../../../asset/b1.webp";
import BannerImage from "../../../asset/Capture1-removebg-preview.png";
import Check from "../../../asset/check.webp";

const Banner = () => {
  return (
    <div className={Style.banner}>
      <div>
        <div>
          <h1 className={Style.bannerHeading}>
            Explore with ease! Our smart AI easily finds the answers.
          </h1>
        </div>
        <div className={Style.bannerPara}>
          <p>Maximize text analytics affordably with</p>
        </div>
        <div className={Style.bannerParaUnorderList}>
          <ul className={Style.list}>
            <li>
              <span>
                {" "}
                <img src={Check} className={Style.checklogo} alt="" />{" "}
              </span>
              Efficient data lake management.
            </li>
            <li>
              <span>
                {" "}
                <img src={Check} className={Style.checklogo} alt="" />{" "}
              </span>
              AI-powered actionable insights.
            </li>
            <li>
              <span>
                {" "}
                <img src={Check} className={Style.checklogo} alt="" />{" "}
              </span>
              Simply ask in natural language.
            </li>
          </ul>
        </div>
        <div className={Style.bannerBtn}>
          <div className={Style.bannerButton}>
            <button className={Style.bannerBtn1}>Watch Demo</button>
          </div>
          <div className={Style.bannerButton}>
            <button className={Style.bannerBtn1}>Talks to Us</button>
          </div>
        </div>
      </div>
      <div>
        <img className={Style.bannerImage} src={BannerImage} />
      </div>
    </div>
  );
};

export default Banner;
