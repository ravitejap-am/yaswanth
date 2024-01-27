import React from "react";
import { Link } from "react-router-dom";

const TabNavigation = ({ selectedTab, handleTabChange }) => {
  return (
    <div className="info-bar">
      <div className="info-bar-content">
        <Link
          to="#"
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
    </div>
  );
};

export default TabNavigation;
