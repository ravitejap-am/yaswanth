import React from 'react';
import { Form, Input, Button } from 'antd';

const GeneralForm = ({
  formElements = [],
  onSuccesHandler = () => {},
  submitButton = { name: 'Submit', color: 'white', backgroundColor: '#4096f' },
  cancelButton = { name: 'Cancel', color: 'black', backgroundColor: 'white' },
  onCancelHandler = () => {},
}) => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      // name="registration_form"
      onFinish={onSuccesHandler}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      layout="horizontal"
    >
      {formElements.map((item, index) => {
        return (
          <Form.Item label={item.label} name={item.type} rules={item.rules}>
            {item.type === 'email' && <Input />}
            {(item.type === 'password' || item.type === 'confirmPassword') && (
              <Input.Password />
            )}
          </Form.Item>
        );
      })}

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <div className="center" style={{ gap: '2em', marginTop: '2em' }}>
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
