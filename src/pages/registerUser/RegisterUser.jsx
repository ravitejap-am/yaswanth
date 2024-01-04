import React, { useState } from "react";
import "./registerUser.module2.css";
import { UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { Form } from "antd";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";

import GeneralForm from "../../components/common/forms/GeneralForm";

const RegisterUser = () => {
  const [signupMessage,setSignupMessage]=useState("")
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
    setSignupMessage("you succefully signUp")
    
  };
  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };
  // const validateConfirmPassword=()=>{

  // }
  const formElements = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      iconClass: <UserOutlined />,
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      iconClass: <MailOutlined />,
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
        { required: true, message: "Please input your password!" },
        { validator: validatePassword },
      ],
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      rules: [
        { required: true, message: "Please confirm your password!" },
        // { validator: validateConfirmPassword },
      ],
    },
  ];
  const submitButtonProperty = {
    name: "Sign Up",
    color: "white",
    backgroundColor: "#f64e60",
    type: "primary",
    width: "100px",
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
                  <h2>Get started with Us</h2>
                  <p>Register a new membership</p>
                </div>
                <div className="form-content">
                  <GeneralForm {...feedingVariable} />
                  <div className="alreadySignIn">
                    <p>
                      Already have an account?{" "}
                      <a href="" className="danger-text">
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {signupMessage?<NotifyMessage message={signupMessage}/>:null}
    </div>
  );
};

export default RegisterUser;
