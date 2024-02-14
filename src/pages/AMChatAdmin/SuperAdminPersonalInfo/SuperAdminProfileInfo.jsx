import React, { useState } from "react";
import "./SuperAdminPersonalInfo.css";

import base from "../../../asset/Base.png";
// import TabNavigation from "../../tabNaviagation";
import SuperAdminPersonalInfo from "./SuperAdminPersonalInfo";
import SuperAdminPersonalInfoChangePassword from "./SuperAdminPersonalInfoChangePassword";
import SuperAdminPersonalPlan from "./SuperAdminPersonalPlan";
import AMChatHeader from "../AMChatHeader/AMChatHeader";
import TabNavigation from "../../chatmain/tabNaviagation";
import PersonalInformation from "../../chatmain/PersonalInformation";
import ChangePassword from "../../chatmain/ChangePassword";
import Plans from "../../chatmain/Plans";

function SuperAdminProfileInfo() {
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
              componentName="Welcome Sanjeev"
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
}

export default SuperAdminProfileInfo;
