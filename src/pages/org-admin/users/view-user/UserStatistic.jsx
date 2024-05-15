import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {  useNavigate } from "react-router-dom";
import CancelButton from "../../../../components/common/buttons/CancelButton";

function UserStatistic() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/users");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
          width: "100%",
          flexDirection: "column",
          marginTop: isMobile ? "150px" : "100px"
        }}
      >
        <Typography variant="h4" gutterBottom >
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
          marginTop: isMobile ? "285px" : "180px",
        }}
      >
        <CancelButton
          onClick={handleCancel}
          style={{}}
          text="Cancel"
          onMouseOver={(e) => {
            e.target.style.borderColor = "#5f94f5";
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = "rgb(218, 218, 218)";
          }}
        />
      </Box>
    </>
  );
}

export default UserStatistic;
