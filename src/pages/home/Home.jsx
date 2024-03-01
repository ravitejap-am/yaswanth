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
      {/* <section class="bg-dark">
        <nav class="navbar navbar-expand-lg fixed-top ">
          <div class="container">
            <div class="title-box">
              <a class="navbar-brand " href="landing.html">
                <img src={require("../../asset/images/logo-footer.png")} class="img-fluid" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img
                  src={require("../../asset/images/menu.png")}
                  class="img-fluid"
                />
              </button>
            </div>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto justify-content-lg-center">
                <li class="nav-item dropdown">
                  <a class="nav-link active" href="#Solutions">
                    Solutions
                  </a>
                </li>
                <li class="nav-item ">
                  <a class="nav-link" href="#How-it-Works">
                    How it Works
                  </a>
                </li>

                <li class="nav-item ">
                  <a class="nav-link" href="#Plans">
                    Plans
                  </a>
                </li>
                <li class="nav-item ">
                  <a class="nav-link" href="#contact-us">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div class="d-lg-flex mob-view">
              <a class="btn btn-blue me-2">Sign In</a>
              <a class="btn btn-blue">Sign Up</a>
            </div>
          </div>
        </nav>

        <div class="banner-section ">
          <div class="container">
            <div class="row justify-content-center align-items-center mx-0 pt-lg-5 pt-0">
              <div class="col-lg-6 banner-content">
                <h1>Unleash the Power of enterprise content with Gen AI”</h1>
                <p class="banner-p">
                  Explore, learn and chat with knowledge base created based on
                  your enterprise documents or contents using the power of Gen
                  AI.
                </p>
                <div class="banner-btn-div">
                  <a
                    type="button"
                    class="btn btn-blue"
                    href="javascript:void(0);"
                  >
                    <span>Start Chat</span>
                    <img
                      src={require("../../asset/images/logo-footer.png")}
                      class="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div class="col-lg-6 text-center mob-view">
                <img
                  src={require("../../asset/images/logo-footer.png")}
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="keywords">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-9">
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <h1>Secured</h1>
                <h1>Personalized</h1>
                <h1>Knowledge Based</h1>
                <h1>Scalable</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="chat-section">
        <div class="container">
          <h2 class="common-h2 text-center">AM Chat Gen AI Chatbot</h2>
          <p class="common-p text-center">
            Use the power of generative AI to interact with your documents.
          </p>

          <div class="mt-5 text-center">
            <img
              src={require("../../asset/images/chat.png")}
              class="img-fluid"
            />
          </div>
        </div>
      </section> */}

      <div style={{ position: "fixed", zIndex: 1 }}>
        {" "}
        <Header />
      </div>

      <div className={Style.banner} id="Home_page">
        <Banner />
      </div>
      <div className={Style.divider}>
        <div className={Style.dividerMainUlStyle}>
          <p>Secured</p>
          <p>Personalized</p>
          <p>Knowledge Based</p>
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
      <section id="Contact_Up"></section>
      <div>
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
