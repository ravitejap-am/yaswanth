import React from 'react'
import './Idea.css'
import tickSign from '../../../asset/tick.png'
import GeneralButton from '../../../components/common/buttons/GeneralButton'
import frame from '../../../asset/Frame 1.png'
import ideaImage from '../../../asset/about.png'
import BannerImage3 from '../../../asset/banner-box-2.png'
import { Link } from 'react-router-dom'
import { Grid } from 'antd'
import { Typography, useMediaQuery } from '@mui/material'
import { BUTTON_COLOUR } from '../../../constants/Constant'
function Idea() {
    const { useBreakpoint } = Grid
    const screens = useBreakpoint()
    const isMobile = useMediaQuery('(max-width:600px)')

    const smallTextStyles = isMobile
        ? {
              fontSize: '23px',
              lineHeight: '1.5',
              // fontWeight: "bold"
          }
        : {}
    return (
        <div className="idea_page_main">
            <div className="text-content">
                <Typography
                    variant="h4"
                    gutterBottom
                    className="bannerHeading"
                    sx={smallTextStyles}
                >
                    We provide a Secure, Personalized and Scalable Gen AI
                    Chatbot for your organisation
                </Typography>
                <div className="bannerPara">
                    <Typography
                        variant="caption"
                        gutterBottom
                        style={{ fontSize: '14px' }}
                    >
                        Use the knowledge of your organisational documents at
                        your fingertips.
                        <br /> Upload your organisational documents to a
                        completely secure Gen AI solution and start interacting
                        with your documents.
                    </Typography>
                </div>
                <div className="bannerParaUnorderList">
                    <div className="bannerPareInnerTextStyle">
                        <img
                            src={tickSign}
                            alt=""
                            style={{ marginRight: '10px' }}
                        />
                        <Typography
                            variant="caption"
                            gutterBottom
                            style={{ fontSize: '14px' }}
                        >
                            {' '}
                            Your organisational documents are completely secure
                        </Typography>
                    </div>
                    <div className="bannerPareInnerTextStyle">
                        <img
                            src={tickSign}
                            alt=""
                            style={{ marginRight: '10px' }}
                        />
                        <Typography
                            variant="caption"
                            style={{ fontSize: '14px' }}
                        >
                            Your documents are loaded in a private instance of
                            Gen AI modal
                        </Typography>
                    </div>
                </div>
                <div className="bannerButton">
                    <Link to="/signIn" style={{ textDecoration: 'none' }}>
                        <GeneralButton
                            name={'Start Chat'}
                            type={'submit'}
                            color={'#f8fafc'}
                            borderRadius={'30px'}
                            backgroundColor={BUTTON_COLOUR}
                            icons={frame}
                            width={'140px'}
                            height={'45px'}
                        />
                    </Link>
                </div>
            </div>
            {screens.lg || screens.sm ? (
                <div>
                    <img src={ideaImage} className="image-style" alt="" />
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default Idea
