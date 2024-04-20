import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

function MobileViewUserAccordin({ data, handleEdit, handleConfirmationPopUp }) {
  console.log('mobileData', data);
  return (
    <div style={{ marginTop: '1em', marginBottom: '8em' }}>
      {data?.length > 0 && (
        <>
          {data.map((user, index) => {
            return (
              <Accordion defaultExpanded={index == 0 ? true : false}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  {user.name}
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexDirection: 'column',
                      gap: '1em',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ width: '6em' }}>Email</Typography>
                      <Typography style={{ width: '0.5em' }}>:</Typography>
                      <Typography> {user.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ width: '6em' }}>Last Chat</Typography>
                      <Typography style={{ width: '0.5em' }}>:</Typography>
                      <Typography>{user.lastChat}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ width: '6em' }}>Total Chat</Typography>
                      <Typography style={{ width: '0.5em' }}>:</Typography>
                      <Typography>{user.totalChat}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ width: '6em' }}>Status</Typography>
                      <Typography style={{ width: '0.5em' }}>:</Typography>
                      <Typography>{user.status}</Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
                <AccordionActions>
                  <Button onClick={() => handleEdit(user.id)}>Edit</Button>
                  <Button
                    onClick={() => {
                      const props = {
                        id: user.id,
                        name: user.name,
                      };
                      handleConfirmationPopUp(props);
                    }}
                  >
                    Delete
                  </Button>
                </AccordionActions>
              </Accordion>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MobileViewUserAccordin;
