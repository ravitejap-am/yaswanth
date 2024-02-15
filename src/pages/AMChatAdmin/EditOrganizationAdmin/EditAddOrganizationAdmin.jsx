import React, { useState } from "react";
import { Tabs, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./AddOrganizationAdmin.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import OrganizationInfo from "./AddOrganizationTabNavigation/OrganizationInfo";
import TabNavigation from "./AddOrganizationTabNavigation/MainTabNavigationAddOrg";
import OrganizationAdmin from "./AddOrganizationTabNavigation/OrganizationAdmin";
import OrganizationDomains from "./AddOrganizationTabNavigation/OrganizationDomains";
import SubscriptionPlan from "./AddOrganizationTabNavigation/SubscriptionPlan";
import GeneralButton from "../../../components/common/buttons/GeneralButton";

function EditAddOrganizationAdmin() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("personalinformation");

  const handleTabChange = (tab) => {
    const normalizedTab = tab.toLowerCase(); // Normalize to lowercase
    if (normalizedTab !== selectedTab) {
      setSelectedTab(normalizedTab);
    }
  };

  const handleSubmit = () => {
    // Add logic for handling form submission
    console.log("Submitting form");
  };

  const handleCancel = () => {
    // Add logic for handling form cancellation
    console.log("Cancelling form");
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Edit Organization</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <TabNavigation
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
        />
        <br />
        <div className={Styles.superAdminTabChildCardStyle}>
          {selectedTab === "personalinformation" && <OrganizationInfo />}
          {selectedTab === "organizationadmin" && <OrganizationAdmin />}
          {selectedTab === "subscriptionplan" && <SubscriptionPlan />}
          {selectedTab === "organizationdomains" && <OrganizationDomains />}
        </div>
        <div className={Styles.generalButtonStyle}>
          <div>
            <GeneralButton
              name="Submit"
              buttonProps={
                {
                  /* Add any additional button props if needed */
                }
              }
              type="primary"
              color="#FFFFFF"
              backgroundColor="#6366F1"
              width="130px"
              height="50px"
              borderRadius="30px"
              // icons={/* Add submit button icon source */}
              buttonHandler={handleSubmit}
            />
          </div>
          <Link
            to="/dashboardadmin/organizationlist"
            style={{ textDecoration: "none" }}
          >
            <div>
              <GeneralButton
                name="Cancel"
                buttonProps={
                  {
                    /* Add any additional button props if needed */
                  }
                }
                type="default"
                color="#334155"
                backgroundColor="transparent"
                width="130px"
                height="50px"
                borderRadius="30px"
                // icons={/* Add cancel button icon source */}
                buttonHandler={handleCancel}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditAddOrganizationAdmin;
