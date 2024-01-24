import React, { useState } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import Plans from "./Plans";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import GeneralButton from "../../components/common/buttons/GeneralButton"; // Update the path accordingly
import frame1 from "../../asset/Frame 1.png";
import lefticon from "../../asset/arrow-left.png";

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
            <h2>Am-Chat</h2>
            <div className="startchat-button">
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
              <Link to="/AmchatMainUser">
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
                <img src="" alt="" />
              </div>
              <div className="userprofile-account-name">
                <div className="profile-account-img"></div>
                <h2>Clayton Santos</h2>
              </div>
            </div>
          </div>
          <div className="info-bar">
            <div className="info-bar-content">
              <Link
                className={`barinfo-personalinfo ${
                  selectedTab === "personalinformation" ? "active-link" : ""
                }`}
                onClick={() => handleTabChange("personalinformation")}
              >
                Personal Information
              </Link>
              <Link
                to="#"
                className={`barinfo-changepassword ${
                  selectedTab === "changepassword" ? "active-link" : ""
                }`}
                onClick={() => handleTabChange("changepassword")}
              >
                Change Password
              </Link>
              <Link
                to="#"
                className={`barinfo-plans ${
                  selectedTab === "plans" ? "active-link" : ""
                }`}
                onClick={() => handleTabChange("plans")}
              >
                Plans
              </Link>
            </div>
            {selectedTab === "personalinformation" && <PersonalInformation />}
            {selectedTab === "changepassword" && <ChangePassword />}
            {selectedTab === "plans" && <Plans />}
          </div>
        </div>
      </div>
      <div className="userprofile-footer">
        <p>@2024. All rights reserved by AM Chatbot.</p>
      </div>
    </div>
  );
};

export default UserProfile;
