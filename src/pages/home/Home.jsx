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
const Home = () => {
  return (
    <>
      <div style={{ position: "fixed" }}>
        {" "}
        <Header />
      </div>

      <div className={Style.banner} id="Home_page">
        <Banner />
      </div>
      <div className={Style.divider}>
        <div className={Style.dividerMainUlStyle}>
          <p>Secure</p>
          <p>Personalized</p>
          <p>knowledge Base</p>
          <p>Scalable</p>
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

      {/* <div className={Style.largeCardComponentLeft}>
        <LargeCard
          alignmentLargeCard={"left"}
          largeCardImageInput={LargeCardImage}
          largeCardHeading={"Streamlined Data Analysis from Various Sources"}
          largeCardContent={
            "AM-Chat, the dynamic communication hub, brings you a seamless and intuitive platform for instant conversations. Elevate your messaging experience with our user-friendly interface, ensuring effortless communication and connection."
          }
        />
      </div> */}
      {/* <div className={Style.largeCardComponentRight}>
        <LargeCard
          alignmentLargeCard={"right"}
          largeCardImageInput={LargeCardImage1}
          largeCardHeading={"Effortlessly Incorporate Your Document"}
          largeCardContent={
            "AM-Chat seamlessly connects with over , including top-tier industry software, consolidating all your data into a unified platform. Tailored to seamlessly align with your current workflows and tools, AM-Chat ensures swift integration, enabling you to unlock actionable insights without delay."
          }
        />
      </div>
      <div className={Style.largeCardComponentLeft}>
        <LargeCard
          alignmentLargeCard={"left"}
          largeCardImageInput={LargeCardImage2}
          largeCardHeading={
            "Empowering Reports with the Ability to Ask Anything"
          }
          largeCardContent={
            "AM-Chat simplifies and democratizes data analysis for every member of your organization. Featuring an intuitive chat-based interface, our platform ensures ease of use, coupled with customizable visuals that cater to the unique preferences of each user."
          }
        />
      </div>
      <div className={Style.banner2}>
        <Banner2 />
      </div>
      <div className={Style.customers}>
        <div className={Style.customersSection}>
          <h1 className={Style.customersHeading}>Hear It from Our Customers</h1>
          <Carousal
            data={[
              {
                img: LargeCardImage1,
                content:
                  "TrueReach AI has been a game-changer for our business. It has helped us uncover insights that we never would have found on our own.",
                heading: "@ jhone Doe",
              },
              {
                img: LargeCardImage2,
                content:
                  "TrueReach AI has been a game-changer for our business. It has helped us uncover insights that we never would have found on our own.",
                heading: "@ jhone Doe",
              },
              {
                img: LargeCardImage,
                content:
                  "TrueReach AI has been a game-changer for our business. It has helped us uncover insights that we never would have found on our own",
                heading: "@Jhone DOe ",
              },
            ]}
          />
        </div>
      </div>
      <div className={Style.recognisedBanner}>
        <Recognised />
      </div>
      <div>
        <Banner3 />
      </div> */}
      {/* <div>
        <FQBanner />
      </div> */}
      <Footer />
    </>
  );
};

export default Home;
