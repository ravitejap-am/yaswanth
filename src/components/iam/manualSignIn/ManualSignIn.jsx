import React from 'react';
import { Layout, Form, Input, Button } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import './manuvalsignup.css';
import AuthForm from '../../common/forms/AuthForm.jsx';
const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
const ManualSignIn = ({ screenHandler }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values:', values);
  };
  const forgotPasswordHandler = () => {
    screenHandler('forgotPassword');
  };
  return (
    <Content className="coloumCenter" style={{ gap: '1em' }}>
      <AuthForm
        formType="signin"
        onSuccesHandler={onFinish}
        forgotPasswordHandler={forgotPasswordHandler}
      />
    </Content>
  );
};
export default ManualSignIn;
