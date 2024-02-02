import React, { useState } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import Plans from "./Plans";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import GeneralButton from "../../components/common/buttons/GeneralButton";
import TabNavigation from "./tabNaviagation";
import frame1 from "../../asset/Frame 1.png";
import lefticon from "../../asset/arrow-left.png";
import base from '../../asset/Base.png'
import vector1 from '../../asset/logo.png'


const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("personalinformation");

  const handleTabChange = (tab) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  };

  return (
    <div className="userprofile-screen">
      <div className="userprofile-main">
        <div className="userprofile-sidebar">
          <div className="sidebar-amchat">
          <img className='amchat-vector-img-sidebar' src={vector1} alt="" />
            <div className='startchat-button'>
              <GeneralButton
                name="Start Chat"
                type="primary"
                color="white"
                backgroundColor="#6366F1"
                width="150px"
                padding="10px 16px"
                height="40px"
                borderRadius="30px"
                icons={frame1}
              />
            </div>
              <div className="back-link">
                <Link className="backlink-text" to="/userchat">
                  <img className="left-back-icon" src={lefticon} alt="" />
                  Back to chat
                </Link>
              </div>
            </div>
          </div>
          <div className="userprofile-pofilecontainer">
            <div className="userprofile-header">
              <div className="userprofile-profile">
                <h2>Profile</h2>
              </div>
              <div className="userprofile-account">
                <div className="userprofile-pic">
                  <img src={base} alt="" />
                </div>
                <div className="userprofile-account-name">
                  <div className="profile-account-img"></div>
                  <h2>Clayton Santos</h2>
                </div>
              </div>
            </div>
            <TabNavigation
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
            <div>
              {selectedTab === "personalinformation" && <PersonalInformation />}
              {selectedTab === "changepassword" && <ChangePassword />}
              {selectedTab === "plans" && <Plans />}
            </div>
          </div>
        </div>
        <div className="userprofile-footer">
          <p>@2024. All rights reserved by Areteminds</p>
        </div>
      </div>
      );
};

      export default UserProfile;
