import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import SignInWelcomeTitle from '../../common/titles/SignInWelcomeTitle';
import FormTitles from '../../common/titles/FormTitles.jsx';
import SubTitle from '../../common/titles/SubTitle.jsx';
import './forgotPassword.css';
import Message from '../../common/toastMessages/NotifyMessage.jsx';
import AuthForm from '../../common/forms/AuthForm.jsx';
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
        <AuthForm formType="forgotpassword" onSuccesHandler={onFinish} />
      </Content>
    </>
  );
};
export default ForgotPassword;
