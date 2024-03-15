import React from "react";
import Style from "./footer.module.css";
import img1 from "../../../asset/footer/fb.png";
import img2 from "../../../asset/footer/fb2.png";
import img3 from "../../../asset/footer/li.png";
import img4 from "../../../asset/footer/Frame22.png";
import img5 from "../../../asset/footer/Frame23.png";
import img6 from "../../../asset/footer/phone.png";
import Vector from "../../../asset/Vector.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={Style.footerMain}>
      <div className={Style.firstHalf}>
        <div className={Style.footerFIrstCOntent}>
          <div className={Style.footerAddress}>
            <p className={Style.footer_p_tag}>
              AM-ChatBOT <img src={Vector} alt="" />
            </p>
            <p className={Style.footer_p_tag_2}>
              <Link
                to="/PrivacyPolicy"
                style={{ color: "#FFF", textDecoration: "underline" }}
              >
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link
                to="/termsandconditions"
                style={{ color: "#FFF", textDecoration: "underline" }}
              >
                Terms & Conditions
              </Link>
            </p>
          </div>
          <div className={Style.footer_social_links}>
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </div>
        <div className={Style.footerFIrstCOntent}>
          <div className={Style.address_card}>
            <img src={img4} alt="" />
            <span className={Style.footer_p_tag}>
              4th Cross, Ramanjaneya Layout,
              <br />
              Marathahalli, Bangalore, India.
            </span>
          </div>
          <div className={Style.address_card}>
            <img src={img5} alt="" />
            <span className={Style.footer_p_tag} style={{ marginTop: 0 }}>
              <a
                href="mailto:sales@areteminds.com"
                style={{ textDecoration: "none", color: "#FFF" }}
              >
                sales@areteminds.com
              </a>
            </span>
          </div>
          <div className={Style.address_card}>
            <img src={img6} alt="" />
            <span className={Style.footer_p_tag} style={{ marginTop: 0 }}>
              +91 9663205304
            </span>
          </div>
        </div>
      </div>
      <div className={Style.centeredText}>
        <p style={{ color: "#FFF", fontSize: "14px" }}>
          @2024. All rights reserved by Areteminds
        </p>
      </div>
    </div>
  );
};

export default Footer;
