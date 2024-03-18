import React from "react";
import vector from "../../../asset/vectoricon.png";
import { Card, CardMedia, Grid, Box, Typography } from "@mui/material";

const DashboardCard = ({ mainClass, icon, contentName, contentNumber }) => {
  return (
    <Card className={mainClass}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "20px 20px 0 20px",
        }}
      >
        <Box>
          <CardMedia
            component="img"
            image={icon}
            style={{ width: "auto", height: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2">{contentName}</Typography>{" "}
          <Typography variant="h5" display="block" fontWeight={700}>
            {contentNumber}
          </Typography>
        </Box>
      </Box>
      <Grid container xs={12} md={12} lg={12}>
        <CardMedia
          component="img"
          image={vector}
          style={{ width: "100%", height: "10%" }}
        />
      </Grid>
    </Card>
  );
};

export default DashboardCard;
