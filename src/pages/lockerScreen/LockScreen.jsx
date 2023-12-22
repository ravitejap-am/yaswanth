import React from "react";
import Styles from "./lockScreen.module.css";
import { Avatar } from "antd";
import { LockOutlined } from "@ant-design/icons";

const LockScreen = () => {
  return (
    <div>
      <div className="main">
        <div className="container">
          {" "}
          <div className="row">
            <div className="col">
              <div className="row mainContent">
                <div className="box-round">
                  <div className={Styles.avatar}>
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      size="extra-large"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <h3> JHON DOE</h3>
                  </div>
                  <div className="form-content">
                    <form method="post" className="formSign">
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
                        <div className="button">
                          <button className="btn-3"> Sign In</button>
                        </div>
                        <div className="alreadySignIn">
                          <p>-or-</p>
                          <p>Enter your password to retrieve your session</p>
                          <p>
                            Or{" "}
                            <b className="text-warning">
                              <a>Sign In</a>
                            </b>
                            <span> as Different User</span>
                          </p>
                        </div>
                      </div>
                    </form>
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

export default LockScreen;
