import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPageError from './pages/errorHandler/LoginPageError';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  const [screen, setScreen] = useState('beforeLogin');
  return (
    <Routes>
      <Route path="/" element={<Login />} errorElement={<LoginPageError />} />
    </Routes>
  );
}

export default App;
