import React, { useState, useEffect, useMemo } from "react";
import {
  Form,
  Input,
  Checkbox,
  InputNumber,
  Switch,
  DatePicker,
  Select,
} from "antd";

import Document from "../upload/file/Document";
import Button from "../buttons/GeneralButton";

const { TextArea } = Input;

const GeneralForm = (props) => {
  const {
    submitHandler,
    cancelHandler,
    formElements,
    submitButtonProperty,
    cancelButtonProperty,
    isSubmit,
    isCancel,
    formType,
    forgorPasswordHandler,
    validateEmail,
    setFileSysytem,
  } = props;

  const [form] = Form.useForm();

  const elements = {
    email: <Input />,
    text: <Input />,
    password: <Input.Password />,
    confirmPassword: <Input.Password />,
    number: <InputNumber type="number" />,
    switch: <Switch />,
    date: <DatePicker />,
    description: <TextArea rows={4} />,
  };
  return (
    <Form
      form={form}
      onFinish={submitHandler}
      onFinishFailed={cancelHandler}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      layout="horizontal"
    >
      {formElements.map((item, index) => {
        return (
          <Form.Item
            label={item.label}
            name={item.name}
            rules={item?.rules != undefined ? item.rules : []}
          >
            {elements[item.type] || (
              <>
                {item.type === "checkbox" && (
                  <Checkbox
                    onChange={(e) => {
                      form.setFieldsValue({ [item.name]: e.target.checked });
                    }}
                  />
                )}
                {item.type === "select" && (
                  <Select
                    onChange={(value) => {
                      form.setFieldsValue({ [item.name]: value });
                    }}
                    options={item?.options != undefined ? item?.options : []}
                  />
                )}
                {item?.type === "file" && (
                  <Document
                    setFile={setFileSysytem}
                    numberOfImage={item?.numberOfImage}
                    fileType={item?.fileType}
                    fileSize={item?.fileSize}
                    url={item?.url}
                    form={form}
                    name={item?.name}
                  />
                )}
              </>
            )}
          </Form.Item>
        );
      })}
      {formType === "signin" && (
        <>
          <div style={{ textAlign: "end" }}>
            <a onClick={forgorPasswordHandler}>Forgor Password</a>
          </div>
        </>
      )}
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <div className="center" style={{ gap: "2em", marginTop: "1em" }}>
          {isSubmit && (
            <Button
              buttonProps={submitButtonProperty}
              buttonHandler={submitHandler}
            />
          )}
          {isCancel && (
            <Button
              buttonProps={cancelButtonProperty}
              buttonHandler={cancelHandler}
            />
          )}
        </div>
      </Form.Item>
    </Form>
  );
};

export default GeneralForm;
