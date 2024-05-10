import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

function UserInfoMain({
  formData,
  handleChange,
  handleSubmit,
  isEdit,
  isView,
  isMobile,
  isAndroid,
  cancelHandler,
  buttonLoading,
  isDirty,
  errors,
  permittedScopes,
  scopes,
}) {
  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      style={{
        height: "84%",
        marginTop: isMobile ? "2em" : "0px",
        marginLeft: isMobile ? "5px" : "0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6} className="form-group">
              <Typography>
                <label htmlFor="firstName">First Name:</label>
              </Typography>
              <input
                className="inputstyle"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isView}
                style={{ backgroundColor: isView ? "#CBD5E1" : "" }}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="form-group">
              <Typography>
                <label htmlFor="lastName">Last Name:</label>
              </Typography>
              <input
                className="inputstyle"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isView}
                style={{ backgroundColor: isView ? "#CBD5E1" : "" }}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="form-group">
              <Typography>
                <label htmlFor="email">Email:</label>
              </Typography>
              <input
                className="inputstyle"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isEdit || isView}
                style={{ backgroundColor: isEdit || isView ? "#CBD5E1" : "" }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </Grid>
          </Grid>
        </Box>
        <Box
          className="button-container"
          sx={{
            marginBottom: {
              xs: isAndroid ? "1em" : "3em",
            },
          }}
        >
          {!isView && (
            <Button
              type="secondary"
              className="buttonStyle"
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              }}
              onClick={cancelHandler}
            >
              <Typography variant="button">Cancel</Typography>
            </Button>
          )}
          {permittedScopes?.includes(scopes.UU) && !isView && (
            <Button
              type="primary"
              htmlType="submit"
              className="buttonStyle"
              loading={buttonLoading}
              disabled={isDirty}
            >
              {buttonLoading ? (
                "    "
              ) : (
                <Typography variant="button">
                  {isEdit ? "Update" : "Submit"}
                </Typography>
              )}
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default UserInfoMain;
