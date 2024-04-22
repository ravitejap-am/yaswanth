import { LoadingButton } from "@mui/lab";
import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import "./buttons.css";

const Submit = ({ backgroundColor, buttonLoading, btnText, submitHandler = () => {} }) => {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      color="primary"
      className="submit_btn_css"
      style={{
        marginBottom: "16px",
        backgroundColor: backgroundColor,
        color: "white",
      }}
      loading={buttonLoading}
      loadingIndicator={<CircularProgress sx={{ color: "white" }} size={16} />}
      onClick={() => submitHandler()}
    >
      {!buttonLoading && (
        <Typography variant="button" display="block">
          {btnText}
        </Typography>
      )}
    </LoadingButton>
  );
};

export default Submit;
