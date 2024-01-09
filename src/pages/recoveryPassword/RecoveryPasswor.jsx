import React, { useState } from "react";
import "./recoverpassword.module1.css";
import { Form } from "antd";
import UserOutlined from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import GeneralForm from "../../components/common/forms/GeneralForm";
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage'
import axios from 'axios'
import { recoverPassword } from "../../config/api";
// import {}

import GeneralButton from "../../components/common/buttons/GeneralButton";

const RecoveryPasswor = () => {
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [message,setMessage] = useState("")

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
  const submitHandler = async(values) => {
    console.log("submitting....");
    console.log(values);
    // const data = recoverPassword(values);
    const url = "http://localhost:8081/users/forgetPassword";
    const data = values;

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
        },
      });

      // Handle the response as needed
      console.log("Mail send to your email:", response.data.message);
      setMessage(response.data.message);
      // useEffect(() => {
        
      // });
    } catch (error) {
      // Handle errors
      console.error("Enter a valid email:", error.response.data.message);
      setMessage(error.response.data.message);
    }
    
    console.log(data);
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
      {message ? (
        <NotifyMessage message={message ? message : null} />
      ) : null}
    </div>
  );
};

export default RecoveryPasswor;
