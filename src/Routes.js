import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPageError from "./pages/errorHandler/LoginPageError";
import Home from "./pages/home/Home";
import RegisterUser from "./pages/registerUser/RegisterUser";
import SignIn from "./pages/signIn/SignIN";
import RecoveryPasswor from "./pages/recoveryPassword/RecoveryPasswor";
import PageNotFound from "./pages/errorHandler/PageNotFind/PageNotFound";
import Page505 from "./pages/errorHandler/InternalServerError/Page505";
import MaintainencePage from "./pages/errorHandler/UnderMaintainence/MaintainencePage";
import ResetPassword from "./pages/setPassword/ResetPassword";
import AmchatMainUser from "./pages/chatmain/userChat/AMChatMainUser";
import UserProfile from "./pages/chatmain/UserProfile";
import PersonalInformation from "./pages/chatmain/PersonalInformation";
import AMChatAdminHome from "./pages/AMChatAdmin/AMChatAdminHome";
import OrganizationList from "./pages/AMChatAdmin/OrganizationList/OrganizationList";
import OrganizationSidebar from "./pages/AMChatAdmin/OrganizationList/OrganizationSidebar";
import OrganizationAdminListSidebar from "./pages/AMChatAdmin/OrganizationAdminList/OrganizationAdminListSidebar";
import AddOrganizationAdminSidebar from "./pages/AMChatAdmin/AddOrganizationAdmin/AddOrganizationAdminSidebar";
import OrgAdminSidebar from "./pages/chatmain/organizationadmin/OrgAdminSidebar.jsx";
import OrgUserList from "./pages/chatmain/orguserlist/OrgUserList.jsx";
import SignHeader from "./pages/home/SignHeader/SignHeader.jsx";
import OrgUserListSidebar from "./pages/chatmain/orguserlist/OrgUserListSidebar.jsx";
import OrgDocumentListSidebar from "./pages/chatmain/orgdocumentlist/OrgDocumentListSidebar.jsx";
import OrgAddDocumentSidebar from "./pages/chatmain/orgadddocument/OrgAddDocumentSidebar.jsx";
import OrgAdminChatSidebar from "./pages/chatmain/OrgadminChatPage/OrgAdminChatSidebar.jsx";
import EnterpriseRegister from "./pages/registerUser/EnterpriseRegister.jsx";
import SearchUIAIChatSidebar from "./pages/AMChatAdmin/SearchUIAMChat.jsx/SearchUIAIChatSidebar.jsx";

const Rout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} errorElement={<LoginPageError />} />
      <Route
        path="/registerUser"
        element={<RegisterUser />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/signin"
        element={<SignIn />}
        errorElement={<LoginPageError />}
      />
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
      <Route path="/userchat" element={<AmchatMainUser />} />
      <Route path="/dashboardadmin" element={<AMChatAdminHome />} />
      <Route
        path="/dashboardadmin/organizationlist"
        element={<OrganizationSidebar />}
      />
      <Route
        path="/dashboardadmin/organizationadminlist"
        element={<OrganizationAdminListSidebar />}
      />
      <Route
        path="/dashboardadmin/addorganizationadmin"
        element={<AddOrganizationAdminSidebar />}
      />
      <Route path="/chat" element={<SearchUIAIChatSidebar />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/PersonalInformation" element={<PersonalInformation />} />

      <Route path="/adduser" element={<OrgAdminSidebar />} />
      <Route path="/orguserlist" element={<OrgUserListSidebar />} />
      <Route path="/orgdocumentList" element={<OrgDocumentListSidebar />} />
      <Route path="/orgadddocument" element={<OrgAddDocumentSidebar />} />
      <Route path="/orgadminchat" element={<OrgAdminChatSidebar />} />
      <Route path="/enterpriseregister" element={<EnterpriseRegister />} />
    </Routes>
  );
};

export default Rout;
