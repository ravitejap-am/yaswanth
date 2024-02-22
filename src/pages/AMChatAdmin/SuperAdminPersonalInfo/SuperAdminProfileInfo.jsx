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
import SuperAdminHeader from "../SuperAdminHeader/SuperAdminHeader";
import SuperAdminPersonalInfoTab from "./SuperAdminPersonalInfo";

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
            <SuperAdminHeader
              componentName="Welcome Sanjeev"
              name="Sanjeev"
              profileImageSrc={base}
              customStyle={{
                containerStyle: {
                  display: "flex",
                  borderRadius: "8px",
                },
                imageStyle: {
                  width: '44px',
                  height: '44px',
                },
                textStyle: {
                  color: 'black',
                  fontWeight: '500',
                  fontSize: '24px',
                },
              }}
            />
          </div>
          <TabNavigation
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
          />
          <div>
            {selectedTab === "personalinformation" && (
              <SuperAdminPersonalInfoTab />
            )}
            {selectedTab === "changepassword" && (
              <SuperAdminPersonalInfoChangePassword />
            )}
            {selectedTab === "plans" && <SuperAdminPersonalPlan />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminProfileInfo;
