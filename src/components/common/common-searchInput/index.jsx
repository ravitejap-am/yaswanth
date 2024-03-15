import { Box, TextField } from "@mui/material";
import React from "react";

const index = ({ inputLabel, inputValue, inputClass, handleSearchChange }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      label={inputLabel}
      value={inputValue}
      className={inputClass}
      onChange={handleSearchChange}
    />
  );
};

export default index;
