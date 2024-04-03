import React, { useState, useEffect } from "react";
import "./recoverpassword.module1.css";
import GeneralForm from "../../components/common/forms/GeneralForm";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import axios from "axios";
import * as constants from "../../constants/Constant";
import { useMessageState } from "../../hooks/useapp-message";
import Footer from "../../pages/home/Footer/Footer";
import { toast } from "react-toastify";
import SignHeader from "../home/SignHeader/SignHeader";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Grid, Button } from "antd";
import { Box, Typography } from "@mui/material";
import Logo from "../../asset/images/logo.png"

const RecoveryPasswor = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false); 

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

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const submitHandler = async (values) => {
    // Check if values object and email property are defined
    if (!values || !values.email) {
      console.error("Email is missing in form values");
      return;
    }

    const url = `${constants.BASE_API_URL}${constants.MAIL_RECOVERY_PASSWORD_ENDPOINT}`;
    const data = {
      email: values.email,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage("success", response?.data?.message, messageHandler);
    } catch (error) {
      if (
        error?.response?.status === 500 ||
        error?.response?.status === "500"
      ) {
        navigate("/customerSupport");
      }

      setButtonLoading(false);
      showNotifyMessage(
        "error",
        error?.response?.data?.message,
        messageHandler
      );
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cancelHandler = (errorInfo) => {
    console.log("Canceling....");
    console.log(errorInfo);
  };

  const formElements = [
    {
      label: "Email",
      type: "email",
      name: "email",
      // iconClass: <MailOutlined />,
      labelname: 'email',
      // rules: [
      //   { required: true, message: "Please input your email" },
      //   { type: "email", message: "Invalid Email format" },
      // ],
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      emptyErrorMessage: 'Please Enter the Email',
      invalidErrorMessage: 'Please Enter the Valid Email',
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
    <>
      <div className="recoverpassword-header">
        <SignHeader
          title={<img src={Logo} alt="" width={120} />}
          linkText={!isMobile && "Don't have an account?"}
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="recover-main-css">
        <Box className="text-top-signup" mb={3} >
        <Typography variant="h2" gutterBottom >Forgot Password</Typography>
       <Typography variant="body1" mt={4}gutterBottom color={'#1e293b'}> Please use your organisation email id.</Typography>
        </Box>
         <div className="signin-form-css" >
         <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            autoComplete="off"
            // style={{ width: "auto", margin: "auto" }}
            onFinish={submitHandler}
          >
            <Form.Item
              // label="Email"
              name="email"
              place
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: 'email',
                  message: 'Invalid email format',
                },
              ]}
              required={false}
            >
              <Input className="signin_input_css"  placeholder="Email"/>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signin_submit_btn_css"
              >
            <Typography variant="button" display="block" >
             Submit
            </Typography> 
              </Button>
            </Form.Item>
          </Form>
         </div>
         {/* <br /> */}
         <br />

        <NotifyMessage />


      </div>
      <div className="forgotpass-footer">
          <Footer />
        </div>
    </>
  );
};

export default RecoveryPasswor;
