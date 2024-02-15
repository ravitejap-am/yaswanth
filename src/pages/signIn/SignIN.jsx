import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import GeneralForm from "../../components/common/forms/GeneralForm";
import axios from "axios";
import { toast } from "react-toastify";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import { setUser, selectUser } from "../../store/authSlice";
import * as constants from "../../constants/Constant";
import { useMessageState } from "../../hooks/useapp-message";

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

  useEffect(() => {
    if (showSuccessMessage && user?.userToken) {
      const jwtToken = user.userToken;
      const decodedToken = decodeJWT(jwtToken);
      if (decodedToken) {
        const role = decodedToken.role;
        switch (role) {
          case "ORG_ADMIN":
            navigate("/orgadminchat");
            break;
          case "USER":
            navigate("/userchat");
            break;
          case "SUPER_ADMIN":
            navigate("/dashboardadmin");
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

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };

  const submitHandler = async (values) => {
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
        const fetchedUserData = { userToken: jwtToken };
        dispatch(setUser(fetchedUserData));
        console.log("JWT Token after dispatch:", jwtToken);
        setShowSuccessMessage(true);
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage("success", response?.data?.message, messageHandler);
      } else {
        toast.error(
          response.data.message || "An error occurred. Please try again."
        );
        setButtonLoading(false);
        setIsReset(false);
        hideNotifyMessage();
      }
    } catch (error) {
      console.error("Login failed:", error.response);

      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage(
        "error",
        error?.response?.data?.message,
        messageHandler
      );
    }
  };

  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  const formElements = [
    {
      label: "Email",
      type: "email",
      name: "email",
      rules: [
        { required: true, message: "Please input your email" },
        { type: "email", message: "Invalid email format" },
      ],
      style: {},
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      rules: [
        { required: true, message: "Please input your password!" },
        { validator: validatePassword },
      ],
    },
  ];

  const submitButtonProperty = {
    name: "Sign In",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "467px",
    height: "50px",
    borderRadius: "35px",
    marginTop: ".6em",
    fontSize: "0.7rem",
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
    formType: "signin",
  };

  return (
    <>
      <div className="signin-header">
        <SignHeader
          title="AM-Chat"
          linkText="Don't have an account?"
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row mainContent">
                <div className="box-round">
                  <div className="text-top">
                    <h2>Sign In</h2>
                    <p>Please sign in with your organization email id.</p>
                  </div>

                  <div className="form-content">
                    <GeneralForm {...feedingVariable} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotifyMessage />
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
