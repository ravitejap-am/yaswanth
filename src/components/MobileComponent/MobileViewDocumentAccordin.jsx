import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'

function MobileViewDocumentAccordin({
    data,
    handleEdit,
    handleConfirmationPopUp,
}) {
    return (
        <div style={{ marginTop: '1em', marginBottom: '8em' }}>
            {data?.length > 0 && (
                <>
                    {data.map((document, index) => {
                        return (
                            <Accordion
                                defaultExpanded={index == 0 ? true : false}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    {document.documentName}
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography sx={{ width: '6em' }}>
                                                Size
                                            </Typography>
                                            <Typography
                                                style={{ width: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {' '}
                                                {document.size}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography sx={{ width: '6em' }}>
                                                Version
                                            </Typography>
                                            <Typography
                                                style={{ width: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {document.version}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography sx={{ width: '6em' }}>
                                                Status
                                            </Typography>
                                            <Typography
                                                style={{ width: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {document.status}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button
                                        onClick={() =>
                                            handleEdit(document.id, document)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const props = {
                                                id: document.id,
                                                name: document.documentName,
                                            }
                                            handleConfirmationPopUp(props)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </AccordionActions>
                            </Accordion>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default MobileViewDocumentAccordin
