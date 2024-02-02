import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import GeneralForm from "../../components/common/forms/GeneralForm";
import axios from "axios";
import { toast } from "react-toastify";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import { setToken } from "../../store/actions";
import * as constants from "../../constants/Constant";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        navigate("/dashboardadmin");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, navigate]);

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
    const url = `${constants.BASE_API_URL}${constants.SIGNIN_ENDPOINT}`;

    try {
      const response = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login successful:", response);
      toast.success("User login successfully!!");

      dispatch(setToken(response.data.data.jwtToken));
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Login failed:", error.response);
      if (error.response && error.response.status === 404) {
        toast.error("Your email ID is not registered. Please Sign Up.");
      } else if (error.response && error.response.status === 400) {
        toast.error(
          "User not verified. Please complete the verification or registration process."
        );
      } else if (error.response && error.response.status === 423) {
        toast.error(
          "Your Account is locked due to invalid attempts.Please reset your password Using the forgetPassword."
        );
      } else if (error.response && error.response.status === 403) {
        toast.error(
          "Your organization email domain is not registered with us. Please reach out to sales@areteminds.com"
        );
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else if (error.response && error.response.status === 403) {
        toast.error(
          "Looks like your account has been closed. Please check with your organizational admin."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
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
                    <p>Please sign in with your organization email id</p>
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
