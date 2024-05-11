import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../../../../components/common/buttons/GeneralButton";
import CancelButton from "../../../../components/common/buttons/CancelButton";

function UserStatistic() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" gutterBottom>
          No Data Available
        </Typography>
        <Typography variant="body1" align="center">
          Sorry, there is no data available at the moment.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: isMobile ? "center" : "flex-end",
          alignItems: isMobile ? "center" : "flex-end",
          marginTop: isMobile ? "" : "370px",
          paddingRight: isMobile ? "" : "5px",
        }}
      >
        <Link to="/users" style={{ textDecoration: "none" }}>
          <CancelButton />
        </Link>
      </Box>
    </>
  );
}

export default UserStatistic;
