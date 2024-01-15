import React from "react";
import Style from "./footer.module.css";
import img1 from "../../../asset/footer/fb.png";
import img2 from "../../../asset/footer/fb2.png";
import img3 from "../../../asset/footer/li.png";
import img4 from "../../../asset/footer/Frame22.png";
import img5 from "../../../asset/footer/Frame23.png";
import img6 from "../../../asset/footer/phone.png";
import Vector from "../../../asset/Vector.png";

const Footer = () => {
  return (
    <div className={Style.footerMain}>
      <div className={Style.footerFIrstCOntent}>
        <div className={Style.footerAddress}>
          <p>
            AM-ChatBOT <img src={Vector} alt="" /> <br />
            Privacy Policy | Terms & Conditions ,
          </p>
        </div>
        <div className={Style.footer_social_links}>
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
        </div>
      </div>
      <div className={Style.centeredText}>
        <p>@2024. All rights reserved by Aretminds</p>
      </div>
      <div className={Style.footerFIrstCOntent}>
        <p className="footer_p_tag">
          {" "}
          <img src={img4} alt="" /> 4th Cross, Ramanjaneya Layout Marathahalli,
          Bangalore India
        </p>
        <p>
          <a href="">
            {" "}
            <img src={img5} alt="" />
            sales@areteminds.com
          </a>
        </p>
        <p>
          <a href="">
            <img src={img6} alt="" /> +91 9663205304
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
