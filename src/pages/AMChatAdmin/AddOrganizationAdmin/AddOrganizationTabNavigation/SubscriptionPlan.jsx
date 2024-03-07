import React, { useState } from 'react';
import SubscriptionPlanStyle from './SubscriptionPlan.module.css';
import { Button } from 'antd';

function SubscriptionPlan({
  orgData,
  setSelectedTab,
  selectedTab,
  selectOrgData,
  addOrganisation,
  buttonLoading,
  organisation,
  editOrganisation,
  personalInformationHandler,
}) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    // const updatedOrgData = {
    //   ...orgData,
    //   plan: plan,
    // };

    // selectOrgData(updatedOrgData);
    // setSelectedTab('subscriptionplan');
    setSelectedPlan(plan);
  };

  return (
    <div>
      <label>
        <p>Choose Your Plan</p>
        <div>
          <label>
            <input
              type="radio"
              name="subscriptionPlan"
              value="freemium"
              checked={selectedPlan === 'freemium'}
              onChange={() => handlePlanSelection('freemium')}
            />
            Freemium
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="subscriptionPlan"
              value="standard"
              checked={selectedPlan === 'standard'}
              onChange={() => handlePlanSelection('standard')}
            />
            Standard
          </label>
        </div>
      </label>
      {/* <Button
        style={{
          display: 'flex',
          width: '130px',
          height: '50px',
          padding: '10px 16px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flexShrink: '0',
          borderRadius: '30px',
          backgroundColor: 'var(--Brand-500, #6366F1)',
          color: '#FFFFFF',
          fontFamily: 'Into Lato',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '24px',
        }}
        onClick={() => {
          console.log(orgData);
          if (organisation?.organisationStatus == 'edit') {
            editOrganisation(orgData);
          } else {
            addOrganisation();
          }
        }}
        loading={buttonLoading}
        disabled={!!!selectedPlan}
      >
        {organisation?.organisationStatus == 'edit' ? 'Save' : 'Submit'}
      </Button> */}
      <div
        className="center"
        style={{ marginTop: '1em', gap: '2em', justifyContent: 'flex-start' }}
      >
        <Button
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('organizationdomains');
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
