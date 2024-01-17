import React from "react";
import { Form, Checkbox, InputNumber, Switch, DatePicker, Select } from "antd";
import Document from "../upload/file/Document";
import Button from "../buttons/GeneralButton";
import Input from "../input/Input";
import { LockFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
        const elements = {
          email: (
            <Input
              labelName={item.labelName ? item.label : null}
              type={item.type}
              placeholder={item.labelName ? null : item.label}
              iconClass={item.iconClass}
              onChange={(e) => {
                form.setFieldValue({ [item.name]: e.target.value });
              }}
              style={item.style}
              // required={item.required}
            />
          ),
          text: (
            <Input
              labelName={item.labelName ? item.label : null}
              type={item.type}
              placeholder={item.label}
              iconClass={item.iconClass}
              onChange={(e) => {
                form.setFieldValue({ [item.name]: e.target.value });
              }}
              style={item.style}
            />
          ),
          password: (
            <Input
              labelName={item.labelName ? item.label : null}
              type={item.type}
              placeholder={item.label}
              iconClass={item.iconClass}
              onChange={(e) => {
                form.setFieldValue({ [item.name]: e.target.value });
              }}
            />
          ),
          confirmPassword: (
            <Input
              labelName={item.labelName ? item.label : null}
              type={item.type}
              placeholder={item.label}
              iconClass={item.iconClass}
              onChange={(e) => {
                form.setFieldValue({ [item.name]: e.target.value });
              }}
              style={item.style}
            />
          ),

          comment: (
            <Input
              labelName={item.labelName ? item.label : null}
              type={item.type}
              placeholder={item.label}
              iconClass={item.iconClass}
              onChange={(e) => {
                form.setFieldValue({ [item.name]: e.target.value });
              }}
              style={item.style}
            />
          ),
          number: (
            <InputNumber
              labelName={item.labelName ? item.label : null}
              type={item.type}
              placeholder={item.label}
              iconClass={item.iconClass}
            />
          ),
          switch: <Switch />,
          date: <DatePicker />,
          description: <TextArea rows={4} />,
        };
        return (
          <Form.Item
            name={item.name}
            rules={item?.rules != undefined ? item.rules : []}
            messageVariables={cancelHandler}
            style={item.style}
            noStyle
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
                  <div>
                    <div style={{ marginBottom: "8px", color: "#fff" }}>
                      <label>{item.label}</label>
                    </div>
                    <Select
                      onChange={(value) => {
                        form.setFieldsValue({ [item.name]: value });
                      }}
                      options={item?.options != undefined ? item?.options : []}
                      style={item.style}
                      labelName={item.labelName ? item.label : null}
                    />
                  </div>
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
          <Link
            to={"/recoverypassword"}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <p>
              <span>
                <LockFilled />
              </span>
              Forgot password
            </p>
          </Link>
        </>
      )}
      <Form.Item noStyle wrapperCol={{ offset: 6, span: 18 }}>
        <div className="center" style={{ gap: "2em", marginTop: "1em" }}>
          {isSubmit && (
            <Button
              buttonProps={submitButtonProperty}
              name={submitButtonProperty.name}
              color={submitButtonProperty.color}
              backgroundColor={submitButtonProperty.backgroundColor}
              buttonHandler={submitHandler}
              width={submitButtonProperty.width}
              height={submitButtonProperty.height}
              boxShadow={submitButtonProperty.boxShadow}
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
