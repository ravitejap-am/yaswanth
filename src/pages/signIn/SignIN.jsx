import React from "react";
import "./signin.module.css";
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

const SignIn = () => {
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
                  <p>Sign in to continue to Chat-Bot.</p>
                </div>
                <div className="form-content">
                  <form method="post" className="formSign">
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
                            <span className="forgetPassword">
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
                      <div className="button">
                        <button className="btn3"> Sign In</button>
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
                  </form>
                </div>
              </div>
              <div>
                <p className="social-heading">-Sign With-</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
