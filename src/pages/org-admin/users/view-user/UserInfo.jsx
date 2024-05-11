import React, { useState } from "react";
import { Box } from "@mui/material";
import UserInfoMain from "./UserInfoMain";
import UserDetail from "./UserDetail";

function UserInfo({ organisation, props }) {
  const { userData } = organisation;
  const { firstName, lastName, email } = userData;

  const {
    formData: initialFormData = {},
    permittedScopes,
    scopes,
  } = props || {};
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <UserInfoMain
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={false}
        isView={false}
        isMobile={false}
        isAndroid={false}
        cancelHandler={() => {}}
        buttonLoading={false}
        isDirty={false}
        errors={{}}
        permittedScopes={permittedScopes}
        scopes={scopes}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    </Box>
  );
}

export default UserDetail(UserInfo);
