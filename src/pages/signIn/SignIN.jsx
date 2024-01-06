import React, { useState } from "react";
import { Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import GeneralForm from "../../components/common/forms/GeneralForm";

const SignIn = () => {
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
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
  const submitHandler = (values) => {
    console.log("submitting....");
    console.log(values);
  };
  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  const formElements = [
    {
      label: "User Name",
      type: "text",
      name: "name",
      iconClass: <UserOutlined />,
      rules: [
        { required: true, message: "Please input your User Name" },
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
                      <a href="" className="danger-text">
                        Sign Up
                      </a>
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
