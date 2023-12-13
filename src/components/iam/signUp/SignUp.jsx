import React from 'react';
import { Layout, Form, Input, Button } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import SignInWelcomeTitle from '../../common/titles/SignInWelcomeTitle';
import FormTitles from '../../common/titles/FormTitles.jsx';
import SubTitle from '../../common/titles/SubTitle.jsx';
import './signup.css';
const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
const SignUp = ({ screenHandler }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    } else {
      return Promise.resolve();
    }
  };
  const validateConfirmPassword = (_, value, { getFieldValue }) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('Passwords do not match');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Content className="coloumCenter" style={{ gap: '1em' }}>
      <SignInWelcomeTitle title={data.SIGNUP} />
      <SubTitle name={data.SIGNUP_TO_CONTINUE} />
      <Form
        name="registration_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 11 }} // Adjust the label column width
        wrapperCol={{ span: 20 }} // Adjust the wrapper column width
        initialValues={{ remember: true }}
        style={{ textAlign: 'left' }}
      >
        <Form.Item
          label={<FormTitles title={data.EMAIL} />}
          name="email"
          rules={[
            { required: true, message: data.PLEASE_INPUT_YOUR_EMAIL },
            { type: 'email', message: data.INVALID_EMAIL_FORMAT },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<FormTitles title={data.PASSWORD} />}
          name="password"
          rules={[
            { required: true, message: data.PLEASE_INPUT_YOUR_PASSWORD },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={<FormTitles title={data.CONFIRM_PASSWORD} />}
          name="confirmPassword"
          rules={[
            { required: true, message: data.PLEASE_CONFIRM_YOUR_PASSWORD },
            { validator: validateConfirmPassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Sso buttonHandler={onFinish} name={data.REGISTER} type="None" /> */}
        <div className="center" style={{ marginTop: '2em', gap: '2em' }}>
          <Button type="primary" htmlType="submit" style={{ minWidth: '5em' }}>
            {data.REGISTER}
          </Button>
          <Button
            type="default"
            style={{ minWidth: '5em' }}
            onClick={() => {
              screenHandler('singnIn');
            }}
          >
            {data.SSO}
          </Button>
        </div>
        {/* <Form.Item wrapperCol={{ offset: 2, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item> */}
      </Form>
    </Content>
  );
};
export default SignUp;
