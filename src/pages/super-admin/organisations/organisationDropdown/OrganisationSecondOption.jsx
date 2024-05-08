import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import GeneralButton from "../../../../components/common/buttons/GeneralButton";

function OrganisationSecondOption() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50%"
        flexDirection="column"
      >
        <Typography variant="h4" gutterBottom>
          No Data Available
        </Typography>
        <Typography variant="body1" align="center">
          Sorry, there is no data available at the moment.
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={isMobile ? "center" : "flex-end"}
        alignItems={isMobile ? "center" : "flex-end"}
        marginTop={"0.3rem"}
      >
        <Grid item>
          <Link to="/organisations" style={{ textDecoration: "none" }}>
            <div>
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
            </div>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default OrganisationSecondOption;
