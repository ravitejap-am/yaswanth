import React, { useState } from 'react';
import SubscriptionPlanStyle from './SubscriptionPlan.module.css';
import { Button} from 'antd';
import { Box, Grid, useMediaQuery } from '@mui/material';
// import { Typography } from '@mui/material/styles/createTypography'
import Typography from '@mui/material/Typography';

function SubscriptionPlan({ personalInformationHandler }) {
  const [selectedPlan, setSelectedPlan] = useState('freemium');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
      <Grid 
        container 
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          height:'60vh',
           overflowY:'scroll',
         }}       
        >
        <Grid item  >
          <Typography variant="h6">Choose Your Plan</Typography>
          <Typography variant="body1">
             <input
              type="radio"
              name="subscriptionPlan"
              value="freemium"
              checked={selectedPlan === 'freemium'}
              onChange={() => handlePlanSelection('freemium')}
            />
            Freemium
            </Typography>
            <Typography variant="body1">
           <input
              type="radio"
              name="subscriptionPlan"
              value="standard"
              checked={selectedPlan === 'standard'}
              onChange={() => handlePlanSelection('standard')}
            />
            Standard
            </Typography>          
        </Grid>
        <Grid item  
          container
          direction="row"
          justifyContent={isMobile ? "center" : "flex-end" }
          alignItems={isMobile ? "center" : "flex-end" }
        >
          <Button
              style={{ marginTop: '1em', width: '8em' }}
              onClick={() => {
                personalInformationHandler('personalinformation');
              }}
            >
              <Typography variant="body1">Previous</Typography>
            </Button>
        </Grid>
      </Grid>
  );
}

export default SubscriptionPlan;
