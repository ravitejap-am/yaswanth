import React, { useEffect, useState } from "react";
import "./RightPlan.css";
import Tick1 from "../../../asset/tick.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/Frame 1.png";
function RightPlan() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <div className="Right_Plan_Main_Card">
        <br />
        <br />
        <br />
        <div className="Right_Plan_Top_Content">
          <div>
            <p className="Right_Plan_Top_Content_Title">
              Find Your Right Plan{" "}
            </p>
            <p className="Right_Plan_Top_Content_SubTitle">
              Use one of the plan from below based on your need.
            </p>
          </div>
        </div>

        <div className="Right_Plan_Three_Container">
          <div className="Right_Plan_Content">
            <div>
              <p className="Right_Plan_Content_Title">Freemium</p>
              <p className="Right_Plan_Content_Sub_Div">
                {" "}
                Revolutionize keywords search into your document with our free
                plan.
              </p>
            </div>

            <div>
              <p className="Right_Plan_Content_Price">
                <span className="price">$ 9.99</span>
                <span className="per-month">/Month</span>
              </p>
            </div>
            <div
              className="Right_Plan_Gernal_Button"
              onClick={() => scrollToElement("Contact_Up")}
            >
              <GeneralButton
                name={"Get Started"}
                type={"Get Started"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"282.001px"}
                height={"45px"}
              />
            </div>

            <div className="Right_Plan_Below_Content">
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">Max 2 users</p>
              </div>
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">
                  Max 5 Documents
                </p>
              </div>
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">
                  Upload size 2 MB
                </p>
              </div>
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">
                  Max 10 chats free
                </p>
              </div>
            </div>
          </div>

          <div className="Right_Plan_Content">
            <div>
              <p className="Right_Plan_Content_Title">Standard </p>
              <p className="Right_Plan_Content_Sub_Div">
                {" "}
                Best fit for organization with 50 to 100 users or ten to 50
                users. 
              </p>
            </div>

            <div>
              <p class="Right_Plan_Content_Price">
                <span class="price">$ 9.99</span>
                <span class="per-month">/Month</span>
              </p>
            </div>
            <div
              className="Right_Plan_Gernal_Button"
              onClick={() => scrollToElement("Contact_Up")}
            >
              <GeneralButton
                name={"Get Started"}
                type={"Get Started"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"282.001px"}
                height={"45px"}
              />
            </div>

            <div className="Right_Plan_Below_Content">
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">Max 50 users</p>
              </div>
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">
                  Max 5 Documents
                </p>
              </div>
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">
                  Upload size 5 MB
                </p>
              </div>
              <div className="Right_Plan_below_Content_Sub_Div">
                <img src={Tick1} alt="" />
                <p className="Right_Plan_below_Content_P_Tag">
                  Max 100 chats per user per day
                </p>
              </div>
            </div>
          </div>

          <div className="Right_Plan_Content">
            <div>
              <div>
                <p className="Right_Plan_Content_Title">Enterprise</p>
                <p className="Right_Plan_Content_Sub_Div">
                  {" "}
                  For details about this plan, please press the button below.
                </p>
              </div>

              <div>
                <p class="Right_Plan_Content_Price">
                  <span class="price">$ 9.99</span>
                  <span class="per-month">/Month</span>
                </p>
              </div>

              <div
                className="Right_Plan_Gernal_Button"
                onClick={() => scrollToElement("Contact_Up")}
              >
                <GeneralButton
                  name={"Get Started"}
                  type={"Get Started"}
                  color={"#f8fafc"}
                  borderRadius={"30px"}
                  backgroundColor={"#6366f1"}
                  icons={frame}
                  width={"282.001px"}
                  height={"45px"}
                />
              </div>

              <div className="Right_Plan_Below_Content">
                {/* <div className="Right_Plan_below_Content_Sub_Div">
                  <img src={Tick1} alt="" />
                  <p className="Right_Plan_below_Content_P_Tag">Max 2 users</p>
                </div>
                <div className="Right_Plan_below_Content_Sub_Div">
                  <img src={Tick1} alt="" />
                  <p className="Right_Plan_below_Content_P_Tag">
                    Max 5 Documents
                  </p>
                </div>
                <div className="Right_Plan_below_Content_Sub_Div">
                  <img src={Tick1} alt="" />
                  <p className="Right_Plan_below_Content_P_Tag">
                    Upload size 2 MB
                  </p>
                </div>
                <div className="Right_Plan_below_Content_Sub_Div">
                  <img src={Tick1} alt="" />
                  <p className="Right_Plan_below_Content_P_Tag">
                    Max 10 chats free
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPlan;
