import React from "react";
import { Link } from "react-router-dom";

function OrganizationAdminProfielTabNavigation({
  selectedTab,
  handleTabChange,
}) {
  return (
    <div className="info-bar">
      <div className="info-bar-content">
        <Link
          to="#"
          className={`barinfo-personalinfo ${
            selectedTab === "personalinformation" ? "active-link" : ""
          }`}
          onClick={() => handleTabChange("OrganizationAdminProfileInfo")}
        >
          Personal Info
        </Link>
        <Link
          to="#"
          className={`barinfo-changepassword ${
            selectedTab === "changepassword" ? "active-link" : ""
          }`}
          onClick={() => handleTabChange("OrganizationAdminChangePassword")}
        >
          Change Password
        </Link>
        <Link
          to="#"
          className={`barinfo-plans ${
            selectedTab === "plans" ? "active-link" : ""
          }`}
          onClick={() => handleTabChange("OrganizationAdminPlans")}
        >
          Plans
        </Link>
      </div>
    </div>
  );
}

export default OrganizationAdminProfielTabNavigation;
