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
    
      <Grid 
       container
       sx={{
         height:'60vh',
         overflowY:'scroll',
         '&::-webkit-scrollbar': {
           width: '2px',
           height: '2px' 
         },
         '&::-webkit-scrollbar-track': {
           background: 'transparent', 
         },
         '&::-webkit-scrollbar-thumb': {
           background: '#888', 
           borderRadius: '6px', 
         },
       }}      
      >
      <Grid item container  >
        <Grid item >
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
      </Grid>
        <Grid item
          container 
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        xs={12} 
        >
          <Button
              style={{ marginTop: '1em', width: '8em' }}
              onClick={() => {
                personalInformationHandler('organizationadmin');
              }}
            >
              Previous
            </Button>
        </Grid>
      </Grid>
    
  );
}

export default SubscriptionPlan;
