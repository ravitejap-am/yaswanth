import React from "react";
import { Form, Checkbox, InputNumber, Switch, DatePicker, Select } from "antd";
import Document from "../upload/file/Document";
import Button from "../buttons/GeneralButton";
import Input from "../input/Input";
import Dropdown from ".././dropDown/dropDown";
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
    grid,
  } = props;

  const [form] = Form.useForm();

  return (
    <Form
      style={{ padding: "18px" }}
      form={form}
      onFinish={submitHandler}
      onFinishFailed={cancelHandler}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      layout="horizontal"
    >
      {grid ? (
        <div style={grid}>
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
                  placeholder={item.labelName ? null : item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),
              tel: (
                <Input
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
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
                  placeholder={item.labelName ? null : item.label}
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
                          form.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                      />
                    )}
                    {item.type === "select" && (
                      <div>
                        {item.labelName ? (
                          <div style={{ marginBottom: "2px", color: "#fff" }}>
                            <label>{item.labelName ? item.label : null}</label>
                          </div>
                        ) : null}

                        {/* <Select
                      onChange={(value) => {
                        form.setFieldsValue({ [item.name]: value });
                      }}
                      options={item?.options != undefined ? item?.options : []}
                      style={item.style}
                    /> */}
                        <Dropdown
                          labelName={item.labelName ? item.label : null}
                          options={
                            item?.options != undefined ? item?.options : []
                          }
                          onSelect={(value) => {
                            form.setFieldsValue({ [item.name]: value });
                          }}
                          style={item.style}
                          placeholder={item.labelName ? null : item.label}
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
        </div>
      ) : (
        <div>
          {" "}
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
                  placeholder={item.labelName ? null : item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),
              tel: (
                <Input
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
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
                  placeholder={item.labelName ? null : item.label}
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
                          form.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                      />
                    )}
                    {item.type === "select" && (
                      <div>
                        <div style={{ marginBottom: "2px", color: "#fff" }}>
                          <label>{item.label}</label>
                        </div>
                        {/* <Select
                      onChange={(value) => {
                        form.setFieldsValue({ [item.name]: value });
                      }}
                      options={item?.options != undefined ? item?.options : []}
                      style={item.style}
                    /> */}
                        <Dropdown
                          labelName={item.labelName ? item.label : null}
                          options={
                            item?.options != undefined ? item?.options : []
                          }
                          onSelect={(value) => {
                            form.setFieldsValue({ [item.name]: value });
                          }}
                          style={{ ...item.style, marginLeft: "10px" }}
                          // style={item.style}
                          placeholder={item.labelName ? null : item.label}
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
        </div>
      )}
      
      <Form.Item noStyle wrapperCol={{ offset: 6, span: 18 }}>
        <div
          className="center"
          style={{
            gap: "2em",
            marginTop: "1em",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {isSubmit && (
            <Button
              backgroundColor={submitButtonProperty.backgroundColor}
              name={submitButtonProperty.name}
              color={submitButtonProperty.color}
              buttonHandler={submitHandler}
              marginLeft={submitButtonProperty.marginLeft}
              marginTop={submitButtonProperty.marginTop}
              width={submitButtonProperty.width}
              height={submitButtonProperty.height}
              boxShadow={submitButtonProperty.boxShadow}
              borderRadius={submitButtonProperty.borderRadius}
              fontSize={submitButtonProperty.fontSize}
            />
          )}
          {isCancel && (
            <Button
              buttonProps={cancelButtonProperty}
              name={cancelButtonProperty.name}
              color={cancelButtonProperty.color}
              border={cancelButtonProperty.border}
              backgroundColor={cancelButtonProperty.backgroundColor}
              // backgroundColor={cancelButtonProperty.background}
              buttonHandler={submitHandler}
              width={cancelButtonProperty.width}
              height={cancelButtonProperty.height}
              boxShadow={cancelButtonProperty.boxShadow}
              borderRadius={cancelButtonProperty.borderRadius}
              fontSize={cancelButtonProperty.fontSize}
            // buttonHandler={cancelHandler}
            />
          )}
        </div>
      </Form.Item>
      {formType === "signin" && (
        <>
          <Link
            to={"/recoverypassword"}
            style={{
              display: "flex",
              justifyContent: "center",
              color: "Black",
            }}
          >
            <p>
              <span>{/* <LockFilled /> */}</span>
              Forgot your password
            </p>
          </Link>
        </>
      )}
    </Form>
  );
};

export default GeneralForm;
