import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPageError from './pages/errorHandler/LoginPageError';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import RegisterUser from './pages/registerUser/RegisterUser';
// import SignIN from '.';
import SignIn from './pages/signIn/SignIN';
import RecoveryPasswor from './pages/recoveryPassword/RecoveryPasswor';
import LockScreen from './pages/lockerScreen/LockScreen';

function App() {
  const [screen, setScreen] = useState('beforeLogin');
  return (
    <Routes>
      <Route path="/" element={<Login />} errorElement={<LoginPageError />} />
      <Route path="/registerUser" element={<RegisterUser />} errorElement={<LoginPageError />} />\
      <Route path="/signin" element={<SignIn />} errorElement={<LoginPageError />} />
      <Route path="/recoverypassword" element={<RecoveryPasswor />} errorElement={<LoginPageError />} />
      <Route path="/lockscreen" element={<LockScreen />} errorElement={<LoginPageError />} />




    </Routes>
  );
}

export default App;
