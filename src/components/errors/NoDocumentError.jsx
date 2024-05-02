import { Box, Typography } from "@mui/material";
import React from "react";

const NoDocumentError = ({ ErrorIcon, errorMsgBody, errorMsgTitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 4,
        width: "100%",
      }}
    >
      {ErrorIcon}
      <Box>
        <Typography variant="h6" gutterBottom align="center">
          {errorMsgTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center">
          {errorMsgBody}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoDocumentError;
