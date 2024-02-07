// Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import Logo from "../../../asset/images/logo.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import menuImg from "../../../asset/images/menu.png";
import logoFooter from "../../../asset/images/logo-footer.png";

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
        {/* <span className={Styles.amChatTitle}>AM-Chat</span> */}
        {/* <span className={Styles.appName}> */}
        <img src={Logo} alt="" />
        {/* </span> */}
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
          Contact Us
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
    // <section class="bg-dark">
    //   <nav class="navbar navbar-expand-lg fixed-top ">
    //     <div class="container">
    //       <div class="title-box">
    //         <a class="navbar-brand " href="landing.html">
    //           <img src={logoFooter} class="img-fluid" />
    //         </a>
    //         <button
    //           class="navbar-toggler"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#navbarSupportedContent"
    //           aria-controls="navbarSupportedContent"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <img src={menuImg} class="img-fluid" />
    //         </button>
    //       </div>

    //       <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul class="navbar-nav mx-auto justify-content-lg-center">
    //           {/* <li class="nav-item dropdown">
    //                         <a href="#" class="close-icon"><img src="images/close.svg" class="img-fluid"/></a>
    //                     </li> */}
    //           <li class="nav-item dropdown">
    //             <a class="nav-link active" href="#Solutions">
    //               Solutions
    //             </a>
    //           </li>
    //           <li class="nav-item ">
    //             <a class="nav-link" href="#How-it-Works">
    //               How it Works
    //             </a>
    //           </li>

    //           <li class="nav-item ">
    //             <a class="nav-link" href="#Plans">
    //               Plans
    //             </a>
    //           </li>
    //           <li class="nav-item ">
    //             <a class="nav-link" href="#contact-us">
    //               Contact Us
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div class="d-lg-flex mob-view">
    //         <a class="btn btn-blue me-2">Sign In</a>
    //         <a class="btn btn-blue">Sign Up</a>
    //       </div>
    //     </div>
    //   </nav>
    // </section>
  );
};

export default Header;
