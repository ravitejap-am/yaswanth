import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Switch,
  DatePicker,
  Select,
  Modal,
} from 'antd';
import Document from '../upload/file/Document';
const { TextArea } = Input;
const GeneralForm = ({
  formElements = [],
  onSuccesHandler = () => {},
  submitButton = { name: 'Submit', color: 'white', backgroundColor: '#4096f' },
  cancelButton = { name: 'Cancel', color: 'black', backgroundColor: 'white' },
  onCancelHandler = () => {},
  formType = 'nomal',
  forgorPasswordHandler = () => {},
}) => {
  const [form] = Form.useForm();
  const [filesystem, setFileSysytem] = useState([]);
  console.log(filesystem);
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeCheckBox = (e) => {
    // form.setFieldsValue({ [item.name]: e.target.checked });
  };
  const onSelectChange = (value) => {
    // form.setFieldsValue({ [item.name]: value });
  };
  const elements = {
    email: <Input />,
    text: <Input />,
    password: <Input.Password />,
    confirmPassword: <Input.Password />,
    checkbox: <Checkbox onChange={onChangeCheckBox} />,
    number: <InputNumber type="number" />,
    switch: <Switch />,
    date: <DatePicker />,
    select: <Select onChange={onSelectChange} options={[]} />,
    description: <TextArea rows={4} />,
    file: <Document setFile={setFileSysytem} />,
  };
  const normFile = (filesystem) => {
    if (Array.isArray(filesystem)) {
      return filesystem;
    }
    return filesystem;
  };

  return (
    <Form
      // name="registration_form"
      form={form}
      onFinish={onSuccesHandler}
      onFinishFailed={onFinishFailed}
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
            //  {item.type === 'file' ? valuePropName="fileList"}
            valuePropName={item.type === 'file' ? item.name : null}
            getValueFromEvent={item.type === 'file' ? normFile : null}
          >
            {(item.type === 'email' || item.type === 'text') && <Input />}
            {(item.type === 'password' || item.type === 'confirmPassword') && (
              <Input.Password />
            )}
            {item.type === 'checkbox' && (
              <Checkbox
                onChange={(e) => {
                  form.setFieldsValue({ [item.name]: e.target.checked });
                }}
              />
            )}

            {item.type === 'number' && <InputNumber type="number" />}
            {item.type === 'switch' && <Switch />}
            {item.type === 'date' && <DatePicker />}
            {item.type === 'select' && (
              <Select
                onChange={(value) => {
                  form.setFieldsValue({ [item.name]: value });
                }}
                options={item?.options != undefined ? item?.options : []}
              />
            )}
            {item.type === 'description' && (
              <TextArea rows={item?.row != undefined ? item.row : 4} />
            )}
            {item.type === 'file' && <Document setFile={setFileSysytem} />}
          </Form.Item>
        );
      })}
      {formType === 'signin' && (
        <>
          <div style={{ textAlign: 'end' }}>
            <a onClick={forgorPasswordHandler}>Forgor Password</a>
          </div>
        </>
      )}
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <div className="center" style={{ gap: '2em', marginTop: '1em' }}>
          <Button
            type="primary"
            htmlType="submit"
            className="center"
            style={{
              color: submitButton.color,
              backgroundColor: submitButton.backgroundColor,
              width: submitButton.width,
              height: submitButton.height,
            }}
          >
            {submitButton.name}
          </Button>
          <Button
            type="default"
            style={{
              color: cancelButton.color,
              backgroundColor: cancelButton.backgroundColor,
              width: cancelButton.width,
              height: cancelButton.height,
            }}
            className="center"
            onClick={onCancelHandler}
          >
            {cancelButton.name}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default GeneralForm;
