import React from "react";
import img1 from "../../../asset/contact.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import { Form, Input, Select } from "antd";
import "./ContactUp.css";

const { Option } = Select;

const ContactUp = () => {
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
        width: "520px",
        height: "38px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        marginBottom:"13px"
      },
      className: "transparent-dropdown",
      labelName: true,
      options: [
        { value: "basic", label: "Basic Plan" },
        { value: "premium", label: "Premium Plan" },
        { value: "pro", label: "Pro Plan" },
      ],
      rules: [{ required: true, message: "Please select a plan" }],
    },
    {
      name: "comment",
      label: "Comment",
      type: "text",
      style: {
        width: "495px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        // marginTop:"10px"
      },
      labelName: true,
      rules: [{ required: true, message: "Please enter your comment" }],
    },
  ];

  const submitHandler = (values) => {
    console.log("Form values:", values);
  };

  const submitButtonProperty = {
    name: "Submit",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "520px",
    height: "50px",
    borderRadius: "28px",
  };

  const feedingVariable = {
    isCancel: false,
    // cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    // cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
    formType: "normal",
    forgorPasswordHandler: () => {
      console.log("forgot Password....");
    },
  };

  return (
    <div className="Contact-us-page-main-div">
      <div className="Contact-us-page-child-div">
        <div className="Contact-usi-left-side-img">
          <img
            src={img1}
            alt="contact-image"
            style={{ width: "79%", height: "358px", marginTop: "90px" }}
          />
        </div>

        <div className="Contact-us-page-ant-form">
          <div>
            <p className="Contact-us-form-title">Contact Us</p>
            <p className="Contact-us-form-sub-title">
              To get in touch with AM Chat team, simply fill out the contact
              form below
            </p>
          </div>

          <div className="Contact-Us-General-Form-Style">
            <GeneralForm {...feedingVariable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUp;
