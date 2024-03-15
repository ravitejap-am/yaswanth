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

      <div>
        <Header />
      </div>

      <div className={Style.banner} id="Home_page">
        <Banner />
      </div>
      <div className={Style.divider}>
        <div className={Style.dividerMainUlStyle}>
          <span>Secured</span>
          <span>Personalized</span>
          <span>Knowledge Based</span>
          <span>Scalable</span>
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

      <Footer />
    </>
  );
};

export default Home;
