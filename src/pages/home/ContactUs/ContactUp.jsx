import React, { useEffect, createRef, useState } from "react";
import img1 from "../../../asset/contact.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import { Form, Input, Select, Grid, Button } from "antd";
import axios from "axios";
import * as constants from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";
import "./ContactUp.css";
import { Link, useNavigate } from "react-router-dom";
const { TextArea } = Input;

const ContactUp = () => {
  const formRef = createRef();
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  const selectOptions = [
    { value: "FREEMIUM", label: "Freemium" },
    { value: "PREMIUM", label: "Standard" },
    { value: "ENTERPRISE", label: "Enterprise" },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
    submitHandler(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    setButtonLoading(true);
    console.log("contact up", values);
    try {
      const response = await axios.post(
        `${constants.BASE_API_URL}/user/contactUs`,
        {
          name: values.name,
          emailId: values.email,
          status: true,
          plan: values.plan,
          comments: values.comment,
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage("success", response?.data?.message, messageHandler);
    } catch (error) {
      if (error?.response?.status == 500 || error?.response?.status == "500") {
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

  return (
    <div className="Contact-us-page-main-div">
      {screens.sm || screens.lg ? (
        <div className="Contact-usi-left-side-img">
          <img
            src={img1}
            alt="contact-image"
            className="contact-us-image-style"
          />
        </div>
      ) : (
        ""
      )}
      <div className="Contact-us-page-ant-form">
        <div>
          <p className="Contact-us-form-title">Contact Us</p>
          <p className="Contact-us-form-sub-title">
            To get in touch with AM Chat team, simply fill out the contact form
            below
          </p>
        </div>
        <div className="Contact-Us-General-Form-Style">
          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ width: "auto", margin: "auto" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              required={false}
            >
              <Input className="contact_input_css" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address!",
                },
              ]}
              required={false}
            >
              <Input className="contact_input_css" />
            </Form.Item>
            <Form.Item
              label="Select Plan"
              name="plan"
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please select any option!",
                },
              ]}
            >
              <Select
                className="contact_select_css"
                options={selectOptions}
                placeholder="Select an option"
              />
            </Form.Item>
            <Form.Item
              label="Comments"
              name="comments"
              rules={[
                {
                  required: true,
                  message: "Please enter your comments!",
                },
              ]}
              required={false}
            >
              <TextArea className="contact_input_css" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="contact_submit_btn_css"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUp;
