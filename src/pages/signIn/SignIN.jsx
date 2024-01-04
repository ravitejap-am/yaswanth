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
                    // formElements={formElements}
                    // onSuccesHandler={handleSignUp}
                    // submitButton={submitButtonProperty}
                    // cancelButton={cancelButtonProperty}
                    // formType="signin"
                    // forgorPasswordHandler={() => {
                    //   alert('hi');
                    // }}
                    {...feedingVariable}
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
