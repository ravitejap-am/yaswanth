import React from "react";
import Style from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={Style.footerMain}>
      <div className={Style.footerFIrstCOntent}>
        <div className={Style.footerLogo}>
          <img />
        </div>
        <div className={Style.footerAddress}>
          <p>
            Sachmein AI Technologies <br />
            Pvt Ltd. WeWork Prestige Atlanta,
            <br />
            Koramangala, Bangalore, 560034
          </p>
        </div>
        <div className={Style.footerRegisteration}>
          <p>
            GSTIN : 29ABJCS7969K1Z8 <br /> helpdesk@truereach.ai
          </p>
        </div>
      </div>
      <div className={Style.footerFIrstCOntent}>
        <div>
          <div>
            <h2>Company</h2>
          </div>
          <div>
            <a href="">Terms & Condition Privacy Policy</a>
          </div>
        </div>
        <div>
          <div>
            <h4> Joining our mailing list</h4>
          </div>
          <div className={Style.footerEmail}>
            <div>
              <input className={Style.footerInput} type="email" />
            </div>
            <div>
              <button className={Style.footerBtn}> Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.footerFIrstCOntent}>
        <h2>Get Strated</h2>
        <p>
          <a href="">Contact Us</a>
        </p>
        <p>
          <a href="">Schedule a Demo</a>
        </p>
        <p>
          <a href="">Watch Demo </a>
        </p>
        <p>
          <a href="">FAQ</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
