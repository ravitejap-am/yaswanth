import React from "react";
import "./recoverpassword.module1.css";
import UserOutlined from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import GeneralButton from "../../components/common/buttons/GeneralButton";

const RecoveryPasswor = () => {
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
                  <form method="post" className="formRecoveryPass">
                    <div className="group-form">
                      <div className="input-group">
                        <span className="input-group-text">
                          <MailOutlined />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col"></div>
                      <div className="button">
                        {/* <button className="btn-3"> Reset</button> */}
                        <GeneralButton
                          name={"Reset"}
                          type={"submit"}
                          backgroundColor={"#f64e60"}
                          color={"#fff"}
                        />  
                      </div>
                      <div className="alreadySignIn"></div>
                    </div>
                  </form>
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
