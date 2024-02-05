import React, { useEffect, createRef, useState } from "react";
import img1 from "../../../asset/contact.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import { Form, Input, Select } from "antd";
import axios from "axios";
import * as constants from "../../../constants/Constant";
import "./ContactUp.css";

const { Option } = Select;

const ContactUp = () => {
  const [form] = Form.useForm();
  const formRef = createRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filesystem, setFileSysytem] = useState([]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  const formElements = [
    {
      name: "name",
      label: "Name",
      type: "text",
      style: {
        width: "495px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        color: "#FFF",
      },
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      style: {
        width: "495px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        color: "#FFF",
      },
      labelName: true,
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      name: "plan",
      label: "Select Plan",
      type: "select",
      style: {
        width: "521px",
        height: "50px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        paddingLeft: "10px",
        color: "#FFF",
        margin: "0px 5px 20px 1px",
      },
      labelName: true,
      options: [
        { value: "basic", label: "Freemium" },
        { value: "premium", label: "Standard" },
        { value: "pro", label: "Enterprise" },
      ],
      rules: [{ required: true, message: "Please select a plan" }],
    },
    {
      name: "comment",
      label: "Comments",
      type: "description",
      style: {
        width: "525px",
        height: "50px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        marginBottom: "13px",
        paddingLeft: "10px",
        color: "#FFF",
      },
      labelName: "Comments",
      rules: [{ required: true, message: "Please enter your comment" }],
    },
  ];

  const submitHandler = async (values) => {
    console.log("Submit handler called with values:", values);
    const url = `${constants.BASE_API_URL}${constants.CONTACT_US_ENDPOINT}`;
    alert("submit handler is called ");
    try {
      const response = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 200) {
        console.log("Form submitted successfully!");
        if (response.data.code === "CONT-CT-004") {
          alert(response.data.message);
        } else if (response.data.code === "CONT-CIE-001") {
          setIsSubmitted(true);
        } else if (response.data.code === "CONT-CISE-003") {
          alert("Failed to save contact information");
        }
      }
      console.log("value", values);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const resetForm = () => {
    formRef.current.resetFields();
    setIsSubmitted(false);
  };
  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };

  const submitButtonProperty = {
    name: "Submit",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "525px",
    height: "50px",
    borderRadius: "28px",
    boxShadow: "none",
  };

  const feedingVariable = {
    isCancel: false,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    formType: "normal",
    formElements: formElements,
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    // forgotPasswordHandler: () => {
    //   console.log("forgot Password....");
    // },
  };

  return (
    <div className="Contact-us-page-main-div">
      <br />
      <br />
      <br />
      <div className="Contact-us-page-child-div">
        <div className="Contact-usi-left-side-img">
          <img
            src={img1}
            alt="contact-image"
            className="contact-us-image-style"
          />
        </div>
        <div className="Contact-us-page-ant-form">
          <div>
            <p className="Contact-us-form-title">Contact Us</p>
            {isSubmitted ? (
              <p className="Contact-us-form-sub-title">
                Thank you for reaching out to us. We appreciate your time and
                will respond to you as soon as possible.
              </p>
            ) : (
              <p className="Contact-us-form-sub-title">
                To get in touch with AM Chat team, simply fill out the contact
                form below
              </p>
            )}
          </div>

          {!isSubmitted && (
            <div className="Contact-Us-General-Form-Style">
              <GeneralForm {...feedingVariable} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUp;
