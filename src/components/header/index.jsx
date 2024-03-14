import React from 'react';
import PopupState, { bindPopover } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Style from './header.module.css';
import defaultImage from "../../../src/asset/defaultProfile.jpg";
import PersonIcon from '@mui/icons-material/Person';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Header({
  componentName,
  customStyle,
  navigationRoute
}) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  const handleViewProfile = () => {
    window.location.href = navigationRoute
  };

  const HeaderImage = localStorage.getItem('userImageUrl') || defaultImage;
  const storedFullName = localStorage.getItem('fullName');

  return (
    <PopupState variant="popover" popupId="profile-popup-popover">
      {(popupState) => (
        <div className={Style.headermain}>
          <div className={Style.headertext}>{componentName}</div>
          <div onClick={popupState.open} className={Style.popupalignment}>
            <div>
              <img
                src={HeaderImage}
                alt=""
                className={Style.roundedimage}
              />
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
             <span className= {Style.Iconalgnment}><PersonIcon /> </span> 
              <span>View Profile</span>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
             <span className= {Style.Iconalgnment}> <LogoutOutlinedIcon /></span>
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      )}
    </PopupState>
  );
}

export default Header;
