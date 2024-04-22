import React, { useState, useEffect } from 'react';
import PopupState, { bindPopover } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Style from './header.module.css';
import defaultImage from '../../../src/asset/defaultProfile.jpg';
import PersonIcon from '@mui/icons-material/Person';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import { tokenDecodeJWT } from '../../utils/authUtils';
import * as constants from '../../constants/Constant';
import { Typography } from '@mui/material';

function Header({ componentName, customStyle, navigationRoute }) {
  const user = useSelector(selectUser);
  const jwt = user?.userToken;
  const decodedToken = tokenDecodeJWT(jwt);
  const userId = decodedToken ? decodedToken?.userId : null;
  const headerImage = localStorage.getItem('userImageUrl') ?? defaultImage;

  const storedFullName = localStorage.getItem('fullName');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  const handleViewProfile = () => {
    window.location.href = '/Info';
  };

  return (
    <PopupState variant="popover" popupId="profile-popup-popover">
      {(popupState) => (
        <div className={Style.headermain}>
          <Typography variant="h5" color={'#312e81'}>
            {componentName}
          </Typography>
          {/* <div className={Style.headertext}>{componentName}</div> */}
          <div onClick={popupState.open} className={Style.popupalignment}>
            <div>
              <img src={headerImage} alt="" className={Style.roundedimage} />
            </div>
            <div className={Style.Usernametext}>
              <span>{storedFullName}</span>
            </div>
          </div>
          <Menu
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleViewProfile}>
              <span className={Style.Iconalgnment}>
                <PersonIcon />{' '}
              </span>
              <span>View Profile</span>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <span className={Style.Iconalgnment}>
                {' '}
                <LogoutOutlinedIcon />
              </span>
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      )}
    </PopupState>
  );
}

export default Header;
