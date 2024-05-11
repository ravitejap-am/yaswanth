import React from "react";
import UserInfoMain from "./UserInfoMain";
import { Box } from "@mui/material";

function UserInfo(props) {
  const {
    formData,
    handleChange,
    handleSubmit,
    isEdit,
    isView,
    isMobile,
    isAndroid,
    cancelHandler,
    buttonLoading,
    isDirty,
    errors,
    permittedScopes,
    scopes,
  } = props;

  return (
    <Box>
      <h1>Userinfo </h1>
      <UserInfoMain
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        isView={isView}
        isMobile={isMobile}
        isAndroid={isAndroid}
        cancelHandler={cancelHandler}
        buttonLoading={buttonLoading}
        isDirty={isDirty}
        errors={errors}
        permittedScopes={permittedScopes}
        scopes={scopes}
      />
    </Box>
  );
}

export default UserInfo;
