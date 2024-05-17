import React from 'react'
import {
    Box,
    Typography,
    TextField,
    Autocomplete,
    Popper,
} from '@mui/material'
import { scopes } from '../../constants/scopes'
import CustomDialog from '../../components/Dialog/CustomDialog'


function DocumentSelection({handleSearchOptionChange,handleFileChange,handleOkWarning,searchOption,permittedScopes,showWarning,documents,selectedFile,handleCancelWarning,isMobile}) {
  return (
    <Box
    sx={{
        borderBottom: '1px solid lightGrey',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile
            ? 'space-around'
            : 'flex-start',
        flexDirection: 'row',
        gap: isMobile ? '0.6rem' : '2rem',
        paddingBottom: '10px',
        flexWrap: 'wrap',
        marginTop: isMobile ? '0.5em' : '0px',
    }}
>
    {permittedScopes?.includes(scopes.CHC) && (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <input
                    type="radio"
                    value="acrossFiles"
                    checked={searchOption === 'acrossFiles'}
                    onChange={() =>
                        handleSearchOptionChange(
                            'acrossFiles'
                        )
                    }
                />
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: isMobile
                            ? '0.9rem'
                            : '1rem',
                        paddingTop: '0.19rem',
                    }}
                >
                    Across
                </Typography>
            </Box>
            {permittedScopes?.includes(scopes.DCR) && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <input
                        type="radio"
                        value="specificFileText"
                        checked={
                            searchOption ===
                            'specificFileText'
                        }
                        onChange={() =>
                            handleSearchOptionChange(
                                'specificFileText'
                            )
                        }
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: isMobile
                                ? '0.9rem'
                                : '1rem',
                            paddingTop: '0.19rem',
                        }}
                    >
                        Specific
                    </Typography>
                </Box>
            )}

            {searchOption === 'specificFileText' && (
                <Box>
                    <Autocomplete
                        onChange={(_event, newValue) =>
                            handleFileChange(newValue)
                        }
                        id="document"
                        fullWidth={true}
                        options={documents}
                        getOptionLabel={(option) =>
                            option?.name
                        }
                        value={selectedFile}
                        sx={{
                            '.MuiInputLabel-root': {
                                transform:
                                    'translateY(-50%)',
                                top: '50%',
                                left: '5%',
                                position: 'absolute',
                                '&.Mui-focused': {
                                    transform:
                                        'translateY(-50%) scale(0.75)',
                                    top: 0,
                                },
                                '&.MuiInputLabel-shrink': {
                                    transform:
                                        'translate(0, -50%) scale(0.75)',
                                    top: 0,
                                },
                            },
                            '.MuiAutocomplete-inputRoot': {
                                position: 'relative',
                                height: '40px',
                                lineHeight: '1em',
                                paddingTop: '0px',
                                minWidth: '250px',
                                overflow: 'visible',
                                flexGrow: 1,
                            },
                        }}
                        PopperComponent={(props) => (
                            <Popper
                                {...props}
                                style={{ width: 'auto' }}
                            />
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Document"
                            />
                        )}
                    />
                              <CustomDialog
                                open={showWarning}
                                onClose={handleCancelWarning}
                                onOk={handleOkWarning}
                                title="Warning"
                                content="Interacting across files is a costly and time-consuming process. Would you like to continue?"
                                okButtonText="Ok"
                                cancelButtonText="Cancel"
                            />
                </Box>
            )}
        </>
    )}
</Box>
  )
}

export default DocumentSelection