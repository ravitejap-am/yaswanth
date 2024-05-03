import React from 'react'
import {
    Typography,
    Dialog,
    DialogContent,
    Backdrop,
    useMediaQuery,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EmailNotification from '../../../asset/EmailNotification.png'
import './ContactUp.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
// import { IoIosNotifications } from "react-icons/io";
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded'

const Thankyou = (props) => {
    const { showThanksPopup, handleClose, setShowThanksPopup } = props
    const isMobile = useMediaQuery('(max-width:600px)')

    const handleBackdropClick = (event) => {
        event.stopPropagation()
    }
    return (
        <Dialog
            open={showThanksPopup}
            onClose={handleClose}
            aria-labelledby="thanks"
            fullScreen={true}
            sx={{
                '& .MuiDialog-paper': {
                    background: `linear-gradient(
          114deg,
          #0f172a 52%,
          #152346 68.32%,
          #1a2e5e 92.75%
        )`,
                    height: '80%',
                    width: '80%',
                },

                '.css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'saturate(180%) blur(5px)',
                    // backgroundColor:'rgba(0,0,0,0.3)'
                },
            }}
            onClick={handleBackdropClick}
        >
            <div id="thanks" className="close_icon">
                <HighlightOffIcon
                    className="close_icon_style"
                    onClick={(e) => handleClose(e)}
                />
            </div>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div className="content_container">
                    <Typography
                        style={{
                            color: '#fff',
                            fontSize: '40px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Thank you for reaching out to us!
                    </Typography>
                    <Typography
                        style={{ color: '#94a3b8', textAlign: 'center' }}
                    >
                        We look forward to assisting your business in
                        implementing AM-Chat. Rest assured, we'll be in touch
                        shortly to guide you through the setup process.
                    </Typography>
                </div>
                <div className="thankyou_footer">
                    <div className="notification_container">
                        <CircleNotificationsRoundedIcon
                            style={{
                                height: '40px',
                                width: '40px',
                                color: '#6366F1',
                            }}
                        />
                    </div>
                    <Typography
                        style={{
                            color: '#94a3b8',
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Stay tuned for our reply
                    </Typography>
                    <Typography
                        style={{
                            color: '#94a3b8',
                            textAlign: 'center',
                            fontSize: '16px',
                        }}
                    >
                        To ensure you receive our updates in inbox, please add
                        sales@areteminds.com to your contacts
                    </Typography>
                </div>
                {!isMobile ? <div style={{ height: '5%' }}></div> : ''}
            </DialogContent>
        </Dialog>
    )
}

export default Thankyou
