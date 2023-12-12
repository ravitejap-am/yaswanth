import React, { useState } from 'react';
import { Layout } from 'antd';
import './login.css';
import SignIn from '../../components/iam/signIn/SignIn';
import SignUp from '../../components/iam/signUp/SignUp';
import ManualSignIn from '../../components/iam/manualSignIn/ManualSignIn';
const { Content } = Layout;

const Login = () => {
  const [screen, setScreen] = useState('singnIn');
  const screenHandler = (screenName) => {
    setScreen(screenName);
  };
  return (
    <Layout className="mainLayout center">
      <Content className="loginContainer center">
        {screen == 'singnIn' && <SignIn screenHandler={screenHandler} />}
        {screen == 'signUp' && <SignUp />}
        {screen == 'manualSignIn' && <ManualSignIn />}
        {screen == 'forgotPassword' && ''}
        {screen == 'otp' && ''}
      </Content>
    </Layout>
  );
};

export default Login;
