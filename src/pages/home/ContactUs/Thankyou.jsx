import React from 'react'
import {
    Typography,
    Dialog,
    DialogContent,
  } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EmailNotification from "../../../asset/EmailNotification.png";
import "./ContactUp.css"

const Thankyou = (props) => {

  const { showThanksPopup, handleClose, setShowThanksPopup} = props
  return (
    <Dialog
    fullScreen={false}
    open={showThanksPopup}
    onClose={handleClose}
    aria-labelledby="thanks"
    sx={{
      "& .MuiDialog-paper": {
        background: `linear-gradient(
          114deg,
          #0f172a 51.52%,
          #152346 73.32%,
          #1a2e5e 92.75%
        )`,
        height: "100%",
        width: "100%",
      },
    }}
  >
    <div
      id="thanks"
      className='close_icon'
    >
      <HighlightOffIcon className='close_icon_style' onClick={() => handleClose()}/>
    </div>
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className='content_container'>
        <Typography
          style={{
            color: "#fff",
            fontSize: "40px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Thank you for reaching out to us!
        </Typography>
        <Typography style={{ color: "#94a3b8", textAlign: "center" }}>
          We look forward to assisting your business in implementing
          AM-Chat. Rest assured, we'll be in touch shortly to guide
          you through the setup process.
        </Typography>
      </div>
      <div
      className='thankyou_footer'
      >
        <div className="notification_container">
          <img
            src={EmailNotification}
            alt="email-notification=icon"
            className="notification_icon"
          />
        </div>
        <Typography
          style={{
            color: "#94a3b8",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Stay tuned for our reply
        </Typography>
        <Typography
          style={{
            color: "#94a3b8",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          To ensure you receive our updates in inbox, please add
          sales@areteminds.com to your contacts
        </Typography>
      </div>
      <div style={{ height: "5%" }}></div>
    </DialogContent>
  </Dialog>
  )
}

export default Thankyou