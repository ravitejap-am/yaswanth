import React from 'react';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import { Link } from 'react-router-dom';
import './SignHeader.css';
import headerVector from '../../../asset/headerVector.png';
import { Box, Typography } from '@mui/material';

const SignHeader = ({ title, linkText, linkTo, buttonText, buttonProps }) => {
  return (
    <div className="signheader-main">
      <div className="signheader-content">
        <Box className="signheader-amchattext">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <Typography variant="h5" mt={1}>             
           {title}
              {/* <img className="headerVector-icon" src={headerVector} alt="" /> */}
              </Typography>
          </Link>
        </Box>
        <div className="signheader-buttoncontent">
          <Box className="signheader-account">
            <Link className="signin-link" to={linkTo}>
            <Typography variant="body2" gutterBottom>
              {linkText}
              </Typography>
            </Link>
          </Box>
          <div className="signheader-btn">
            <Link to={linkTo} style={{ textDecoration: 'none' }}>
              <GeneralButton {...buttonProps}><Typography variant="button" display="block" gutterBottom>{buttonText}</Typography></GeneralButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignHeader;
