import React, { useState } from 'react';
import SignInWelcomeTitle from '../titles/SignInWelcomeTitle';
import FormTitles from '../titles/FormTitles';
import Submit from '../buttons/Submit';
import './authform.css';
const AuthForm = ({
  formType,
  onSuccesHandler,
  forgotPasswordHandler = () => {},
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = /\S+@\S+\.\S+/;
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType == 'forgotpassword' && !isEmailValid) {
      alert('please enter valid email');
      return;
    }

    if ((formType === 'signup' || formType === 'signin') && !isEmailValid) {
      alert('Please enter valid email and password.');
      return;
    }
    // if (
    //   ((formType === 'signup' || formType === 'signin') && !isEmailValid) ||
    //   !isPasswordValid
    // ) {
    //   alert('Please enter valid email and password.');
    //   return;
    // }

    if (formType === 'signup' && password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Add your logic for handling form submission based on formType (signin, signup, forgot password)
    console.log(`Form submitted for ${formType}`, {
      email,
      password,
      confirmPassword,
    });
    onSuccesHandler({ email, password, confirmPassword });
    // Add additional logic as needed
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="common-form-container">
      <SignInWelcomeTitle
        title={
          formType === 'signin'
            ? 'Sign In'
            : formType === 'signup'
            ? 'Sign Up'
            : 'Forgot Password'
        }
      />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="titleContainer">
          <FormTitles title="Email" />
          :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={
              isEmailValid ? 'inputContainer' : 'invalid-input inputContainer'
            }
          />
        </div>

        <br />
        {formType !== 'forgotpassword' && (
          <div className="titleContainer">
            <FormTitles title="Password" />
            :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={
                isPasswordValid
                  ? 'inputContainer'
                  : 'invalid-input inputContainer'
              }
            />
          </div>
        )}

        <br />
        {formType === 'signin' && (
          <div style={{ textAlign: 'end' }}>
            <a onClick={forgotPasswordHandler}>Forgor Password</a>
          </div>
        )}

        <br />
        {formType === 'signup' && (
          <>
            <div className="titleContainer">
              <FormTitles title=" Confirm Password" />
              :
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={
                  password === confirmPassword
                    ? 'inputContainer'
                    : 'invalid-input inputContainer'
                }
              />
            </div>
            <br />
          </>
        )}
        <Submit type="submit" title="Submit" onclickHandler={handleSubmit} />
      </form>
      {/* {formType === 'signin' && (
        <div className="forgot-password-link">
          <button onClick={() => console.log('Forgot Password clicked')}>
            Forgot Password?
          </button>
        </div>
      )} */}
    </div>
  );
};

export default AuthForm;
