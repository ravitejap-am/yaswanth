import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import CancelButton from "../../../../components/common/buttons/CancelButton";

function OrganizationStatistic() {
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
          marginTop: isMobile ? "150px" : "139px",
          paddingRight: isMobile ? "" : "35px",
        }}
      >
        <Link to="/organisations" style={{ textDecoration: "none" }}>
          <CancelButton
            onClick={onclick}
            style={{}}
            text="Cancel"
            onMouseOver={(e) => {
              e.target.style.borderColor = "#5f94f5";
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = "rgb(218, 218, 218)";
            }}
          />
        </Link>
      </Box>
    </>
  );
}

export default OrganizationStatistic;
