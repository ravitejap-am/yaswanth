import React from "react";
import { Link } from "react-router-dom";
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
            <Link to={"/signin"}>
              <GeneralButton
                name={"Sign In"}
                type={"submit"}
                backgroundColor={"#f64e60"}
                color={"#ffff"}
              />
            </Link>
          </div>
          <div>
            <Link to={"/registerUser"} style={{}}>
            <GeneralButton
              name={"Sign Up"}
              type={"submit"}
              backgroundColor={"#f64e60"}
              color={"#ffff"}
            />
            </Link>
            {/* <button className={Styles.homeBtn}>Sign Up</button> */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
