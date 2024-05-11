import React from "react";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import CancelButton from "../../../../components/common/buttons/CancelButton";

function UserInfoMain({
  formData,
  handleChange,
  handleSubmit,
  isEdit,
  isView,
  cancelHandler,
  buttonLoading,
  isDirty,
  errors,
  permittedScopes,
  scopes,
  firstName,
  lastName,
  email,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      style={{
        height: "auto",
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
        <Grid container spacing={1}>
          {[
            { id: "firstName", label: "First Name", value: firstName },
            { id: "lastName", label: "Last Name", value: lastName },
            {
              id: "email",
              label: "Email",
              value: email,
              disabled: isEdit || isView,
            },
          ].map(({ id, label, value, disabled }) => (
            <Grid item xs={12} md={6} lg={6} className="form-group" key={id}>
              <Typography>
                <label htmlFor={id}>{label}:</label>
              </Typography>
              <input
                className="inputstyle"
                type={id === "email" ? "email" : "text"}
                id={id}
                name={id}
                placeholder={label}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                style={{
                  backgroundColor: isView ? "#CBD5E1" : "rgb(203, 213, 225)",
                  pointerEvents: disabled ? "none" : "auto",
                }}
              />
              {errors[id] && <span className="error">{errors[id]}</span>}
            </Grid>
          ))}
        </Grid>
        <Box
          className="button-container"
          sx={{
            marginTop: isMobile ? "165px" : "226px",
            paddingRight: isMobile ? "" : "35px",
            marginBottom: isMobile ? "3rem" : "3em",
          }}
        >
          {!isView && (
            <CancelButton
              onClick={() => {}}
              style={{}}
              text="Cancel"
              onMouseOver={(e) => {
                e.target.style.borderColor = "#5f94f5";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "rgb(218, 218, 218)";
              }}
            />
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
                " "
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
