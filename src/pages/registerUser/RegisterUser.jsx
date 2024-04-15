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
import { Form, Input, Select, Grid, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import Logo from "../../asset/images/logo.png"
import { validatePassword, validateConfirmPassword } from "../../../src/components/super-admin/validation"

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
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const passwordIconStyles = {
    position: "absolute",
    right: "10px",
    top: "54%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  useEffect(() => {
    if (signupMessage) {
      // toast.success(signupMessage);
      showNotifyMessage("success", signupMessage, messageHandler);
    }
  }, [signupMessage]);

  // const validatePassword = (_, value) => {
  //   if (value && value.length < 8) {
  //     return Promise.reject("Password must be at least 8 characters");
  //   } else {
  //     return Promise.resolve();
  //   }
  // };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };
  const submitHandler = async (values) => {
    if (!values || !values.firstName) {
      console.error("First Name is missing in form values");
      return;
    }

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
      showNotifyMessage(
        "error",
        error?.response?.data?.message,
        messageHandler
      );
      console.error("Registration failed:", error.response?.data);
    } finally {
      setLoader(false);
    }
  };

  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegister = async () => {
    navigate("/", { state: { fromRegisterPage: true, tabName: "Contact_Up", showDefaultTab: false } });
  };
  const formElements = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      rules: [
        { required: true, message: "Please input your Enter your email" },
        { type: "name", message: "Invalid Email" },
      ],
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      rules: [
        { required: true, message: "Please input valid password!" },
        { validator: validatePassword },
      ],
      iconStyle: passwordIconStyles,
    },
    {
      label: " Confirm Password",
      type: "password",
      name: "confirmPassword",
      rules: [{ required: true, message: "Please confirm your password!" }],
      iconStyle: passwordIconStyles,
    },
  ];

  const submitButtonProperty = {
    name: "Sign Up",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "467px",
    height: "50px",
    borderRadius: "35px",
    marginTop: ".7em",
    fontSize: "0.9rem",
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

  const feedingVariable = {
    isCancel: false,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: "normal",
    forgorPasswordHandler: () => {
      console.log("forgot Password....");
    },
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
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


  return (
      <div style={{overflowY:'auto', height:'100vh'}}>
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
                organisation is not registered with us, please reach out to us
                at
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
                organisation is not registered with us, please reach out <br />{" "}
                to us at
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
          <div className="signup-form-css">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              layout="vertical"
              autoComplete="off"
              onFinish={submitHandler}
              form={form}
              // className="signup_input_css"
              // style={{backgroundColor:'cyan', width:'35%'}}
            >
              <Form.Item
                name="firstName"
                place
                rules={[
                  {
                    required: true,
                    message: "Please enter your firstName!",
                  },
                ]}
                required={false}
              >
                <Input className="signup_input_css" placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                place
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name!",
                  },
                ]}
                required={false}
              >
                <Input className="signup_input_css" placeholder="last Name" />
              </Form.Item>
              <Form.Item
                name="email"
                place
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    type: "email",
                    message: "Invalid email format",
                  },
                ]}
                required={false}
              >
                <Input className="signup_input_css" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    validator: validatePassword,
                  },
                ]}
                required={false}
                className="field-container"
              >
                <Input.Password
                  className="signup_input_css"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined style={{ fontSize: "25px" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ fontSize: "25px" }} />
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    validator: (_, value) => validateConfirmPassword(value, form.getFieldValue('password')),
                  }
                ]}
                required={false}
                className="field-container"
              >
                <Input.Password
                  className="signup_input_css"
                  placeholder="Confirm Password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined style={{ fontSize: "25px" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ fontSize: "25px" }} />
                    )
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signin_submit_btn_css"
                >
                  <Typography variant="button" display="block">
                    Sign Up
                  </Typography>
                </Button>
              </Form.Item>

              <Typography
                className="linktextsigup"
                variant="body2"
                gutterBottom
              >
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
            </Form>
          </div>
        </div>
        {loader ? <Spinner /> : null}
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
