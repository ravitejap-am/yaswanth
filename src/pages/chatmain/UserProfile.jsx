import React, { useState } from "react";
import "./UserProfile.css";
import Plans from "./Plans";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import TabNavigation from "./tabNaviagation";
import base from "../../asset/Base.png";
import AMChatHeader from "../AMChatAdmin/AMChatHeader/AMChatHeader";

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
        <div className="userprofile-pofilecontainer">
          <div className="userprofile-header">
            <AMChatHeader
              componentName="Welcome Shiva"
              name="Shiva"
              profileImageSrc={base}
              customStyle={{
                containerStyle: {
                  display: "flex",
                  borderRadius: "8px",
                },
                imageStyle: {
                  width: "50%",
                  height: "70%",
                },
                textStyle: {
                  color: "blue",
                  fontWeight: "bold",
                },
              }}
            />
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
    </div>
  );
};

export default UserProfile;
