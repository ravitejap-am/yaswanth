import React, { useState } from 'react';
import { Form } from 'antd';  // Add this import
import GeneralForm from "../../components/common/forms/GeneralForm";
import axios from 'axios';
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage';
import { toast } from 'react-toastify';
import Footer  from "../../pages/home/Footer/Footer";
import SignHeader from '../home/SignHeader/SignHeader';


const ResetPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();  // Import Form from Ant Design

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
        { validator: (_, value) => validateConfirmPassword(_, value, form.getFieldValue('password')) },
      ],
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
    name: 'Sign Up',
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
    cancelHandler: () => {
      console.log("Canceling....");
    },
    isSubmit: true,
    submitHandler: async (values) => {
      console.log("Resetting password....");
      console.log(values);

      try {
        const response = await axios.post("localhost8080/reset-password", {
          email: values.email,  
          password: values.password,
        });

        if (response.data.success) {
          toast.success("Your password has been reset successfully.");
          setErrorMessage(""); 
        } else {
          toast.error("Password reset failed. Please try again.");
          setSuccessMessage(""); 
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("An error occurred. Please try again.");
        setSuccessMessage(""); 
      }
    },
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: "normal",
  };

  return (
    <>
    <div className='resetpassword-header'>
    <SignHeader
            title='AM-Chat'
            linkText="Don't have an account?"
            linkTo='/registeruser'
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
                  <h2>Reset Password</h2>
                  <p>Please use your organization email id.</p>
                </div>

                <div className="form-content">
                  <GeneralForm form={form} {...feedingVariable} />
                  {successMessage && (
                    <div className="success-message">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="error-message">
                      {errorMessage}
                    </div>
                  )}
                  <NotifyMessage/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default ResetPassword;
