import React from "react";
import "./Idea.css";
import tickSign from "../../../asset/tick.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
import ideaImage from "../../../asset/ideaRectangle 21.png";
import BannerImage3 from "../../../asset/banner-box-2.png";

function Idea() {
  return (
    <div className="idea_page_main">
      <div className="idea_chid_div">
        <div>
          <div className="bannerHeading">
            We provide a secure, personalized, and scalable GenAI chatbot for
            your organization
          </div>
          <div className="bannerPara">
            <p>
              Use the knowledge of your organizational documents at your
              fingertips.
              <br /> Upload your org doc to a completely secure GenAI solution
              and start interacting with your documents
            </p>
          </div>
          <div className="bannerParaUnorderList">
            <div>
              <img src={tickSign} alt="" />{" "}
              <> Your organizational documents are completely secure</>
            </div>
            <div>
              <img src={tickSign} alt="" />{" "}
              <>
                Your documents are loaded in a private instance of GenAI modal
              </>
            </div>
            <div>
              <img src={tickSign} alt="" />{" "}
              <> None of your documents are completely secured</>
            </div>
            <br />

            <div className="bannerBtn">
              <div className="bannerButton">
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
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={ideaImage} alt="" />
          <div className="idea_page_banner_image3_style">
            <img className="bannerImage3" src={BannerImage3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Idea;
