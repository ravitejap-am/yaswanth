import React, { useState } from "react";
import "./recoverpassword.module1.css";
import { Form } from "antd";
import UserOutlined from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import GeneralForm from "../../components/common/forms/GeneralForm";

import GeneralButton from "../../components/common/buttons/GeneralButton";

const RecoveryPasswor = () => {
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
  // const validateConfirmPassword=()=>{

  // }
  const formElements = [
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
  ];
  const submitButtonProperty = {
    name: "Reset",
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
                  <h2>Recover Password</h2>
                </div>
                <div className="form-content">
                  <GeneralForm {...feedingVariable} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPasswor;
