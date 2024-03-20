import React from 'react';
import Style from './footer.module.css';
import img1 from '../../../asset/footer/fb.png';
import img2 from '../../../asset/footer/fb2.png';
import img3 from '../../../asset/footer/li.png';
import img4 from '../../../asset/footer/Frame22.png';
import img5 from '../../../asset/footer/Frame23.png';
import img6 from '../../../asset/footer/phone.png';
import Vector from '../../../asset/Vector.png';
import { Link } from 'react-router-dom';

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
                style={{ color: '#FFF', textDecoration: 'underline' }}
              >
                Privacy Policy
              </Link>{' '}
              |{' '}
              <Link
                to="/termsandconditions"
                style={{ color: '#FFF', textDecoration: 'underline' }}
              >
                Terms & Conditions
              </Link>
            </p>
          </div>
          <div className={Style.footer_social_links}>
            {/* <img src={img1} alt="" /> */}
            <img src={img2} alt="" />
            <a
              href="https://in.linkedin.com/company/aretemindstechnologiesprivatelimited"
              target="_blank"
            >
              <img src={img3} alt="" />
            </a>
          </div>
        </div>
        <div className={Style.footerFIrstCOntent}>
          <a
            href="https://www.google.com/maps/place/4th+Cross+Rd,+Aswath+Nagar,+Marathahalli,+Bengaluru,+Karnataka+560037/@12.9585016,77.7021339,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1232e354bd33:0xb08f8e3b10c63ea3!8m2!3d12.9585016!4d77.7021339!16s%2Fg%2F11thlg9ny9?entry=ttu"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <div className={Style.address_card}>
              <img src={img4} alt="" />
              <span className={Style.footer_p_tag}>
                4th Cross, Ramanjaneya Layout,
                <br />
                Marathahalli, Bangalore, India.
              </span>
            </div>
          </a>

          <div className={Style.address_card}>
            <img src={img5} alt="" />
            <span className={Style.footer_p_tag} style={{ marginTop: 0 }}>
              <a
                href="mailto:sales@areteminds.com"
                target="_blank"
                style={{ textDecoration: 'none', color: '#FFF' }}
              >
                sales@areteminds.com
              </a>
            </span>
          </div>

          <a
            href="tel:9663205304"
            style={{ textDecoration: 'none' }}
            target="_blank"
          >
            <div className={Style.address_card}>
              <img src={img6} alt="" />
              <span className={Style.footer_p_tag} style={{ marginTop: 0 }}>
                +91 9663205304
              </span>
            </div>
          </a>
        </div>
      </div>
      <div className={Style.centeredText}>
        <p style={{ color: '#FFF', fontSize: '14px' }}>
          @2024. All rights reserved by Areteminds
        </p>
      </div>
    </div>
  );
};

export default Footer;
