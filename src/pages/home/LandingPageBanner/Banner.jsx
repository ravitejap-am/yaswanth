import React from 'react';
import Style from './banner.module.css';
// import BannerImage from "../../../asset/b1.webp";
import BannerImage from '../../../asset/banner-img.png';
import BannerImage1 from '../../../asset/Group.png';
import frame from '../../../asset/Frame 1.png';
// import backgroundSVGHome from "../../../asset/Layer1.png";
// import backgroundSVGHome from '../../../asset/—Pngtree—man in shirt smiles and_13146336 1.png';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import { Link } from 'react-router-dom';
import GroupImage from '../../../asset/groupImageOne.png';


const Banner = () => {
  return (
    <div
      className={Style.banner}
      style={{
        backgroundSize: '100% 90%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${GroupImage})`,
        backgroundPosition: 'bottom',
      }}
    >
      <div style={{ backgroundImage: `url(${BannerImage1})` }}></div>
      <div className="background_image"></div>
      <div>
        <div>
          <p className={Style.bannerHeading}>
            Unleash the
            <br />
            Power of your
            <br />
            Enterprise
            <br />
            Documents with
            <br />
            Gen AI
          </p>
        </div>
        <div className={Style.bannerPara}>
          <p>
            Explore, learn and chat with the knowledge base created from <br />
            your enterprise documents.
          </p>
        </div>
        <div className={Style.bannerParaUnorderList}></div>
        <div className={Style.bannerBtn}>
          <div className={Style.bannerButton}>
            <Link to="/signIn" style={{ textDecoration: 'none' }}>
              <GeneralButton
                name={'Get Started'}
                type={'submit'}
                color={'#f8fafc'}
                borderRadius={'30px'}
                backgroundColor={'#6366f1'}
                icons={frame}
                width={'140px'}
                height={'45px'}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="main_side_image_div">
        <img className={Style.bannerImage} src={BannerImage} />
      </div>
    </div>
  );
};

export default Banner;
