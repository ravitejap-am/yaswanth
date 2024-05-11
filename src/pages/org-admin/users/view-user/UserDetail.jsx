import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../store/authSlice";

const UserDetail = (Component) => {
  const UserDetailsWrapper = (props) => {
    const organisation = useSelector(selectUserDetails);
    console.log("org admin detial", organisation);
    return <Component {...props} organisation={organisation} />;
  };
  return UserDetailsWrapper;
};

export default UserDetail;
