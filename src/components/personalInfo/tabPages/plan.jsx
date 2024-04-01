import React from 'react';
import { Card } from 'antd'; 
import righticon from '../../../asset/primiumrighticon.png';
import { Box, Typography } from '@mui/material';

function PersonalPlans() {
  return (
    <Card style={{ width: '%' }}>
      <div className="">
        <Typography variant='h5' mb={2} style={{fontWeight: "bold"}}>Premium</Typography>
        <Typography variant='subtitle2' gutterBottom>
          <img className="right-icon" src={righticon} alt="" /> Max 2 users.
        </Typography >
        <Typography variant='subtitle2' gutterBottom whiteSpace='nowrap'> 
          <img className="right-icon" src={righticon} alt="" />
          Max 5 Documents.
        </Typography >
        <Typography variant='subtitle2' gutterBottom whiteSpace='nowrap'>
          <img className="right-icon" src={righticon} alt="" />
          Upload size 2 MB.
        </Typography>
        <Typography variant='subtitle2' gutterBottom>
          <img className="right-icon" src={righticon} alt="" />
          Max 10 chats free
        </Typography>
        <Box className="note-p-text" mt={3}>
          <Typography variant='body1'>Note: Your plan is due on 31st December 2024</Typography>
        </Box>
      </div>
    </Card>
  );
}

export default PersonalPlans;
