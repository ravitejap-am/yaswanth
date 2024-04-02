import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../../store/authSlice";
import * as constants from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "antd";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import PageLoader from "../../loader/loader";
import { useState } from "react";
import "./userform.css";
import {
  Typography,
  Box,
  Grid,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ChangePassword({ setFileSysytem, validateEmail }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const isMobile = useMediaQuery("(max-width:600px)");

  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const passwordStyles = {
    position: "absolute",
    top: "73%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    left: "320px",
  };

  const confirmPasswordStyles = {
    position: "absolute",
    top: "60%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    left: "320px",
  };

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  const verifyPassword = (values) => {
    if (
      values?.newPassword?.length > 0 &&
      values?.confirmPassword?.length > 0 &&
      values?.newPassword !== values?.confirmPassword
    ) {
      showNotifyMessage(
        "error",
        "new password and confirm password should be same",
        messageHandler
      );
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (validateForm() && verifyPassword(formData)) {
      try {
        setButtonLoading(true);
        setIsLoading(true);
        const response = await fetch(
          `${constants.BASE_API_URL}/user/verification/reset`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              oldPassword: formData.password,
              newPassword: formData.newPassword,
              confirmPassword: formData.confirmPassword,
            }),
          }
        );
        console.log("Response:", response);
        if (response?.ok) {
          if (response.status === 200) {
            setButtonLoading(false);
            setIsLoading(false);
            setIsReset(true);
            showNotifyMessage(
              "success",
              "Password Changed Successfully",
              messageHandler
            );
          }
        } else {
          const errorMsg = await response.json();
          console.log("Error changing password:", errorMsg);
          showNotifyMessage(
            "error",
            errorMsg?.message ? errorMsg.message : "Failed to change password",
            messageHandler
          );
        }
        setIsLoading(false);
      } catch (error) {
        if (
          error?.response?.status == 500 ||
          error?.response?.status == "500"
        ) {
          navigate("/customerSupport");
        }

        setButtonLoading(false);
        setIsLoading(false);
        showNotifyMessage(
          "error",
          error?.response?.data?.message,
          messageHandler
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.password.trim()) {
      errors.password = "Old password is required";
      isValid = false;
    }
    if (!formData.newPassword.trim()) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log("Canceling....");
    },
    isSubmit: true,
    submitHandler: () => {
      console.log("Submitting ChangePassword form....");
      handleChangePassword(formData);
    },

    submitButtonProperty: {
      name: "Submit",
      color: "white",
      backgroundColor: "#6366F1",
      type: "primary",
      width: "150px",
      height: "50px",
      borderRadius: "35px",
      marginTop: "5px",
    },
    formElements: [
      {
        label: "Old Password",
        type: "password",
        name: "password",
        style: { width: "350px", marginTop: "40px", marginLeft: "0px" },
        iconStyle: passwordStyles,
        pattern: /^.+$/,
        emptyErrorMessage: "Please Enter the old passsword",
        containerStyles: { width: "375px" },
      },
      {
        label: "New Password",
        type: "password",
        name: "newPassword",
        style: { width: "350px", marginTop: "40px", marginLeft: "0px" },
        iconStyle: passwordStyles,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,20}$/,
        emptyErrorMessage: "Please Enter the new passsword",
        invalidErrorMessage:
          "Password should have atleast 8 characters, 1 uppercase, 1 lowercase ,1 digit and 1 special character",
        errorMsgStyles: { width: "375px" },
        containerStyles: { width: "375px" },
      },
      {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        style: { width: "350px", marginLeft: "0px" },
        iconStyle: confirmPasswordStyles,
        pattern: /^.+$/,
        emptyErrorMessage: "Please Enter the confirm passsword",
        containerStyles: { width: "375px" },
      },
    ],
    formType: "normal",
    setFileSysytem: setFileSysytem,
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  };

  const cancelHandler = () => {
    navigate("/dashboard");
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      autoComplete="off"
      style={{
        width: "auto",
        margin: "auto",
        height: "100%",
      }}
      onFinish={feedingVariable.submitHandler}
    >
      <Box
        sx={{
          display: "flex",
          height: "140%",
          flexDirection: "column",
          justifyContent: "space-between",
          // width: {
          //   xs: 300 ,
          //   sm: 600 ,
          //   md: 900 ,
          //   lg: 1200,
          //   xl: 1350
          // },
        }}
      >
        {isLoading && <PageLoader loadingStatus={isLoading} />}
        <Grid container spacing={2} style={{marginLeft: "0px"}}>
          <Grid item xs={12} md={6}  style={{paddingLeft: "0px"}}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Typography>
                <label
                  htmlFor="password"
                  className="input-label-changepassword"
                >
                  Old Password:
                </label>
              </Typography>
              <Box
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  id="password"
                  name="password"
                  type={showPassword.oldPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="inputstyle-css-changepassword"
                />
                <IconButton
                  className="EyeButton"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      oldPassword: !showPassword.oldPassword,
                    })
                  }
                >
                  {showPassword.oldPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </Box>
              {errors.password && (
                <span className="error-password">{errors.password}</span>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6} style={{paddingLeft: "0px"}}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Typography>
                <label
                  htmlFor="newPassword"
                  className="input-label-changepassword"
                >
                  New Password:
                </label>
              </Typography>
              <Box
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="inputstyle-css-changepassword"
                />
                <IconButton
                  className="EyeButton"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPassword: !showPassword.newPassword,
                    })
                  }
                >
                  {showPassword.newPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </Box>
              {errors.newPassword && (
                <span className="error-password">{errors.newPassword}</span>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} style={{paddingLeft: "0px"}}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Typography>
                <label
                  htmlFor="confirmPassword"
                  className="input-label-changepassword"
                >
                  Confirm Password:
                </label>
              </Typography>
              <Box
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="inputstyle-css-changepassword"
                />
                <IconButton
                  className="EyeButton"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  {showPassword.confirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </Box>
              {errors.confirmPassword && (
                <span className="error-password">{errors.confirmPassword}</span>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>

        <NotifyMessage />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: isMobile ? "center" : "flex-end",
            padding: "1rem",
          }}
        >
          <Button
            type="primary"
            onClick={cancelHandler}
            className="buttonStyle"
            style={{ marginRight: "0.5rem" }}
          >
            <Typography variant="button"> Cancel </Typography>
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="buttonStyle"
            style={{ marginLeft: "0.5rem" }}
          >
            <Typography variant="button" display="block">
              Submit
            </Typography>
          </Button>
        </Box>
      </Box>
    </Form>
  );
}

export default ChangePassword;
