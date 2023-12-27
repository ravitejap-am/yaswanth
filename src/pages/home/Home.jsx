import React from "react";
import Style from "./home.module.css";
import Header from "./Header/Header";
import Homeheader from "../../layouts/homeheader/HomeHeader";
import Footer from "./Footer/Footer";
import Card from "./LandingPageCard/Card";
import CardLogo from "../../asset/svgexport-1.svg";
import Banner from "./LandingPageBanner/Banner";
import Addbannner from "../../asset/Group 40.webp";
import LargeCard from "./LargeCard/LargeCard";
import LargeCardImage from "../../asset/industillust-1.png";
import LargeCardImage1 from "../../asset/illustration-3-removebg-preview.png";
import Banner2 from "./LandingPageBanner2/Banner2";
// import { StarTwoTone } from "@ant-design/icons";
import LargeCardImage2 from "../../asset/img_employee_exp_1_79932cd732.svg";
const Home = () => {
  return (
    <>
      <Header />
      <div className={Style.banner}>
        <Banner />
      </div>

      <div className={Style.LandingPageCard}>
        <h1 className={Style.cardHeading}> Why Choose AM-CHAT ?</h1>
        <div className={Style.card}>
          <div>
            <Card
              cardHeading={"Completely Offload Your Data Reporting Effort"}
              cardContent={
                "Simply add our agent to your reporting module. Our agent responds to natural language requests, delivering in-depth reports and analyses without any manual intervention"
              }
              cardImage={CardLogo}
            />
          </div>
          <div>
            <Card
              cardHeading={"Completely Offload Your Data Reporting Effort"}
              cardContent={
                "Simply add our agent to your reporting module. Our agent responds to natural language requests, delivering in-depth reports and analyses without any manual intervention"
              }
              cardImage={CardLogo}
            />
          </div>
          <div>
            <Card
              cardHeading={"Completely Offload Your Data Reporting Effort"}
              cardContent={
                "Simply add our agent to your reporting module. Our agent responds to natural language requests, delivering in-depth reports and analyses without any manual intervention"
              }
              cardImage={CardLogo}
            />
          </div>
        </div>
      </div>
      <section className={Style.AddbannnerSection}>
        <div className={Style.bannerCurve}>
          <div className={Style.bannerCurveBackground}></div>
        </div>
        <div className={Style.productBanner}>
          <div>
            <div className={Style.paraHeadingBanner}>
              <h1 className={Style.headingPara}>
                Tap into the potential of your data
              </h1>
              <p className={Style.addPara}>
                Transform your documents into valuable insights, enabling
                informed decisions and propelling your business forward. Our
                user-friendly, intuitive AI platform is here to guide you on the
                path to success.
              </p>
            </div>

            <img className={Style.Addbannner} src={Addbannner} alt="" />
          </div>
        </div>
      </section>
      <div className={Style.largeCardComponentLeft}>
        <LargeCard
          alignmentLargeCard={"left"}
          largeCardImageInput={LargeCardImage}
          largeCardHeading={
            "Simplified Data Analysis across multiple data sources"
          }
          largeCardContent={
            "TrueReach AI makes data analysis simple and approachable for everyone in your organisation. Our platform provides chat based interface for easy of use along with preset visulals which can be personalised for every user."
          }
        />
      </div>
      <div className={Style.largeCardComponentRight}>
        <LargeCard
          alignmentLargeCard={"right"}
          largeCardImageInput={LargeCardImage1}
          largeCardHeading={
            "Simplified Data Analysis across multiple data sources"
          }
          largeCardContent={
            "TrueReach AI makes data analysis simple and approachable for everyone in your organisation. Our platform provides chat based interface for easy of use along with preset visulals which can be personalised for every user."
          }
        />
      </div>
      <div className={Style.largeCardComponentLeft}>
        <LargeCard
          alignmentLargeCard={"left"}
          largeCardImageInput={LargeCardImage2}
          largeCardHeading={
            "Simplified Data Analysis across multiple data sources"
          }
          largeCardContent={
            "TrueReach AI makes data analysis simple and approachable for everyone in your organisation. Our platform provides chat based interface for easy of use along with preset visulals which can be personalised for every user."
          }
        />
      </div>
      <div className={Style.banner2}>
        <Banner2 />
      </div>

      <Footer />
    </>
  );
};

export default Home;
