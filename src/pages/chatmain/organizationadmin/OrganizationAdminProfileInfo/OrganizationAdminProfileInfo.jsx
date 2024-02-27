import React, { useState, useEffect } from "react";
import "./OrganizationAdmin.css";
import OrganizationAdminPersonalInformation from "./OrganizationAdminPersonalInformation";
import OrganizationAdminChangePassword from "./OrganizationAdminChangePassword";
import OrganizationAdminPlans from "./OrganizationAdminPlans";
import AMChatHeader from "../../../AMChatAdmin/AMChatHeader/AMChatHeader";
import base from "../../../../asset/Base.png";
import TabNavigation from "../../tabNaviagation";

function OrganizationAdminProfileInfo() {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem("firstNameOrganisation");
    setFirstName(storedFirstName);
  }, []);
  const [selectedTab, setSelectedTab] = useState("personalinformation");
  const profileSrc = localStorage.getItem("profileImage");

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
              componentName={`Welcome ${firstName || ""}`}
              name={firstName || ""}
              profileImageSrc={profileSrc}
              customStyle={{
                containerStyle: {
                  display: "flex",
                  borderRadius: "8px",
                },
                imageStyle: {
                  width: "44px",
                  height: "44px",
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
              <OrganizationAdminPersonalInformation />
            )}
            {selectedTab === "changepassword" && (
              <OrganizationAdminChangePassword />
            )}
            {selectedTab === "plans" && <OrganizationAdminPlans />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationAdminProfileInfo;
