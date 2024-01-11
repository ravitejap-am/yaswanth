import React from "react";
import Style from "./banner.module.css";
// import BannerImage from "../../../asset/b1.webp";
import BannerImage from "../../../asset/Capture1-removebg-preview.png";
import frame from "../../../asset/Frame 1.png";
// import backgroundSVGHome from "../../../asset/Layer1.png";
import backgroundSVGHome from "../../../asset/—Pngtree—man in shirt smiles and_13146336 1.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";

const Banner = () => {
  return (
    <div
      className={Style.banner}
      // style={{ backgroundImage: `url(${backgroundSVGHome})` }}
    >
      <div>
        <div>
          <h1 className={Style.bannerHeading}>
            Unleash the
            <br />
            Power of
            <br />
            Conversational
            <br />
            Technology”
          </h1>
        </div>
        <div className={Style.bannerPara}>
          <p>
            Horem ipsum dolor sit amet, consectetur adipiscing elit. Horem ipsum
            dolor sit amet, consectetur adipiscing elit. sit amet, consectetur
            adipisc
          </p>
        </div>
        <div className={Style.bannerParaUnorderList}></div>
        <div className={Style.bannerBtn}>
          <div className={Style.bannerButton}>
            <GeneralButton name={"Watch Demo"} type={"submit"} color={"#fff"} />
            <img src={frame} alt="" className="home-banner-frame-icon" />
          </div>
        </div>
      </div>
      <div>
        <img className={Style.bannerImage} src={BannerImage} />
      </div>

      <div className={Style.dividerFirstHomePage}></div>
    </div>
  );
};

export default Banner;
