import React from "react";
import Style from "./signin.module.css";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { LockFilled } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import GeneralButton from "../../components/common/buttons/GeneralButton";
import GeneralForm from "../../components/common/forms/GeneralForm";

const SignIn = () => {
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
      label: "User Name",
      type: "text",
      name: "name",
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
    {
      label: "Remember me",
      type: "checkbox",
      name: "checkbox",
      rules: [
        { required: true, message: "Please check" },
        // { validator: validatePassword },
      ],
    },
  ];
  const submitButtonProperty = {
    name: "Sign In",
    color: "white",
    backgroundColor: "black",
    type: "primary",
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
                  {/* <form method="post" className="formSign">
                    <div className="group-form">
                      <div className="input-group">
                        <span className="input-group-text">
                          <UserOutlined />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Name"
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

                    <div className="row">
                      <div className="col">
                        <div className="checkbox">
                          <input type="checkbox" id="checkbox_id" />
                          <label for="basic_checkbox" className="label">
                            Remember me
                            <span
                              className="forgetPassword"
                              style={{ marginLeft: "20px" }}
                            >
                              <i>
                                <LockFilled />
                              </i>
                              <a href="#" className="text-warning">
                                <b>Forget Password</b>
                              </a>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className={Style.btn}>
                        {/* <button className="btn3"> Sign In</button> */}
                  {/* 
                        <GeneralButton
                          name={"Sign In"}
                          type={"submit"}
                          backgroundColor={"#f64e60"}
                          color={"#fff"}
                        />
                      </div>
                      <div className="alreadySignIn">
                        <p>
                          Do have an account ?{" "}
                          <a href="" className="danger-text">
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>  */}
                  <GeneralForm
                    formElements={formElements}
                    onSuccesHandler={handleSignUp}
                    submitButton={submitButtonProperty}
                    // cancelButton={cancelButtonProperty}
                    formType="signin"
                    // forgorPasswordHandler={() => {
                    //   alert('hi');
                    // }}
                  />
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
