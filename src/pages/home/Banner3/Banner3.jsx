import React from "react";
import Style from "./banner.module.css";
import Logo1 from "../../../asset/svgexport-7.svg";
import Logo2 from "../../../asset/svgexport-8.svg";
import Image from "../../../asset/Milestones of business projects-amico.webp";
// import Carousal from '../Carousal/'

export const Banner3 = () => {
  return (
    <div className={Style.banner3}>
      <div className={Style.insideBanner3}>
        <h1 className={Style.bannerHeading}>Enterprise Grade AI</h1>
        <div className={Style.banner3box}>
          <div className={Style.banner3boxImage}>
            <img src={Image} className={Style.bannerImage} alt="" />
          </div>
          <div>
            <div className={Style.bannerContent}>
              <span>
                <img src={Logo1} className={Style.logo} alt="" />
              </span>
              <div>
                <h4 className={Style.contentHeading}>
                  Data Security and privacy
                </h4>
                <p className={Style.contentPara}>
                  The data never leaves our servers or is shared with anyone.
                </p>
              </div>
            </div>

            <div className={Style.bannerContent}>
              <span>
                <img src={Logo2} className={Style.logo} alt="" />
              </span>
              <div>
                <h4 className={Style.contentHeading}>
                  100% correct , 100% of the time.
                </h4>
                <p className={Style.contentPara}>
                  The AI is impervious to generative AI hallucinations and is
                  correct all the time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
