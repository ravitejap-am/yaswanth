import React from 'react';
import { Layout } from 'antd';
import SignIntitle from '../../common/titles/SignInWelcomeTitle.jsx';
import './signin.css';
import SubTitle from '../../common/titles/SubTitle.jsx';
import Sso from '../../common/buttons/Sso.jsx';
const { Content } = Layout;
const SignIn = ({ screenHandler }) => {
  const googleButtonHandler = () => {};
  const appleButtonHandler = () => {};
  const signInButtonHandler = () => {
    screenHandler('manualSignIn');
  };
  const signUpButtonHandler = () => {
    screenHandler('signUp');
  };
  return (
    <Content className="mainContainer">
      <SignIntitle title="Welcome" />
      <SubTitle name="Sign in or sign up to continue" />
      <Sso
        buttonHandler={googleButtonHandler}
        name="Continue With Google"
        type="google"
      />
      <Sso
        buttonHandler={appleButtonHandler}
        name="Continue With Apple"
        type="apple"
      />
      <Sso
        buttonHandler={signInButtonHandler}
        name="Continue With Email"
        type="mail"
      />
      <Sso
        buttonHandler={signUpButtonHandler}
        name="Continue With Register"
        type="form"
      />
    </Content>
  );
};

export default SignIn;
