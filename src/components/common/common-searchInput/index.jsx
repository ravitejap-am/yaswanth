import { Box, TextField } from "@mui/material";
import React from "react";

const index = ({ inputLabel, inputValue, inputClass, handleSearchChange }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      sx={{
        width: {
          xs: "250px",
          sm: "280px",
          md: "280px",
          lg: "280px",
        },
      }}
      label={inputLabel}
      value={inputValue}
      className={inputClass}
      onChange={handleSearchChange}
    />
  );
};

export default index;
