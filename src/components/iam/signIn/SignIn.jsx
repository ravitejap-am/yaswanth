import React from 'react';
import { Layout } from 'antd';
import SignIntitle from '../../common/titles/SignInWelcomeTitle.jsx';
import './signin.css';
import SubTitle from '../../common/titles/SubTitle.jsx';
import Sso from '../../common/buttons/Sso.jsx';
import * as myConst from '../../../constants/loginPage.js';
// console.log(myConstClass.ENGLISH);
const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
console.log(data);
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
      <SignIntitle title={data.WELCOME} />
      <SubTitle name={data.SIGNIN_OR_SIGNUP_TO_CONTINUE} />
      <Sso
        buttonHandler={googleButtonHandler}
        name={data.CONTINUE_WITH_GOOGLE}
        type="google"
      />
      <Sso
        buttonHandler={appleButtonHandler}
        name={data.CONTINUE_WITH_APPLE}
        type="apple"
      />
      <Sso
        buttonHandler={signInButtonHandler}
        name={data.CONTINUE_WITH_EMAIL}
        type="mail"
      />
      <Sso
        buttonHandler={signUpButtonHandler}
        name={data.CONTINUE_WITH_REGISTER}
        type="form"
      />
    </Content>
  );
};

export default SignIn;
