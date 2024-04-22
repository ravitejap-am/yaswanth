import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as constants from "../../constants/Constant";
import { useMessageState } from "../../hooks/useapp-message";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../asset/images/logo.png";

import "./ResetPassword.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  validateePassword,
  validConfirmPassword,
} from "../../components/super-admin/validation";
import { setUser } from "../../store/authSlice";
import Submit from "../../components/common/buttons/Submit";
const ResetPassword = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const jwtToken = false;
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    password: { isValid: true, errorMsg: "" },
    confirmPassword: { isValid: true, errorMsg: "" },
  });

  useEffect(() => {
    console.log("JWT Token from Redux Store:", jwtToken);
    if (jwtToken) {
      console.log("JWT token is stored in the Redux store.");
    } else {
      console.log("JWT token is not stored in the Redux store.");
    }
  }, [jwtToken]);

  useEffect(() => {
    dispatch(setUser(null));
    localStorage.clear();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const buttonProps = {
    name: "Sign Up",
    type: "primary",
    color: "white",
    backgroundColor: "#6366F1",
    width: "120px",
    padding: "10px 16px",
    height: "40px",
    borderRadius: "30px",
    icons: "",
  };

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateDetails = () => {
    try {
      let flag = false;
      const isValidPassword = validateePassword(values.password);
      const isValidConfirmPassword = validConfirmPassword(
        values.confirmPassword,
        values.password
      );

      if (isValidPassword) {
        flag = true;
        setValidations((prev) => ({
          ...prev,
          password: {
            isValid: false,
            errorMsg: isValidPassword,
          },
        }));
      } else {
        setValidations((prev) => ({
          ...prev,
          password: {
            isValid: true,
            errorMsg: "",
          },
        }));
      }

      if (isValidConfirmPassword) {
        flag = true;
        console.log("inside invalid confirm password", isValidConfirmPassword);
        setValidations((prev) => ({
          ...prev,
          confirmPassword: {
            isValid: false,
            errorMsg: isValidConfirmPassword,
          },
        }));
      } else {
        setValidations((prev) => ({
          ...prev,
          confirmPassword: {
            isValid: true,
            errorMsg: "",
          },
        }));
      }
      return flag;
    } catch (error) {
      console.log("error in validating details--->", error);
    }
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const isValidForm = validateDetails();
      if (!isValidForm) {
        setButtonLoading(true);
        const response = await axios.put(
          `${constants.BASE_API_URL}/user/verification/forget/${id}`,
          {
            newPassword: values.password,
            confirmPassword: values.confirmPassword,
          }
        );
        console.log("succes", response);
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage("success", response?.data?.message, messageHandler);
        navigate("/signin");
      }
    } catch (error) {
      console.log("error---->", error);
      setButtonLoading(false);
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        navigate("/customerSupport");
      }

      showNotifyMessage(
        "error",
        error?.response?.data?.message,
        messageHandler
      );
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <div className="resetpassword-header">
        <SignHeader
          title={<img src={Logo} alt="" width={120} />}
          linkText={!isMobile && "Don't have an account?"}
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="resetpassword-main-css">
        <Box className="text-top-signup" mb={3}>
          <Typography variant="h2" gutterBottom>
            Set Password
          </Typography>
          <Typography variant="body1" mt={4} gutterBottom color={"#1e293b"}>
            {" "}
            Please use a new password.
          </Typography>
        </Box>
        <div>
          <form className="resetpasswordform" onSubmit={submitHandler}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              error={!validations["password"].isValid}
              helperText={validations["password"].errorMsg}
              className="signin_input_css custom-textfield"
              style={{
                marginBottom: "16px",
              }}
              placeholder="Password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => togglePasswordVisibility("password")}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              error={!validations["confirmPassword"].isValid}
              helperText={validations["confirmPassword"].errorMsg}
              className="signin_input_css custom-textfield"
              style={{ marginBottom: "16px" }}
              placeholder="Confirm Password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <Submit
              backgroundColor={constants.BUTTON_COLOUR}
              buttonLoading={buttonLoading}
              btnText={"Submit"}
            />
          </form>
        </div>
      </div>
      <div className="signin-footer">
        <Footer />
      </div>
    </div>
  );
};

export default ResetPassword;
