import React from "react";
import documentIcon from "../../../asset/Group 23 (1).png";
import vector from "../../../asset/vectoricon.png";
import { Card, CardMedia, Grid, Box } from "@mui/material";

const DashboardCard = () => {
  return (
    <Card style={{ height: "100px", width: "250px", padding:"20px" }}>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <CardMedia
          component="img"
          image={documentIcon}
          style={{ width: "auto", height: "auto" }}
        />
        11
      </Box>
      <Grid container xs={12} md={12} lg={12}>
        <CardMedia
          component="img"
          image={vector}
          style={{ width: "auto", height: "auto" }}
        />
      </Grid>
    </Card>
  );
};

export default DashboardCard;
