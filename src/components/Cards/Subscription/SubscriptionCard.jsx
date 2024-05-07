import React, { useState } from 'react'
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material'
import SubscriptionPlanStyle from './subscriptioncard.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
function SubscriptionCard({
    item,
    selectedPlan,
    setSelectedPlan,
    externalHeight,
}) {
    const handleCardClick = (subscription) => {
        setSelectedPlan(subscription)
    }
    return (
        <Card
            className={`${SubscriptionPlanStyle.card} ${
                selectedPlan === item.title && SubscriptionPlanStyle.selected
            }`}
            onClick={() => handleCardClick(item.title)}
            sx={{ borderRadius: '10px', pb: '10px' }}
        >
            <CardContent>
                <Typography variant="h5">{item.title}</Typography>
                <Box sx={{ height: externalHeight ? externalHeight : '2.5em' }}>
                    <Typography variant="body2">{item.description}</Typography>
                </Box>

                <Box>
                    {
                        <p
                            className="Right_Plan_Content_Price"
                            style={{ height: '1rem' }}
                        >
                            <span className="price" style={{ color: 'black' }}>
                                {item.price}
                            </span>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'gray',
                                }}
                            >
                                {item.price === 'Free'
                                    ? ''
                                    : item.price === ''
                                      ? ''
                                      : '/Month'}
                            </Typography>
                        </p>
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                        height: '9em',
                    }}
                >
                    {item?.features?.map((feature, index) => {
                        return (
                            <Box sx={{ display: 'flex', gap: '1em' }}>
                                <CheckCircleIcon />
                                <Typography sx={{ color: 'black' }}>
                                    {feature}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </CardContent>
        </Card>
    )
}

export default SubscriptionCard
