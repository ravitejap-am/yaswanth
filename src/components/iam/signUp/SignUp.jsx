import React from 'react';
import { Layout } from 'antd';
import * as myConst from '../../../constants/loginPage.js';
import './signup.css';
import AuthForm from '../../common/forms/AuthForm.jsx';
const { Content } = Layout;
let language = 'ENGLISH';
let data = myConst[language];
const SignUp = ({ screenHandler }) => {
  const handleSignUp = (formData) => {
    console.log('Signing up with:', formData);
  };
  return (
    <Content className="coloumCenter" style={{ gap: '1em' }}>
      <AuthForm formType="signup" onSuccesHandler={handleSignUp} />
    </Content>
  );
};
export default SignUp;
