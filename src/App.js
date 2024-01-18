import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPageError from "./pages/errorHandler/LoginPageError";
// import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import RegisterUser from "./pages/registerUser/RegisterUser";
import SignIn from "./pages/signIn/SignIN";
import RecoveryPasswor from "./pages/recoveryPassword/RecoveryPasswor";
// import LockScreen from "./pages/lockerScreen/LockScreen";
import PageNotFound from "./pages/errorHandler/PageNotFind/PageNotFound";
import Page505 from "./pages/errorHandler/InternalServerError/Page505";
import MaintainencePage from "./pages/errorHandler/UnderMaintainence/MaintainencePage";
// import ChatHome from "./pages/chat/ChatHome/ChatHome";
// import ChatHome from "./pages/chat/ChatHome/ChatHome";
import ResetPassword from "./pages/setPassword/ResetPassword";
import AmchatMainUser from "./pages/chatmain/userChat/AMChatMainUser";
import UserProfile from "./pages/chatmain/UserProfile";
import PersonalInformation from "./pages/chatmain/PersonalInformation";
  
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
        path="/signin"
        element={<SignIn />}
        errorElement={<LoginPageError />}
      />
      <Route
      path="/git"
      element={<AmchatMainUser/>}
     />

      <Route
        path="/ResetPassword"
        element={<ResetPassword />}/>

        <Route
        path="/UserProfile"
        element={<UserProfile/>}/>

        <Route
        path="/PersonalInformation"
        element={<PersonalInformation/>}/>
    </Routes>
    



  );
}

export default App;
