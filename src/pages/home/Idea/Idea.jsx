import React from "react";
import "./Idea.css";
import tickSign from "../../../asset/tick.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import ideaImage from "../../../asset/about.png";
import BannerImage3 from "../../../asset/banner-box-2.png";
import { Link } from "react-router-dom";
import { Grid } from "antd";
function Idea() {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <div className="idea_page_main">
      <div className="text-content">
        <div className="bannerHeading">
          We provide a Secure, Personalized and Scalable Gen AI Chatbot for your
          organisation
        </div>
        <div className="bannerPara">
          <span>
            Use the knowledge of your organisational documents at your
            fingertips.
            <br /> Upload your organisational documents to a completely secure
            Gen AI solution and start interacting with your documents.
          </span>
        </div>
        <div className="bannerParaUnorderList">
          <div className="bannerPareInnerTextStyle">
            <img src={tickSign} alt="" style={{ marginRight: "10px" }} />
            <span className="">
              {" "}
              Your organisational documents are completely secure
            </span>
          </div>
          <div className="bannerPareInnerTextStyle">
            <img src={tickSign} alt="" style={{ marginRight: "10px" }} />
            <span>
              Your documents are loaded in a private instance of Gen AI modal
            </span>
          </div>
        </div>
        <div className="bannerButton">
          <Link to="/signIn" style={{ textDecoration: "none" }}>
            <GeneralButton
              name={"Start Chat"}
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
      {screens.lg || screens.sm ? (
        <div>
          <img src={ideaImage} className="image-style" alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Idea;
