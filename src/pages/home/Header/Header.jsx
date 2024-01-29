// Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import Logo from "../../../asset/Vector.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";

const Header = () => {
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
    <div className={`${Styles.headerMain} ${scroll ? Styles.scrolled : ""}`}>
      <div className={Styles.appLogo}>
        <span className={Styles.amChatTitle}>AM Chat</span>
        <span className={Styles.appName}>
          <img src={Logo} alt="" />
        </span>
      </div>
      <div className={Styles.appNavigation}>
        <span
          className={Styles.navigation}
          onClick={() => scrollToElement("Home_page")}
        >
          Home
        </span>
        <span
          className={Styles.navigation}
          onClick={() => scrollToElement("ai_page")}
        >
          Solutions
        </span>
        <span
          className={Styles.navigation}
          onClick={() => scrollToElement("How_it_works")}
        >
          How it Works
        </span>
        <span
          className={Styles.navigation}
          onClick={() => scrollToElement("Plan_Page")}
        >
          Plans
        </span>
        <span
          className={Styles.navigation}
          onClick={() => scrollToElement("Contact_Up")}
        >
          Contact Form
        </span>
      </div>
      <div className={Styles.navigationButton}>
        <div className="btn-color">
          <Link to={"/signIn"} style={{ textDecoration: "none" }}>
            <GeneralButton name={"Sign In"} type={"submit"} color={"#F8FAFC"} />
          </Link>
        </div>
        <div className="btn-color-signup">
          <Link to={"/registerUser"} style={{ textDecoration: "none" }}>
            <GeneralButton name={"Sign Up"} type={"submit"} color={"#F8FAFC"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
