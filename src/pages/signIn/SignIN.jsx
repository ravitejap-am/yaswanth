import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import GeneralForm from "../../components/common/forms/GeneralForm";
import { sendLoginDetails } from "../../config/api";
import axios from "axios";

const SignIn = () => {
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  console.log(form);
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
    console.log("submitting....");
    console.log(values);
    const url = "http://localhost:8081/users/login";

    try {
      const response = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response as needed
      console.log("Registration successful:", response);
    } catch (error) {
      // Handle errors
      // console.error("Registration failed:", error.response.data);
      console.log(error);
    }
    // sendLoginDetails(values);
  };
  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  const formElements = [
    {
      label: "Enter Email",
      type: "email",
      name: "email",
      iconClass: <MailOutlined />,
      rules: [
        { required: true, message: "Please input your email" },
        { type: "name", message: "Invalid user Name" },
      ],
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
    backgroundColor: "#f64e60",
    type: "primary",
    width: "400px",
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
    formType: "signin",
  };
  return (
    <div className="main">
      <div className="container">
        {" "}
        <div className="row">
          <div className="col">
            <div className="row mainContent">
              <div className="box-round">
                <div className="text-top">
                  <h2>Let's Get Started</h2>
                  <p>Sign in to continue to AM-Chat.</p>
                </div>
                <div className="form-content">
                  <GeneralForm {...feedingVariable} />

                  <div className="alreadySignIn">
                    <p>
                      Do have an account ?{" "}
                      <Link className="danger-text" to={"/registerUser"}>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
