import React, { useState } from 'react';
import { Layout } from 'antd';
import './login.css';
import SignIn from '../../components/iam/signIn/SignIn';
import SignUp from '../../components/iam/signUp/SignUp';
import ManualSignIn from '../../components/iam/manualSignIn/ManualSignIn';
import Homeheader from '../../layouts/homeheader/HomeHeader';
import ForgotPassword from '../../components/iam/forgotPassword/ForgotPassword';
const { Content } = Layout;

const Login = () => {
  const [screen, setScreen] = useState('singnIn');
  const screenHandler = (screenName) => {
    setScreen(screenName);
  };
  let manuvalWidth = screen == 'singnIn' ? '30rem' : '25rem';
  let manuvalHeight = screen == 'singnIn' ? '25rem' : '20rem';
  return (
    <Layout className="mainLayout center">
      {/* adding header */}
      <Homeheader />
      <Content
        className="loginContainer center"
        style={{
          minWidth: manuvalWidth,
          minHeight: manuvalHeight,
          alignItems: 'flex-start',
          padding: '10px',
        }}
      >
        {screen == 'singnIn' && <SignIn screenHandler={screenHandler} />}
        {screen == 'signUp' && <SignUp screenHandler={screenHandler} />}
        {screen == 'manualSignIn' && (
          <ManualSignIn screenHandler={screenHandler} />
        )}
        {screen == 'forgotPassword' && (
          <ForgotPassword screenHandler={screenHandler} />
        )}
        {screen == 'otp' && ''}
      </Content>
      {/* add footer */}
    </Layout>
  );
};

export default Login;
