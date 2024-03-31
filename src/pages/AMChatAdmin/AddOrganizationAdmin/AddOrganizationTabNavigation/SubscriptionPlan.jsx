import React, { useState, useEffect } from 'react';
import SubscriptionPlanStyle from './SubscriptionPlan.module.css';
import { Button } from 'antd';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SubscriptionCard from '../../../../components/Cards/Subscription/SubscriptionCard';

const subscription = [
  {
    title: 'Freemium',
    description:
      'Revolutionize keywords search into your document with our free plan.',
    price: '9.99',
    features: [
      'Max 2 users',
      'Max 5 Documents',
      'Upload size 2 MB',
      'Max 10 chats free',
    ],
  },
  {
    title: 'Standard',
    description:
      'Best fit for organisation with 50 to 100 users or 10 to 50 users. ',
    price: '99.99',
    features: [
      'Max 50 users',
      'Max 5 Documents',
      'Upload size 5 MB',
      'Max 100 chats free',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For details about this plan, please press the button below.',
    price: '999.99',
    features: [
      'Max 100 users',
      'Max 50 Documents',
      'Upload size 50 MB',
      'Max 1000 chats free',
    ],
  },
];

function SubscriptionPlan({ personalInformationHandler }) {
  const [selectedPlan, setSelectedPlan] = useState('Freemium');
  const [subscriptionItems, setSubscriptionItems] = useState();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    getSubscriptionDetails();
  }, []);

  const getSubscriptionDetails = () => {
    // axios.get().then(()=>{}).catch(()=>{})
    setSubscriptionItems(subscription);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <Box
      sx={{
        height: '60vh',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2}>
        {subscriptionItems?.map((item) => {
          return (
            <Grid item xs={12} md={4}>
              <SubscriptionCard
                item={item}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ flex: 1 }}></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '1em',
        }}
      >
        <Button
          style={{ marginTop: '1em', width: '8em' }}
          onClick={() => {
            personalInformationHandler('personalinformation');
          }}
        >
          <Typography variant="body1">Previous</Typography>
        </Button>
      </Box>
    </Box>
    // <Grid
    //   container
    //   direction="column"
    //   justifyContent="space-between"
    //   alignItems="flex-start"
    //   sx={{
    //     height: '60vh',
    //     overflowY: 'scroll',
    //   }}
    // >
    //   <Box>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} md={4}>
    //         <SubscriptionCard />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         <SubscriptionCard />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         <SubscriptionCard />
    //       </Grid>
    //     </Grid>
    //   </Box>
    //   <Grid
    //     item
    //     container
    //     direction="row"
    //     justifyContent={isMobile ? 'center' : 'flex-end'}
    //     alignItems={isMobile ? 'center' : 'flex-end'}
    //   >
    //     <Button
    //       style={{ marginTop: '1em', width: '8em' }}
    //       onClick={() => {
    //         personalInformationHandler('personalinformation');
    //       }}
    //     >
    //       <Typography variant="body1">Previous</Typography>
    //     </Button>
    //   </Grid>
    // </Grid>
  );
}

export default SubscriptionPlan;
