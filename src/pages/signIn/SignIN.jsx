import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { Form } from 'antd';
import GeneralForm from "../../components/common/forms/GeneralForm";
import axios from "axios";
import { toast } from "react-toastify";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import { setUser, selectUser } from "../../store/authSlice";
import * as constants from "../../constants/Constant";
import { useMessageState } from "../../hooks/useapp-message";
import { SetSessionToken } from "../../utils/SessionManager";
import { Form, Input, Select, Grid } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Logo from "../../asset/images/logo.png";
import { tokenDecodeJWT } from "../../utils/authUtils";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

import "./sign-in.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  validateEmail,
  validateePassword,
} from "../../components/super-admin/validation";
import Submit from "../../components/common/buttons/Submit";

const SignIn = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [validations, setValidations] = useState({
    email: { isValid: true, errorMsg: "" },
    password: { isValid: true, errorMsg: "" },
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(setUser(null));
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (showSuccessMessage && user?.userToken) {
      const jwtToken = user.userToken;
      const decodedToken = decodeJWT(jwtToken);
      if (decodedToken) {
        const role = decodedToken.role;
        console.log("Role:----->", role);
        localStorage.setItem("userRole", role);
        switch (role) {
          case "ORG_ADMIN":
            navigate("/dashboard");
            break;
          case "USER":
            navigate("/user");
            break;
          case "SUPER_ADMIN":
            navigate("/dashboard");
            break;
          default:
            navigate("/default");
        }
      } else {
        console.error("Invalid JWT token");
      }
    }
  }, [showSuccessMessage, user, navigate]);

  useEffect(() => {
    if (!buttonLoading && showSuccessMessage) {
      setShowSuccessMessage(false);
    }
  }, [buttonLoading, showSuccessMessage]);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => {
            return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };
  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const fetchUserProfile = async (userId, jwt) => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/getUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
      }

      const userData = await response.json();

      const profileImagePath = userData?.data?.user?.profileImagePath;
      if (profileImagePath) {
        localStorage.setItem(
          "userImageUrl",
          `https://medicalpublic.s3.amazonaws.com/${profileImagePath}`
        );
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const validateDetails = () => {
    let flag = false;
    const isValidEmail = validateEmail(values.email);
    const isValidPassword = validateePassword(values.password);
    console.log("isvalid password--->", isValidPassword);

    if (isValidEmail) {
      flag = true;
      console.log("inside invalid email", isValidEmail);
      setValidations((prev) => ({
        ...prev,
        email: {
          isValid: false,
          errorMsg: isValidEmail,
        },
      }));
    } else {
      setValidations((prev) => ({
        ...prev,
        email: {
          isValid: true,
          errorMsg: "",
        },
      }));
    }
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
    return flag;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValidForm = validateDetails();
    if (!isValidForm) {
      setIsSigningIn(true);
      setButtonLoading(true);
      const url = `${constants.BASE_API_URL}${constants.SIGNIN_ENDPOINT}`;
      try {
        const response = await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.code) {
          const jwtToken = response.data.data?.jwtToken;
          if (jwtToken) {
            SetSessionToken(jwtToken);
            const decodedToken = tokenDecodeJWT(jwtToken);
            const userId = decodedToken?.userId;
            fetchUserProfile(userId, jwtToken);
          }

          const fetchedUserData = { userToken: jwtToken };
          dispatch(setUser(fetchedUserData));
          console.log("JWT Token after dispatch:", response.data);
          console.log("JWT Token after dispatch:", jwtToken);
          setShowSuccessMessage(true);
          setButtonLoading(false);
          setIsReset(true);
          showNotifyMessage("success", response?.data?.message, messageHandler);
        } else {
          showNotifyMessage(
            "error",
            response?.data?.message || "An error occurred. Please try again.",
            messageHandler
          );
          setButtonLoading(false);
          setIsReset(false);
          hideNotifyMessage();
        }
      } catch (error) {
        console.error("Login failed:", error.response);
        setIsSigningIn(false);
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage(
          "error",
          error?.response?.data?.message,
          messageHandler
        );
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    scrollToTop();

    const handleScroll = () => {
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

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

  console.log("validations----->", validations);

  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <div className="signin-header">
        <SignHeader
          title={<img src={Logo} alt="" width={120} />}
          linkText={!isMobile && "Don't have an account?"}
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="signin-main-css">
        <Box className="text-top-signup" mb={3}>
          <Typography variant="h2" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body1" mt={4} gutterBottom color={"#1e293b"}>
            {" "}
            Please sign in with your organisation <br /> email id.{" "}
          </Typography>
        </Box>

        <div>
          <form
            className="signin-form-css"
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={!validations["email"].isValid}
              helperText={validations["email"].errorMsg}
              required
              fullWidth
              className="signin_input_css"
              placeholder="Email"
              sx={{ borderRadius: "50px", marginBottom: "16px" }}
            />
            <TextField
              label="Password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              error={!validations["password"].isValid}
              helperText={validations["password"].errorMsg}
              required
              fullWidth
              className="signin_input_css password_input"
              style={{ height: "auto" }}
              placeholder="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!values.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: "50px", marginBottom: "16px" }}
            ></TextField>
            <Submit
              backgroundColor={constants.BUTTON_COLOUR}
              buttonLoading={buttonLoading}
              btnText={"Sign In"}
            />

          </form>
        </div>
        <Typography className="linktextsignin" variant="body2" gutterBottom>
          New user?{" "}
          <Link
            to={"/registeruser"}
            style={{
              textDecoration: "underline",
              color: "black",
              marginLeft: "3px",
            }}
          >
            {" "}
            Sign up!
          </Link>
        </Typography>
        <Box className="linktextsignin" mt={2}>
          <Typography variant="body2" gutterBottom>
            Have you forgotten your password?
            <Link
              to={"/recoverypassword"}
              style={{
                textDecoration: "underline",
                color: "black",
                marginLeft: "3px",
              }}
            >
              {" "}
              Forgot Password!
            </Link>
          </Typography>
        </Box>
        <NotifyMessage />
        <br />
      </div>
      <div className="signin-footer">
        <Footer />
      </div>
    </div>
  );
};

export default SignIn;
