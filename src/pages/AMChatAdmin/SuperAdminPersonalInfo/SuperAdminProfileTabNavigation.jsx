import React from "react";
import { Link } from "react-router-dom";

function SuperAdminProfileTabNavigation({ selectedTab, handleTabChange }) {
  return (
    <div className="info-bar">
      <div className="info-bar-content">
        <Link
          to="#"
          className={`barinfo-personalinfo ${
            selectedTab === "personalinformation" ? "active-link" : ""
          }`}
          onClick={() => handleTabChange("SuperAdminPersonalInfo")}
        >
          Personal Info
        </Link>
        <Link
          to="#"
          className={`barinfo-changepassword ${
            selectedTab === "changepassword" ? "active-link" : ""
          }`}
          onClick={() =>
            handleTabChange("SuperAdminPersonalInfoChangePassword")
          }
        >
          Change Password
        </Link>
        <Link
          to="#"
          className={`barinfo-plans ${
            selectedTab === "plans" ? "active-link" : ""
          }`}
          onClick={() => handleTabChange("SuperAdminPersonalPlan")}
        >
          Plans
        </Link>
      </div>
    </div>
  );
}

export default SuperAdminProfileTabNavigation;
