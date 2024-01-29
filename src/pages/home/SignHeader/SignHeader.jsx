import React from 'react';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import { Link } from 'react-router-dom';
import './SignHeader.css';
import headerVector from '../../../asset/headerVector.png';

const SignHeader = ({ title, linkText, linkTo, buttonText, buttonProps }) => {
  return (
    <div className='signheader-main'>
      <div className='signheader-content'>
        <div className='signheader-amchattext'>
          <h2>
            {title} <img className='headerVector-icon' src={headerVector} alt='' />
          </h2>
        </div>
        <div className='signheader-buttoncontent'>
          <div className='signheader-account'>
            <Link className='signin-link' to={linkTo}>{linkText}</Link>
          </div>
          <div className='signheader-btn'>
            <Link to={linkTo} style={{ textDecoration: 'none' }}>
              <GeneralButton {...buttonProps}>
                {buttonText}
              </GeneralButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignHeader;
