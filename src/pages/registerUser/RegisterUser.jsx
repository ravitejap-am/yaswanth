import React from "react";
import "./registerUser.module2.css";
import { UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import GeneralForm from "../../components/common/forms/GeneralForm";

const RegisterUser = () => {
  const handleSignUp = (formData) => {
    console.log("Signing up with:", formData);
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };
  const validateConfirmPassword = (_, value, { getFieldValue }, values) => {
    console.log(values);
    if (value && value !== getFieldValue("password")) {
      return Promise.reject("Passwords do not match");
    } else {
      return Promise.resolve();
    }
  };
  const formElements = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      iconClass:<UserOutlined/>,
      rules: [
        { required: true, message: "Please input your Full Name" },
        { type: "name", message: "Invalid user Name" },
      ],
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      iconClass:<MailOutlined/>,
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
    // {
    //   label: "Remember me",
    //   type: "checkbox",
    //   name: "checkbox",
    //   rules: [
    //     { required: true, message: "Please check" },
    //     // { validator: validatePassword },
    //   ],
    // },
  ];
  const submitButtonProperty = {
    name: "Sign Up",
    color: "white",
    backgroundColor: "black",
    type: "primary",
  };
  // const cancelButtonProperty = {
  //   name: "Cancel",
  //   color: "black",
  //   backgroundColor: "white",
  //   type: "default",
  // };
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
                  {/* <form method="post" className="formRegisterUser">
                    <div className="group-form">
                      <div className="input-group">
                        <span className="input-group-text">
                          <UserOutlined />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>
                    <div className="group-form">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i>
                            <MailOutlined />
                          </i>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="group-form">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i>
                            <LockOutlined />
                          </i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="group-form">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i>
                            <LockOutlined />
                          </i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Retype Password"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="checkbox">
                          <input type="checkbox" id="checkbox_id" />
                          <label for="basic_checkbox">
                            I agree to the
                            <a href="#" className="text-warning">
                              <b>Terms</b>
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="button">
                        <button className="btn2"> Sign Up</button>
                      </div>
                      <div className="alreadySignIn">
                        <p>
                          Already have an account?{" "}
                          <a href="" className="danger-text">
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </div>
                  </form> */}
                  <GeneralForm
                    formElements={formElements}
                    onSuccesHandler={handleSignUp}
                    submitButton={submitButtonProperty}
                    // cancelButton={cancelButtonProperty}
                    // formType="signin"
                    // forgorPasswordHandler={() => {
                    //   alert('hi');
                    // }}
                  />
                  <div className="alreadySignIn">
                    <p>
                      Already have an account?{" "}
                      <a href="" className="danger-text">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* <div>
                <p className="social-heading">-Register With-</p>
                <div className="social-media">
                  <p className="social-container">
                    <a
                      href="https://www.youtube.com/c/jamesqquick"
                      className="youtube social"
                    >
                      <FontAwesomeIcon icon={faYoutube} size="3x" color="red" />
                    </a>

                    <a
                      href="http://www.instagram.com/larnbuildteach"
                      className="instagram social"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="3x"
                        color="black"
                      />
                    </a>
                    <a
                      href="https://wwww.twitter.com"
                      className="twitter social"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="3x" />
                    </a>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
