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
    const storedFirstName = localStorage.getItem("firstName");
    setFirstName(storedFirstName);
  }, []);
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
              componentName={`Welcome ${firstName || ""}`}
              name={firstName || ""}
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
