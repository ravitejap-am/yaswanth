import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import SignInWelcomeTitle from '../../common/titles/SignInWelcomeTitle';
import FormTitles from '../../common/titles/FormTitles.jsx';
import SubTitle from '../../common/titles/SubTitle.jsx';
import './forgotPassword.css';
import Message from '../../common/toastMessages/NotifyMessage.jsx';
const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
const ForgotPassword = ({ screenHandler }) => {
  const [isMessage, setIsmessage] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values:', values);
    setIsmessage(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const messageHandler = () => {
    setIsmessage(false);
  };
  return (
    <>
      {isMessage && (
        <Message
          messageHandler={messageHandler}
          type="info"
          message="Link has been sent succesfully,Please check your mail"
          position="bottom-center"
        />
      )}
      <Content className="coloumCenter" style={{ gap: '1em' }}>
        <SignInWelcomeTitle title={data.FORGOT_PASSWORD} />
        <SubTitle name={data.PLEASE_ENETER_MAIL_TO_CONTINUE} />
        <Form
          name="registration_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }} // Adjust the label column width
          wrapperCol={{ span: 25 }} // Adjust the wrapper column width
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

          {/* <Sso buttonHandler={onFinish} name={data.REGISTER} type="None" /> */}
          <div className="center" style={{ marginTop: '2em', gap: '2em' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ minWidth: '5em' }}
            >
              {data.SUBMIT}
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
    </>
  );
};
export default ForgotPassword;
