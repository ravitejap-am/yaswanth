import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "antd";
import GeneralForm from "../../components/common/forms/GeneralForm";
import axios from "axios";
import { toast } from 'react-toastify';
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage';

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };

  const submitHandler = async (values) => {
    const url = "https://jsonplaceholder.typicode.com/users"; //dummy Api

    try {
      const response = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login successful:", response);
      toast.error("Your email ID is not registered. Please Sign Up.");
    } catch (error) {
      console.error("Login failed:", error.response);

      if (error.response && error.response.status === 404) {
        toast.error("Your email ID is not registered. Please Sign Up.");
      } else if (error.response && error.response.status === 400) {
        toast.error("Invalid email or password");
      } else if (error.response && error.response.status === 403) {
        toast.error("Your organization email domain is not registered with us. Please reach out to sales@areteminds.com");
      } else if (error.response && error.response.status === 403) {
        toast.error("Looks like your account has been closed. Please check with your organizational admin.");
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
      style:{}
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
    name: "Login",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "436px",
    height: "50px",
    borderRadius: "30px",
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
      <NotifyMessage/>
    </div>
  );
};

export default SignIn;
