import React, { useState } from "react";
import "./recoverpassword.module1.css";
import { Form } from "antd";
import GeneralForm from "../../components/common/forms/GeneralForm";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import axios from "axios";
import * as constants from "../../constants/Constant";
import { useMessageState } from "../../hooks/useapp-message";
import Footer from "../../pages/home/Footer/Footer";
import { toast } from "react-toastify";
import SignHeader from "../home/SignHeader/SignHeader";
import { useNavigate } from "react-router-dom";

const RecoveryPasswor = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
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

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const submitHandler = async (values) => {
    // Check if values object and email property are defined
    if (!values || !values.email) {
      console.error("Email is missing in form values");
      return;
    }

    const url = `${constants.BASE_API_URL}${constants.MAIL_RECOVERY_PASSWORD_ENDPOINT}`;
    const data = {
      email: values.email,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage("success", response?.data?.message, messageHandler);
    } catch (error) {
      if (
        error?.response?.status === 500 ||
        error?.response?.status === "500"
      ) {
        navigate("/internal500");
      }

      setButtonLoading(false);
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
                  {/* <div className="text-top">
                    <h2>Forgot Password</h2>
                    <p>Please use your organization email id.</p>
                  </div> */}
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
