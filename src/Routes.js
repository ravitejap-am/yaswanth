// Rout.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPageError from "./pages/errorHandler/LoginPageError";
import Home from "./pages/home/Home";
import RegisterUser from "./pages/registerUser/RegisterUser";
import SignIn from "./pages/signIn/SignIN";
import RecoveryPasswor from "./pages/recoveryPassword/RecoveryPasswor";
import PageNotFound from "./pages/errorHandler/PageNotFind/PageNotFound";
import Page505 from "./pages/errorHandler/InternalServerError/Page505";
import MaintainencePage from "./pages/errorHandler/UnderMaintainence/MaintainencePage";
import AMChatAdminHome from "./pages/AMChatAdmin/AMChatAdminHome";
import OrganizationSidebar from "./pages/AMChatAdmin/OrganizationList/OrganizationSidebar";
import OrganizationAdminListSidebar from "./pages/AMChatAdmin/OrganizationAdminList/OrganizationAdminListSidebar";
import AddOrganizationAdminSidebar from "./pages/AMChatAdmin/AddOrganizationAdmin/AddOrganizationAdminSidebar";
import OrgAdminSidebar from "./pages/chatmain/organizationadmin/OrgAdminSidebar.jsx";
import OrgUserListSidebar from "./pages/chatmain/orguserlist/OrgUserListSidebar.jsx";
import OrgDocumentListSidebar from "./pages/chatmain/orgdocumentlist/OrgDocumentListSidebar.jsx";
import OrgAddDocumentSidebar from "./pages/chatmain/orgadddocument/OrgAddDocumentSidebar.jsx";
import OrgAdminChatSidebar from "./pages/chatmain/OrgadminChatPage/OrgAdminChatSidebar.jsx";
import EnterpriseRegister from "./pages/registerUser/EnterpriseRegister.jsx";
import EditAddOrganizationAdminSidebar from "./pages/AMChatAdmin/EditOrganizationAdmin/EditAddOrganizationAdminSidebar.jsx";
import PrivacyPolicy from "./pages/Policy/PrivacyPolicy.jsx";
import Error405 from "../src/pages/errorHandler/error405/Error405.jsx";
import Error404 from "./pages/errorHandler/error404/Error404.jsx";
import OrgUpdateDocumentSidebar from "./pages/chatmain/orgadddocument/orgUpdateDocument/OrgUpdateDocumentSidebar.jsx";
import OrgEditDocumentSidebar from "./pages/chatmain/orgadddocument/orgEditDocument/OrgEditDocumentSidebar.jsx";
import EditOrgUserSidebar from "./pages/chatmain/organizationadmin/editorguser/EditOrgUserSidebar.jsx";
import TermAndCondition from "./pages/Terms&Conditions/TermAndCondition.jsx";
import AMChatMainUserSidebar from "./pages/chatmain/userChat/AMChatMainUserSidebar.jsx";
import SearchUIAIChatSidebar from "./pages/AMChatAdmin/SearchUIAMChat.jsx/SearchUIAIChatSidebar.jsx";
import UserProfile from "./pages/chatmain/UserProfile.jsx";
import ResetPassword from "./pages/setPassword/ResetPassword.jsx";
import UserProfileSidebar from "./pages/chatmain/userProfileSidebar.jsx";
import AMChatHeader from "./pages/AMChatAdmin/AMChatHeader/AMChatHeader.jsx";
import OrganizationAdminProfileInfoSidebar from "./pages/chatmain/organizationadmin/OrganizationAdminProfileInfo/OrganizationAdminProfileInfoSidebar.jsx";
import OrganizationAdminHeader from "./pages/chatmain/organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader.jsx";
import SuperAdminPersonalInfoSideBar from "./pages/AMChatAdmin/SuperAdminPersonalInfo/SuperAdminPersonalInfoSideBar.jsx";
import SuperAdminHeader from "./pages/AMChatAdmin/SuperAdminHeader/SuperAdminHeader.jsx";

const Rout = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/registerUser" element={<RegisterUser />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/user/verify/:id" element={<SignIn />} />
      <Route exact path="/recoverypassword" element={<RecoveryPasswor />} />
      <Route
        exact
        path="/user/verification/reset/:id"
        element={<ResetPassword />}
      />
      <Route exact path="/pagenotfound" element={<PageNotFound />} />
      <Route exact path="/internal500" element={<Page505 />} />
      <Route exact path="/undermaintenence" element={<MaintainencePage />} />
      <Route exact path="/userchat" element={<AMChatMainUserSidebar />} />
      <Route exact path="/chat" element={<SearchUIAIChatSidebar />} />
      <Route exact path="/dashboardadmin" element={<AMChatAdminHome />} />
      <Route exact path="/AMChatHeader" element={<AMChatHeader />} />
      <Route
        exact
        path="/dashboardadmin/organizationlist"
        element={<OrganizationSidebar />}
      />
      <Route
        exact
        path="/dashboardadmin/organizationadminlist"
        element={<OrganizationAdminListSidebar />}
      />
      <Route
        exact
        path="/dashboardadmin/addorganizationadmin"
        element={<AddOrganizationAdminSidebar />}
      />
      <Route
        exact
        path="/EditAddOrganizationAdmin"
        element={<EditAddOrganizationAdminSidebar />}
      />
      <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route exact path="/adduser" element={<OrgAdminSidebar />} />
      <Route exact path="/orgdocumentList" element={<OrgUserListSidebar />} />
      <Route exact path="/orguserlist" element={<OrgDocumentListSidebar />} />
      <Route exact path="/orgadddocument" element={<OrgAddDocumentSidebar />} />
      <Route exact path="/orgadminchat" element={<OrgAdminChatSidebar />} />
      <Route
        exact
        path="/enterpriseregister"
        element={<EnterpriseRegister />}
      />
      <Route exact path="/error405" element={<Error405 />} />
      <Route exact path="/error404" element={<Error404 />} />
      <Route
        exact
        path="/updatedocument/:documentId"
        element={<OrgUpdateDocumentSidebar />}
      />
      <Route
        exact
        path="/editdocument/:documentId"
        element={<OrgEditDocumentSidebar />}
      />
      <Route exact path="/edituser/:userId" element={<EditOrgUserSidebar />} />
      <Route exact path="/UserProfile" element={<UserProfileSidebar />} />
      <Route exact path="/termsandconditions" element={<TermAndCondition />} />
      {/* Fallback route for any other URL */}
      <Route path="*" element={<PageNotFound />} />
      <Route
        exact
        path="/organizationPersonalInfo"
        element={<OrganizationAdminProfileInfoSidebar />}
      />
      <Route
        exact
        path="/OrganizationAdminHeader"
        element={<OrganizationAdminHeader />}
      />
      <Route path="/SuperAdminHeader" element={<SuperAdminHeader />} />
      <Route
        path="/SuperAdminPersonalInfo"
        element={<SuperAdminPersonalInfoSideBar />}
      />
    </Routes>
  );
};

export default Rout;
