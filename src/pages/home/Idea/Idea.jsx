import React from "react";
import "./Idea.css";
import tickSign from "../../../asset/tick.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import ideaImage from "../../../asset/about.png";
import BannerImage3 from "../../../asset/banner-box-2.png";
import { Link } from "react-router-dom";

function Idea() {
  return (
    <div className="idea_page_main">
      <div className="idea_chid_div">
        <div>
          <div className="bannerHeading">
            We provide a secure, personalized, and scalable Gen AI chatbot for
            your organization
          </div>
          <div className="bannerPara">
            <p>
              Use the knowledge of your organizational documents at your
              fingertips.
              <br /> Upload your organizational documents to a completely secure
              Gen AI solution and start interacting with your documents.
            </p>
          </div>
          <div className="bannerParaUnorderList">
            <div className="bannerPareInnerTextStyle">
              <img src={tickSign} alt="" style={{ marginRight: "10px" }} />{" "}
              <> Your organizational documents are completely secure</>
            </div>
            <div className="bannerPareInnerTextStyle">
              <img src={tickSign} alt="" style={{ marginRight: "10px" }} />
              <p>
                Your documents are loaded in a private instance of Gen AI modal
              </p>
            </div>

            {/* <div className="bannerPareInnerTextStyle">
              <img src={tickSign} alt="" />{" "}
              <> None of your documents are completely secured</>
            </div> */}
            <br />

            <div className="bannerBtn">
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
          </div>
        </div>

        <div
          style={{
            // marginRight: "152",
            width: "40%",
            height: "60%",
          }}
        >
          <img src={ideaImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Idea;
