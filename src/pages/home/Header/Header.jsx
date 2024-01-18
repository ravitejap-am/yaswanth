import React from "react";
import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import Logo from "../../../asset/Vector.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";

const Header = () => {
  const scrollSmoothById = () => {
    const element = document.getElementById("ai_page");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollSmoothByIdBlog = () => {
    const element = document.getElementById("idea_page");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollSmoothToContactUpPage = () => {
    const element = document.getElementById("Contact_Up");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const scrollSmoothToHomePage = () => {
    const element = document.getElementById("Home_page");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollSmoothToHowItWorks = () => {
    const element = document.getElementById("Plan_Page");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollSmoothToPlan = () => {
    const element = document.getElementById("Plan_Page");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={Styles.headerMain}>
      <div className={Styles.appHeading}>
        <div className={Styles.appLogo}>
          <span className="am-chat-title">AM Chat</span>
          <span className={Styles.appName}>
            <img src={Logo} alt="" />
          </span>
        </div>
      </div>
      <div className={Styles.appNavigation}>
        <div className={Styles.navigationPages}>
          <span className={Styles.navigation} onClick={scrollSmoothToHomePage}>
            Home
          </span>
          <span className={Styles.navigation} onClick={scrollSmoothById}>
            Solutions
          </span>
          <span className={Styles.navigation} onClick={scrollSmoothToHowItWorks}>How it Works</span>
          {/* <span className={Styles.navigation} onClick={scrollSmoothByIdBlog}>
            Blog
          </span> */}

          <span className={Styles.navigation} onClick={scrollSmoothToPlan}>
            Plans
          </span>
          <span
            className={Styles.navigation}
            onClick={scrollSmoothToContactUpPage}
          >
            Contact Form
          </span>
        </div>
        <div className={Styles.navigationButton}>
          <div className="btn-color">
            {/* <button className={Styles.homeBtn}>Sign In</button> */}
            {/* <Link to={"/signin"}> */}
            <GeneralButton
              name={"Sign In"}
              type={"submit"}
              // backgroundColor={"#f64e60"}
              color={"#F8FAFC"}
            />
            {/* </Link> */}
          </div>
          <div className="btn-color-signup">
            {/* <Link to={"/registerUser"}> */}
            <GeneralButton
              name={"Sign Up"}
              type={"submit"}
              // backgroundColor={"#f64e60"}
              color={"#F8FAFC"}
            />
            {/* </Link> */}
            {/* <button className={Styles.homeBtn}>Sign Up</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
