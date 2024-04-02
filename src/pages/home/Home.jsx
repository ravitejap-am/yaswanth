import React from "react";
import Style from "./home.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Banner from "./LandingPageBanner/Banner";
import AIChatBot from "./AIChat/AIChatBot";
import Idea from "./Idea/Idea";
import AISolution from "./AISolution/AISolution";
import HowItWorks from "./HowItWorks/HowItWorks";
import RightPlan from "./RightPlan/RightPlan";
import ContactUp from "./ContactUs/ContactUp";
import { Typography } from "@mui/material";


const Home = () => {

  const handleLogoClick = () => {
    window.location.href = "/"; 
  };

  return (
    <>
      <div>
        <Header  handleLogoClick= {handleLogoClick}/>
      </div>
      <div className={Style.banner} id="Home_page">
        <Banner />
      </div>
      <div className={Style.divider}>
        <div className={Style.dividerMainUlStyle}>
          <Typography variant="h6">Secured</Typography>
          <Typography variant="h6">Personalized</Typography>
          <Typography variant="h6">Knowledge Based</Typography>
          <Typography variant="h6">Scalable</Typography>
        </div>
      </div>
      <div className={Style.LandingPageCard}>
        <AIChatBot />
      </div>
      <div className={Style.IdeaPageStyle} id="idea_page">
        <Idea />
      </div>
      <div className="AI_Solution_Style" id="ai_page">
        <AISolution />
      </div>
      <div id="How_it_works">
        <HowItWorks />
      </div>
      <div id="Plan_Page">
        <RightPlan />
      </div>
      <div id="Contact_Up">
        <ContactUp />
      </div>
      <Footer />
    </>
  );
};

export default Home;
