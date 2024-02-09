import React, { useState } from "react";
import "./recoverpassword.module1.css";
import { Form } from "antd";
import GeneralForm from "../../components/common/forms/GeneralForm";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import axios from "axios";
import Footer from "../../pages/home/Footer/Footer";
import { toast } from "react-toastify";
import SignHeader from "../home/SignHeader/SignHeader";
import * as constants from "../../constants/Constant";

const RecoveryPasswor = () => {
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [message, setMessage] = useState("");

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };
  const validateEmail = (_, value) => {
    console.log(value);
    let isValid = value;
    console.log(value);
    console.log(isValid);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(isValid));
    console.log(!!isValid);
    if (isValid && emailRegex.test(isValid)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };

  const submitHandler = async (values) => {
    const url = `${constants.BASE_API_URL}${constants.RECOVERY_PASSWORD_ENDPOINT}`;
    const data = {
      email: values.email,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data) {
        console.log("Verification success:", response.data.message);
        // setMessage(response.data.message);
        toast.success(response.data.message);
      } else if (response.data.code === "FORGETPASSEMAIL-S-001") {
        // setMessage(response.data.message);
        toast.success(
          "An email has been sent to the given email id with a reset password link."
        );
      } else if (response.data.code === "FORGETPASSEMAIL-NF-002") {
        // setMessage(response.data.message);
        toast.error("User Not Found.");
      } else if (response.data.code === "FORGETPASSEMAIL-ER-003") {
        // setMessage(response.data.message);
        toast.error("Email is required.");
      } else {
        console.error("Invalid verification response:", response);
        toast.error("Email verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Recovery error:", error);

      if (error.response && error.response.status === 400) {
        setMessage(
          "User not verified. Please complete the verification or registration process."
        );
        toast.error(
          "User not verified. Please complete the verification or registration process."
        );
      } else {
        console.error(
          "Invalid verification response:",
          error.response?.data?.message
        );
        toast.error("Email verification failed. Please try again.");
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
      // iconClass: <MailOutlined />,
      rules: [
        { required: true, message: "Please input your Enter your email" },
        { type: "name", message: "Invalid Email" },
      ],
    },
  ];

  const submitButtonProperty = {
    name: "Submit",
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
    // cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
    formType: "normal",
    forgorPasswordHandler: () => {
      console.log("forgot Password....");
    },
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
  };

  return (
    <>
      <div className="recoverpassword-header">
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
          {" "}
          <div className="row">
            <div className="col">
              <div className="row mainContent">
                <div className="box-round">
                  <div className="text-top">
                    <h2>Forgot Password</h2>
                    <p>Please use your organization email id.</p>
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

export default RecoveryPasswor;
