import React from "react";
import Styles from "./header.module.css";
import Logo from "../../../asset/LOGO1.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";

const Header = () => {
  return (
    <div className={Styles.headerMain}>
      <div className={Styles.appHeading}>
        <div className={Styles.appLogo}>
          <i>
            <img className={Styles.logo} src={Logo} />
            {/* <image /> */}
          </i>
          {/* <span className={Styles.appName}>AM_Chat</span> */}
        </div>
      </div>
      <div className={Styles.appNavigation}>
        <div className={Styles.navigationPages}>
          <span className={Styles.navigation}>Home</span>
          <span className={Styles.navigation}>Product</span>
          <span className={Styles.navigation}>Blog</span>
          <span className={Styles.navigation}>More</span>
        </div>
        <div className={Styles.navigationButton}>
          <div>
            {/* <button className={Styles.homeBtn}>Sign In</button> */}
            <GeneralButton
              name={"Sign In"}
              type={"submit"}
              backgroundColor={"#f64e60"}
              color={"#ffff"}
            />
          </div>
          <div>
            {/* <button className={Styles.homeBtn}>Sign Up</button> */}
            <GeneralButton
              name={"Sign Up"}
              type={"submit"}
              backgroundColor={"#f64e60"}
              color={"#ffff"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
