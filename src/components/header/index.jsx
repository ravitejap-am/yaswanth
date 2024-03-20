import React, { useState, useEffect } from "react";
import PopupState, { bindPopover } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Style from "./header.module.css";
import defaultImage from "../../../src/asset/defaultProfile.jpg";
import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import { tokenDecodeJWT } from "../../utils/authUtils"; 
import * as constants from '../../constants/Constant'

function Header({ componentName, customStyle, navigationRoute }) {
  const user = useSelector(selectUser);
  const jwt = user?.userToken;
  const decodedToken = tokenDecodeJWT(jwt);
  const userId = decodedToken ? decodedToken?.userId : null;
  const [headerImage, setHeaderImage] = useState(localStorage.getItem("userImageUrl") ?? defaultImage)

  // const HeaderImage = localStorage.getItem("userImageUrl") ?? defaultImage;
  const storedFullName = localStorage.getItem("fullName");

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    } else {
      console.log("User ID is missing or invalid")
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/getUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Failed to fetch user profile.');
      }

      const userData = await response.json();
      // setUserData({
      //   firstName: userData?.data?.user?.firstName,
      //   lastName: userData?.data?.user?.lastName,
      //   email: userData?.data?.user?.email,
      //   organization: userData?.data?.organisation?.name,
      //   status:
      //     userData?.data?.organisation?.active == true ? 'ACTIVE' : 'INACTIVE',
      // });
      
      const profileImagePath = userData?.data?.user?.profileImagePath;
      if (profileImagePath) {
        localStorage.setItem(
          'userImageUrl',
          `https://medicalpublic.s3.amazonaws.com/${profileImagePath}`
        );
        const fullImagePath = `https://medicalpublic.s3.amazonaws.com/${profileImagePath}`
        setHeaderImage(fullImagePath)
      }
      // setUserData(userData?.data?.user);
      // setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // setError('Failed to fetch user profile.');
      // setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  const handleViewProfile = () => {
    window.location.href = "/Info";
  };



  return (
    <PopupState variant="popover" popupId="profile-popup-popover">
      {(popupState) => (
        <div className={Style.headermain}>
          <div className={Style.headertext}>{componentName}</div>
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
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleViewProfile}>
              <span className={Style.Iconalgnment}>
                <PersonIcon />{" "}
              </span>
              <span>View Profile</span>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <span className={Style.Iconalgnment}>
                {" "}
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
