import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import GeneralButton from "../../../../components/common/buttons/GeneralButton";

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
          marginTop: "3.3rem",
        }}
      >
        <Link to="/organisations" style={{ textDecoration: "none" }}>
          <GeneralButton
            name="Cancel"
            buttonProps={{}}
            type="default"
            color="#334155"
            backgroundColor="transparent"
            width="130px"
            height="50px"
            borderRadius="30px"
          />
        </Link>
      </Box>
    </>
  );
}

export default OrganizationStatistic;
