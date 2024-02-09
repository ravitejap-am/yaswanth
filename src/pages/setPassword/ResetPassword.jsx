import React, { useEffect, useState } from "react";
import { Form } from "antd";
import GeneralForm from "../../components/common/forms/GeneralForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";

const ResetPassword = () => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const jwtToken = false;

  useEffect(() => {
    console.log("JWT Token from Redux Store:", jwtToken);
    if (jwtToken) {
      console.log("JWT token is stored in the Redux store.");
    } else {
      console.log("JWT token is not stored in the Redux store.");
    }
  }, [jwtToken]);

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };

  const validateConfirmPassword = (_, value, password) => {
    if (value !== password) {
      return Promise.reject("Passwords do not match");
    } else {
      return Promise.resolve();
    }
  };

  const submitHandler = async () => {
    try {
      const values = await form.validateFields();

      const url = `http://54.161.113.196:8080/user/verification/forget/${id}`;
      const data = {
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      };

      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 && response.data.success) {
        toast.success("Your password has been reset successfully.");
        setErrorMessage("");
      } else if (response.status === 404) {
        toast.error("User not found. Please try again.");
        setSuccessMessage("");
      } else if (response.data.code === "FORGETPASSCHANGE-IVT-002") {
        toast.error(response.data.message);
      } else {
        toast.error("Password reset failed. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  const formElements = [
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
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      rules: [
        { required: true, message: "Please confirm your password!" },
        {
          validator: (_, value) =>
            validateConfirmPassword(_, value, form.getFieldValue("password")),
        },
      ],
    },
  ];

  const submitButtonProperty = {
    name: "Submit",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "467px",
    height: "50px",
    borderRadius: "35px",
    marginTop: ".7em",
    fontSize: "0.9rem",
  };

  const buttonProps = {
    name: "Sign Up",
    type: "primary",
    color: "white",
    backgroundColor: "#6366F1",
    width: "120px",
    padding: "10px 16px",
    height: "40px",
    borderRadius: "30px",
    icons: "",
  };

  const feedingVariable = {
    isCancel: false,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: "normal",
  };

  return (
    <>
      <div className="resetpassword-header">
        <SignHeader
          title="AM-Chat"
          linkText="Don't have an account?"
          linkTo="/registeruser"
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
                    <h2>Set Password</h2>
                  </div>

                  <div className="form-content">
                    <GeneralForm form={form} {...feedingVariable} />
                    {successMessage && (
                      <div className="success-message">{successMessage}</div>
                    )}
                    {errorMessage && (
                      <div className="error-message">{errorMessage}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotifyMessage message={successMessage || errorMessage} />
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
