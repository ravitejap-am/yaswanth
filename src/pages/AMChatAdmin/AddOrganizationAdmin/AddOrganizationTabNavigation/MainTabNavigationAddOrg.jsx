import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './AddOrganization.module.css';
import {
  validatePersonalInfoForm,
  validateUserInfoForm,
} from '../../../../components/super-admin/validation';
const tabNavigations = ({
  selectedTab,
  handleTabChange,
  setOrgInfoErrors,
  orgData,
  setUserInfoErrors,
  personalInformationHandler,
}) => {
  return (
    <div className={Styles.infoBarMain}>
      <div className={Styles.infoBar}>
        <div className="info-bar-content">
          <Link
            style={{ textDecoration: 'none' }}
            to="#"
            className={`barinfo-personalinfo ${
              selectedTab === 'personalinformation' ? 'active-link' : ''
            }`}
            onClick={() => {
              personalInformationHandler('personalinformation');
            }}
          >
            Organization Info
          </Link>
          <Link
            style={{ textDecoration: 'none' }}
            to="#"
            className={`barinfo-plans ${
              selectedTab === 'organizationadmin' ? 'active-link' : ''
            }`}
            onClick={() => personalInformationHandler('organizationadmin')}
          >
            Organization Admin
          </Link>

          <Link
            style={{ textDecoration: 'none' }}
            to="#"
            className={`barinfo-plans ${
              selectedTab === 'organizationdomains' ? 'active-link' : ''
            }`}
            onClick={() => {
              personalInformationHandler('organizationdomains');
            }}
          >
            Organization Domains
          </Link>

          <Link
            style={{ textDecoration: 'none' }}
            to="#"
            className={`barinfo-plans ${
              selectedTab === 'subscriptionplan' ? 'active-link' : ''
            }`}
            onClick={() => {
              personalInformationHandler('subscriptionplan');
            }}
          >
            Subscription Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default tabNavigations;
