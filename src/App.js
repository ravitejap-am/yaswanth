import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPageError from "./pages/errorHandler/LoginPageError";
// import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import RegisterUser from "./pages/registerUser/RegisterUser";
import SignUp from '../src/components/iam/signUp/SignUp';
import SignIn from "./pages/signIn/SignIN";
import RecoveryPasswor from "./pages/recoveryPassword/RecoveryPasswor";
// import LockScreen from "./pages/lockerScreen/LockScreen";
import PageNotFound from "./pages/errorHandler/PageNotFind/PageNotFound";
import Page505 from "./pages/errorHandler/InternalServerError/Page505";
import MaintainencePage from "./pages/errorHandler/UnderMaintainence/MaintainencePage";
import ChatHome from "./pages/chat/ChatHome/ChatHome";
import { Chat } from "./pages/chat/Chat";

function App() {
  const [screen, setScreen] = useState("beforeLogin");
  const [isSidebarClicked, setSidebarClicked] = useState(false);

  const handleSidebarClick = () => {
    setSidebarClicked(!isSidebarClicked);
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} errorElement={<LoginPageError />} />
      <Route
        path="/registerUser"
        element={<RegisterUser />}
        errorElement={<LoginPageError />}
      />

      {/* <Route
        path="/signin"
        element={< />}
        errorElement={<LoginPageError />}
      /> */}
      <Route
        path="/recoverypassword"
        element={<RecoveryPasswor />}
        errorElement={<LoginPageError />}
      />

      <Route
        path="/pagenotfound"
        element={<PageNotFound />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/internal500"
        element={<Page505 />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/undermaintenence"
        element={<MaintainencePage />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/chat"
        element={<Chat />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/signin"
        element={<SignIn />}
        errorElement={<LoginPageError />}
      />
    </Routes>
  );
}

export default App;
