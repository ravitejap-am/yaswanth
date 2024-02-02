import React, { useEffect, useState } from "react";
import "./registerUser.module2.css";
import * as constants from "../../constants/Constant";
import { Form, message } from "antd";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import Spinner from "../../components/common/spinner/Spinner";
import axios from "axios";
import GeneralForm from "../../components/common/forms/GeneralForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../pages/home/Footer/Footer";
import Header from "../home/Header/Header";
import SignHeader from "../home/SignHeader/SignHeader";

const RegisterUser = () => {
  const [signupMessage, setSignupMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);

  useEffect(() => {
    if (signupMessage) {
      toast.success(signupMessage);
    }
  }, [signupMessage]);

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
    const apiUrl = `${constants.BASE_API_URL}${constants.SIGNUP_ENDPOINT}`;
    const data = {
      firstName: values.name,
      lastName: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      setLoader(true);
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Registration successful:", response.data);
      setSignupMessage(
        "Congratulations!! You are successfully signed up with your organization email id."
      );
    } catch (error) {
      console.error("Registration failed:", error.response?.data);

      if (error.response && error.response.status === 400) {
        setSignupMessage(
          "Please sign up with your organization email id. If your organization is not registered with us, please reach out to sales@areteminds.com"
        );
      } else {
        setSignupMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoader(false);
    }
  };

  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  const formElements = [
    {
      label: "First Name",
      type: "text",
      name: "name",
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
    },
    {
      label: "Last Name",
      type: "text",
      name: "name",
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
    },
    {
      label: "Email",
      type: "email",
      name: "email",
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
        { required: true, message: "Please input valid password!" },
        { validator: validatePassword },
      ],
    },
    {
      label: " Confirm Password",
      type: "password",
      name: "confirmPassword",
      rules: [{ required: true, message: "Please confirm your password!" }],
    },
  ];

  const submitButtonProperty = {
    name: "Sign Up",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "467px",
    height: "50px",
    borderRadius: "35px",
    marginTop: ".7em",
    fontSize: "0.9rem"
  };

  const buttonProps = {
    name: 'Sign In',
    type: 'primary',
    color: 'white',
    backgroundColor: '#6366F1',
    width: '120px',
    padding: '10px 16px',
    height: '40px',
    borderRadius: '30px',
    icons: '',
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
  };

  return (
    <>
      <div>
        <div className="Signup-header">
          <SignHeader
            title='AM-Chat'
            linkText="Have an account?"
            linkTo='/signin'
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
                      <h2>Sign Up</h2>
                      <p>
                        Please sign up with your organization email id. If your{" "}
                        <br />
                        organization is not registered with us, please reach out
                        to <br />
                        sales@areteminds.com
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="form-content">
                      <GeneralForm {...feedingVariable} />
                      {/* <div className="alreadySignIn">
                        <p>
                          Already have an account?{" "}
                          <Link to={"/signin"} className="danger-text">
                            Sign In
                          </Link>
                          <a href=""></a>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loader ? <Spinner /> : null}
          <NotifyMessage message={signupMessage ? signupMessage : null} errorHandle={false} />
        </div>
        <div className="signup-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
