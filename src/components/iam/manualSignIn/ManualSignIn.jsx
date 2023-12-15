import React from 'react';
import { Layout, Form, Input, Button } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import './manuvalsignup.css';

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
  return <Content className="coloumCenter" style={{ gap: '1em' }}></Content>;
};
export default ManualSignIn;
