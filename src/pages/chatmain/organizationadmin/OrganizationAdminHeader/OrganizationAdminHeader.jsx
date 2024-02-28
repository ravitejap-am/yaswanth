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
            <img
              src={profileImageSrc ? profileImageSrc : DefaultProfileImage}
              alt=""
              className={Styles.AdminProfileStyle}
              style={customStyle.imageStyle}
            />
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
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIndOutlinedIcon />
                  </ListItemIcon>
                  <Link
                    to= {navigationRoute}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItemText primary="View Profile" />
                  </Link>
                </ListItemButton>
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
