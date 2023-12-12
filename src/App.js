import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import LoginPageError from './pages/errorHandler/LoginPageError';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Routes><Route path="/" element={<Home />} errorElement={<LoginPageError />} /></Routes></div>
  );
}

export default App;
