import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

function PageLoader({ loadingStatus = false }) {
    return (
        <Backdrop style={{ zIndex: 999, color: '#fff' }} open={loadingStatus}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default PageLoader
