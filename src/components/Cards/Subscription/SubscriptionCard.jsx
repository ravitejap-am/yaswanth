import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import SubscriptionPlanStyle from './subscriptioncard.module.css';
function SubscriptionCard() {
  const [selectedSubscription, setSelectedSubscription] = useState('freemium');
  return (
    <Card
      className={`${SubscriptionPlanStyle.card} ${
        selectedSubscription === 'freemium' && SubscriptionPlanStyle.selected
      }`}
      // onClick={() => handleCardClick('freemium')}
    >
      <CardContent>
        <Typography variant="h5">Freemium</Typography>
        <Typography variant="body2">Basic features included</Typography>
      </CardContent>
    </Card>
  );
}

export default SubscriptionCard;
