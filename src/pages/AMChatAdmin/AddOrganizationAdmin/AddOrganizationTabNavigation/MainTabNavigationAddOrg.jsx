import React from "react";
import { Link } from "react-router-dom";
import Styles from "./AddOrganization.module.css";
const tabNavigations = ({ selectedTab, handleTabChange }) => {
  return (
    <div className={Styles.infoBarMain}>
      <div className={Styles.infoBar}>
        <div className="info-bar-content">
          <Link
            style={{ textDecoration: "none" }}
            to="#"
            className={`barinfo-personalinfo ${
              selectedTab === "personalinformation" ? "active-link" : ""
            }`}
            onClick={() => handleTabChange("personalinformation")}
          >
            Organization Info
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to="#"
            className={`barinfo-plans ${
              selectedTab === "organizationadmin" ? "active-link" : ""
            }`}
            onClick={() => handleTabChange("organizationadmin")}
          >
            Organization Admin
          </Link>

          <Link
            style={{ textDecoration: "none" }}
            to="#"
            className={`barinfo-plans ${
              selectedTab === "organizationdomains" ? "active-link" : ""
            }`}
            onClick={() => handleTabChange("organizationdomains")}
          >
            Organization Domains
          </Link>

          <Link
            style={{ textDecoration: "none" }}
            to="#"
            className={`barinfo-plans ${
              selectedTab === "subscriptionplan" ? "active-link" : ""
            }`}
            onClick={() => handleTabChange("subscriptionplan")}
          >
            Subscription Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default tabNavigations;
