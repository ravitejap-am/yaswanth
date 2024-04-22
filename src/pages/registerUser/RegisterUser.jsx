import React, { useEffect, useState } from "react";
import "./registerUser.module2.css";
import { useNavigate } from "react-router-dom";
import * as constants from "../../constants/Constant";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import Spinner from "../../components/common/spinner/Spinner";
import axios from "axios";
import GeneralForm from "../../components/common/forms/GeneralForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import { setUser, selectUser } from "../../store/authSlice";
import { useMessageState } from "../../hooks/useapp-message";
import Header from "../home/Header/Header";
import { Form, Input, Select, Grid } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import Logo from "../../asset/images/logo.png";
import {
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  validateePassword,
  validatFirstName,
  validatLastName,
  validConfirmPassword,
} from "../../../src/components/super-admin/validation";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import Submit from "../../components/common/buttons/Submit";

const RegisterUser = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const [signupMessage, setSignupMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    firstName: { isValid: true, errorMsg: "" },
    lastName: { isValid: true, errorMsg: "" },
    email: { isValid: true, errorMsg: "" },
    password: { isValid: true, errorMsg: "" },
    confirmPassword: { isValid: true, errorMsg: "" },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (signupMessage) {
      showNotifyMessage("success", signupMessage, messageHandler);
    }
  }, [signupMessage]);

  const validateDetails = () => {
    let flag = false;
    const isValidfirstName = validatFirstName(values.firstName);
    const isValidlastName = validatLastName(values.lastName);
    const isValidEmail = validateEmail(values.email);
    const isValidPassword = validateePassword(values.password);
    const isValidConfirmPassword = validConfirmPassword(
      values.confirmPassword,
      values.password
    );

    if (isValidfirstName) {
      flag = true;
      console.log("inside invalid name", isValidfirstName);
      setValidations((prev) => ({
        ...prev,
        firstName: {
          isValid: false,
          errorMsg: isValidfirstName,
        },
      }));
    } else {
      setValidations((prev) => ({
        ...prev,
        firstName: {
          isValid: true,
          errorMsg: "",
        },
      }));
    }

    if (isValidlastName) {
      flag = true;
      console.log("inside invalid name", isValidlastName);
      setValidations((prev) => ({
        ...prev,
        lastName: {
          isValid: false,
          errorMsg: isValidlastName,
        },
      }));
    } else {
      setValidations((prev) => ({
        ...prev,
        lastName: {
          isValid: true,
          errorMsg: "",
        },
      }));
    }

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
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValidForm = validateDetails();
    console.log("isValidForm--->", isValidForm);

    if (!isValidForm) {
      setButtonLoading(true);
      const apiUrl = `${constants.BASE_API_URL}${constants.SIGNUP_ENDPOINT}`;
      const data = {
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        email: values.email || "",
        password: values.password || "",
        confirmPassword: values.confirmPassword || "",
      };
      try {
        setLoader(true);
        const response = await axios.post(apiUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data.code) {
          setButtonLoading(false);
          setIsReset(true);
          showNotifyMessage("success", response?.data?.message, messageHandler);
        } else if (response.data.code === "SIGNUP-ARR-004") {
          setSignupMessage(response.data.message);
        } else {
          setButtonLoading(false);
          setIsReset(false);
          hideNotifyMessage();
        }
      } catch (error) {
        setButtonLoading(false);
        showNotifyMessage(
          "error",
          error?.response?.data?.message,
          messageHandler
        );
        console.error("Registration failed:", error.response?.data);
      } finally {
        setLoader(false);
      }
    }
  };

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

  const handleRegister = async () => {
    navigate("/", {
      state: {
        fromRegisterPage: true,
        tabName: "Contact_Up",
        showDefaultTab: false,
      },
    });
  };

  const buttonProps = {
    name: "Sign In",
    type: "primary",
    color: "white",
    backgroundColor: "#6366F1",
    width: "120px",
    padding: "10px 16px",
    height: "40px",
    borderRadius: "30px",
    icons: "",
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

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <div className="Signup-header">
        <SignHeader
          title={<img src={Logo} alt="" width={120} />}
          linkText={!isMobile && "Have an account?"}
          linkTo="/signin"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="signup-main-css">
        <Box className="text-top-signup" mb={1}>
          <Typography variant="h2" gutterBottom>
            Sign Up
          </Typography>
          {isMobile ? (
            <Typography variant="body1" mt={4} gutterBottom color={"#1e293b"}>
              {" "}
              Please sign up with your organisation email ID. If your
              organisation is not registered with us, please reach out to us at
              <a
                href="mailto:sales@areteminds.com"
                target="_blank"
                className="sign-up-mail"
                style={{ color: "#1e293b", textDecoration: "underline" }}
              >
                "sales@areteminds.com"
              </a>
              or fill up{" "}
              <a
                onClick={() => handleRegister()}
                className="contactus-text"
                style={{
                  color: "#1e293b",
                  textDecoration: "underline",
                  paddingRight: "5px",
                }}
              >
                contact us{" "}
              </a>
              form
            </Typography>
          ) : (
            <Typography variant="body1" mt={4} gutterBottom color={"#1e293b"}>
              {" "}
              Please sign up with your organisation email ID. If your <br />
              organisation is not registered with us, please reach out <br /> to
              us at
              <a
                href="mailto:sales@areteminds.com"
                target="_blank"
                className="sign-up-mail"
                style={{
                  color: "#1e293b",
                  textDecoration: "underline",
                  paddingRight: "5px",
                }}
              >
                "sales@areteminds.com"
              </a>
              or fill up{" "}
              <a
                onClick={() => handleRegister()}
                className="contactus-text"
                style={{ color: "#1e293b", textDecoration: "underline" }}
              >
                Contact Us
              </a>{" "}
              form
            </Typography>
          )}
        </Box>
        <div>
          <form className="signup-form-css" onSubmit={submitHandler}>
            <TextField
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              className="signin_input_css"
              error={!validations["firstName"].isValid}
              helperText={validations["firstName"].errorMsg}
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              className="signin_input_css"
              error={!validations["lastName"].isValid}
              helperText={validations["lastName"].errorMsg}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              className="signin_input_css"
              error={!validations["email"].isValid}
              helperText={validations["email"].errorMsg}
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              className="signin_input_css password_input"
              error={!validations["password"].isValid}
              helperText={validations["password"].errorMsg}
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
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!validations["confirmPassword"].isValid}
              helperText={validations["confirmPassword"].errorMsg}
              className="signin_input_css password_input"
              sstyle={{ height: "200px" }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Submit
              backgroundColor={constants.BUTTON_COLOUR}
              buttonLoading={buttonLoading}
              btnText={"Sign Up"}
            />
          </form>

          <Typography className="linktextsigup" variant="body2" gutterBottom>
            Already have an account?{" "}
            <Link
              to={"/signin"}
              style={{
                textDecoration: "underline",
                color: "black",
                marginLeft: "3px",
              }}
            >
              Sign in
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
          <br />
        </div>
      </div>
      <NotifyMessage
        message={signupMessage ? signupMessage : null}
        errorHandle={false}
      />
      <div className="signup-footer">
        <Footer />
      </div>
    </div>
  );
};

export default RegisterUser;
