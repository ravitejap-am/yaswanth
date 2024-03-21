import React, { useState } from 'react';
import SubscriptionPlanStyle from './SubscriptionPlan.module.css';
import { Button} from 'antd';
import { Box, Grid } from '@mui/material';
// import { Typography } from '@mui/material/styles/createTypography'
import Typography from '@mui/material/Typography';

function SubscriptionPlan({ personalInformationHandler }) {
  const [selectedPlan, setSelectedPlan] = useState('freemium');

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Choose Your Plan</Typography>
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
        </Grid>
        <Grid item xs={12} >
          <Button
              style={{ marginTop: '1em', width: '8em' }}
              onClick={() => {
                personalInformationHandler('personalinformation');
              }}
            >
              Previous
            </Button>
        </Grid>
      </Grid>
    </Box>
    // <div>
    //   <label>
    //     <p>Choose Your Plan</p>
    //     <div>
    //       <label>
    //         <input
    //           type="radio"
    //           name="subscriptionPlan"
    //           value="freemium"
    //           checked={selectedPlan === 'freemium'}
    //           onChange={() => handlePlanSelection('freemium')}
    //         />
    //         Freemium
    //       </label>
    //     </div>

    //     <div>
    //       <label>
    //         <input
    //           type="radio"
    //           name="subscriptionPlan"
    //           value="standard"
    //           checked={selectedPlan === 'standard'}
    //           onChange={() => handlePlanSelection('standard')}
    //         />
    //         Standard
    //       </label>
    //     </div>
    //   </label>

    //   <div
    //     className="center"
    //     style={{ marginTop: '1em', gap: '2em', justifyContent: 'flex-start' }}
    //   >
    //     <Button
    //       style={{ marginTop: '1em', width: '8em' }}
    //       onClick={() => {
    //         personalInformationHandler('organizationdomains');
    //       }}
    //     >
    //       Back
    //     </Button>
    //   </div>
    // </div>
  );
}

export default SubscriptionPlan;
