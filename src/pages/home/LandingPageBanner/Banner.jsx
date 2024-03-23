import React from "react";
import Style from "./banner.module.css";
// import BannerImage from "../../../asset/b1.webp";
import BannerImage from "../../../asset/banner-img.png";
// import BannerImage1 from "../../../asset/Group.png";
import frame from "../../../asset/Frame 1.png";
// import backgroundSVGHome from "../../../asset/Layer1.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import { Link } from "react-router-dom";
import GroupImage from "../../../asset/groupImageOne.png";
import { Grid } from "antd";
import { Typography, useMediaQuery } from "@mui/material";
const Banner = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = useMediaQuery('(max-width:600px)');

  const smallTextStyles = isMobile ? {
    fontSize: "26px", 
    lineHeight: "1.5",
    fontWeight: "bold"
  } : {};

  return (
    <div
      className={Style.banner}
      style={{
        backgroundSize: "100% 90%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${GroupImage})`,
        backgroundPosition: "bottom",
      }}
    >
      <div className={Style.bannerContentClass}>
        <div>
          <Typography variant="h3" gutterBottom mt={3}  className={Style.bannerHeading} sx={smallTextStyles}>
            Unleash the
            <br />
            Power of your
            <br />
            Enterprise
            <br />
            Documents with
            <br />
            Gen AI
          </Typography>
        </div>
        <div className={Style.bannerPara}>
          <Typography variant="body2" gutterBottom mt={3} >
            Explore, learn and chat with the knowledge base created from <br />
            your enterprise documents.
          </Typography>
        </div>
        <div className={Style.bannerButton}>
          <Link to="/signIn" style={{ textDecoration: "none" }}>
            <GeneralButton
              name={"Get Started"}
              type={"submit"}
              color={"#f8fafc"}
              borderRadius={"30px"}
              backgroundColor={"#6366f1"}
              icons={frame}
              width={"140px"}
              height={"45px"}
            />
          </Link>
        </div>
      </div>
      {screens.sm || screens.lg ? (
        <div className="main_side_image_div">
          <img className={Style.bannerImage} src={BannerImage} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
