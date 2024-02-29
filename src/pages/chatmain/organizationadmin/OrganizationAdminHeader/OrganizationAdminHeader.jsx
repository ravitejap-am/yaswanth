import React from 'react';
import Styles from './OrganizationAdmin.module.css';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DefaultProfileImage from '../../../../asset/defaultProfile.jpg';

function OrganizationAdminHeader({
  componentName,
  name,
  profileImageSrc,
  customStyle,
  navigationRoute
}) {
  const style = {
    width: 200,
    ...customStyle,
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  const handleViewProfile = () => { 
    window.location.href = navigationRoute
  }
  return (
    <PopupState variant="popover" popupId="profile-popup-popover">
      {(popupState) => (
        <div className={Styles.bannerBtn}>
          <div className={Styles.superAdminOrganizationListName}>
            {componentName}
          </div>

          <div
            className={Styles.superAdminProfileImgNameStyle} 
            onClick={popupState.open}
          >
            <div>
            <img
              src={profileImageSrc ? profileImageSrc : DefaultProfileImage}
              alt=""
              className={Styles.AdminProfileStyle}
              style={customStyle.imageStyle}
            />
            </div>
            <span
              className={Styles.SuperAdminProfileStyle}
              style={customStyle.textStyle}
            >
              {name}
            </span>
          </div>

          <Popover
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
            <List sx={style}>
              <ListItem onClick={handleViewProfile}>
                  {/* <Link
                    to= {navigationRoute}
                    style={{ textDecoration: 'none' }}
                  > */}
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIndOutlinedIcon />
                  </ListItemIcon>
                    <ListItemText primary="View Profile" />
                </ListItemButton>
                {/* </Link> */}
              </ListItem>
              <Divider component="li" />
              <ListItem onClick={handleLogout}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default OrganizationAdminHeader;
