import React, { useState } from "react";
import SubscriptionPlanStyle from "./SubscriptionPlan.module.css";

function SubscriptionPlan() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
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
              checked={selectedPlan === "freemium"}
              onChange={() => handlePlanSelection("freemium")}
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
              checked={selectedPlan === "standard"}
              onChange={() => handlePlanSelection("standard")}
            />
            Standard
          </label>
        </div>
      </label>
    </div>
  );
}

export default SubscriptionPlan;
