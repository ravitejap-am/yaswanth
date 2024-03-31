import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../../store/authSlice";
import * as constants from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";
import { useNavigate } from "react-router-dom";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import PageLoader from "../../loader/loader";
import { useState } from "react";
import "./userform.css";
import { Form, Input, Button, Row, Col } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Typography, Box, Grid, useMediaQuery } from "@mui/material";

function ChangePassword({ setFileSysytem, validateEmail }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false ,
    newPassword: false ,
    confirmPassword: false
  });
  const isMobile = useMediaQuery('(max-width:600px)');

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


  const togglePasswordVisibility = (type) => {
    setShowPassword(type)
    // if (type === "password") {
    //   setShowPassword(!showPassword);
    // } else if (type === "confirmPassword") {
    //   setShowConfirmPassword(!showConfirmPassword);
    // }
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

  const handleChangePassword = async (values) => {
    console.log("change values", values);
    if (values !== undefined && values !== null) {
      if (verifyPassword(values)) {
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
                oldPassword: values.password,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
              }),
            }
          );
          console.log("$$$33333334444556789", response);
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
              errorMsg?.message
                ? errorMsg.message
                : "Failed to change password",
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
    }
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log("Canceling....");
    },
    isSubmit: true,
    submitHandler: (values) => {
      console.log("Submitting ChangePassword form....");
      handleChangePassword(values);
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
          height: "150%",
          flexDirection: "column",
          justifyContent: "space-between",
          width: {
            xs: 300 ,
            sm: 600 ,
            md: 900 ,
            lg: 1200 ,
            xl: 1500
          }
        }}
      >
        {isLoading && <PageLoader loadingStatus={isLoading} />}

        <Box style={{ height: "100%" }}>
          <Grid container spacing={2} >
            <Grid item >
              <Typography>
                {" "}
                <label htmlFor="password">Old Password:</label>
              </Typography>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Old Password!",
                  },
                ]}
                required={false}
              >
                <Input
                  className="inputstyle-css-changepassword"
                  placeholder="Old Password"
                  type={showPassword.oldPassword  ? "text" : "password"}
                  suffix={
                    <Button
                      type="text"
                      onClick={() => 
                        setShowPassword({...showPassword, oldPassword: !showPassword.oldPassword })
                      }
                      icon={
                        showPassword.oldPassword ? (
                          <EyeOutlined style={{ fontSize: "20px" }} />
                        ) : (
                          <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                        )
                      }
                    />
                  }
                />
              </Form.Item>
            </Grid>
            <Grid item >
              <Typography>
                {" "}
                <label
                  htmlFor="newPassword"
                  className="input-label-changepassword"
                >
                  New Password:
                </label>
              </Typography>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
                required={false}
              >
                <Input
                  className="inputstyle-css-changepassword"
                  style={{width: {md:'50%'}, backgroundColor: 'red'}}
                  placeholder="New Password"
                  type={showPassword.newPassword ? "text" : "password"}
                  suffix={
                    <Button
                      type="text"
                      onClick={() => 
                        setShowPassword({...showPassword, newPassword: !showPassword.newPassword })
                    }
                      icon={
                        showPassword.newPassword ? (
                          <EyeOutlined style={{ fontSize: "20px" }} />
                        ) : (
                          <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                        )
                      }
                    />
                  }
                />
              </Form.Item>
            </Grid>
            <Grid item >
              <Typography>
                <label htmlFor="password">Confirm Password:</label>{" "}
              </Typography>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm password",
                  },
                ]}
                required={false}
              >
                <Input
                  className="inputstyle-css-changepassword"
                  style={{width: {md:'80%'}}}
                  placeholder="Confirm Password"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  suffix={
                    <Button
                      type="text"
                      onClick={() =>
                        setShowPassword({...showPassword, confirmPassword: !showPassword.confirmPassword })
                      }
                      icon={
                        showPassword.confirmPassword ? (
                          <EyeOutlined style={{ fontSize: "20px" }} />
                        ) : (
                          <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                        )
                      }
                    />
                  }
                />
              </Form.Item>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: isMobile ? "center" : "flex-end",
            padding: "1rem"
          }}
        >
            <Button type="primary" htmlType="submit" className="buttonStyle">
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
