import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'

function MobileViewOrganisationAccordin({
    data,
    handleEdit,
    handleConfirmationPopUp,
    handleViewOrganisation,
}) {
    return (
        <div style={{ marginTop: '1em', marginBottom: '8em' }}>
            {data?.length > 0 && (
                <>
                    {data.map((organisation, index) => {
                        return (
                            <Accordion
                                defaultExpanded={index == 0 ? true : false}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    {organisation.organisationName}
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
                                            <Typography
                                                sx={{ minWidth: '8em' }}
                                            >
                                                Address
                                            </Typography>
                                            <Typography
                                                style={{ minWidth: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {' '}
                                                {organisation.address}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography
                                                sx={{ maxWidth: '8em' }}
                                            >
                                                Organisation Admin
                                            </Typography>
                                            <Typography
                                                style={{ minWidth: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {organisation.organisationAdmin}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography
                                                sx={{ minWidth: '8em' }}
                                            >
                                                Plans
                                            </Typography>
                                            <Typography
                                                style={{ minWidth: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {organisation.plans}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Typography
                                                sx={{ minWidth: '8em' }}
                                            >
                                                Status
                                            </Typography>
                                            <Typography
                                                style={{ minWidth: '0.5em' }}
                                            >
                                                :
                                            </Typography>
                                            <Typography>
                                                {organisation.status}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button
                                        onClick={() =>
                                            handleEdit(organisation.id)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleViewOrganisation(
                                                organisation.id
                                            )
                                        }
                                    >
                                        View
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const props = {
                                                id: organisation.id,
                                                name: organisation.organisationName,
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

export default MobileViewOrganisationAccordin
