// Rout.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPageError from './pages/errorHandler/LoginPageError';
import Home from './pages/home/Home';
import RegisterUser from './pages/registerUser/RegisterUser';
import SignIn from './pages/signIn/SignIN';
import RecoveryPasswor from './pages/recoveryPassword/RecoveryPasswor';
import PageNotFound from './pages/errorHandler/PageNotFind/PageNotFound';
import Page505 from './pages/errorHandler/InternalServerError/Page505';
import MaintainencePage from './pages/errorHandler/UnderMaintainence/MaintainencePage';
import AMChatAdminHome from './pages/AMChatAdmin/AMChatAdminHome';
import OrganizationSidebar from './pages/AMChatAdmin/OrganizationList/OrganizationSidebar';
import OrganizationAdminListSidebar from './pages/AMChatAdmin/OrganizationAdminList/OrganizationAdminListSidebar';
import AddOrganizationAdminSidebar from './pages/AMChatAdmin/AddOrganizationAdmin/AddOrganizationAdminSidebar';
import OrgAdminSidebar from './pages/chatmain/organizationadmin/OrgAdminSidebar.jsx';
import OrgUserListSidebar from './pages/chatmain/orguserlist/OrgUserListSidebar.jsx';
import OrgDocumentListSidebar from './pages/chatmain/orgdocumentlist/OrgDocumentListSidebar.jsx';
import OrgAddDocumentSidebar from './pages/chatmain/orgadddocument/OrgAddDocumentSidebar.jsx';
import OrgAdminChatSidebar from './pages/chatmain/OrgadminChatPage/OrgAdminChatSidebar.jsx';
import EnterpriseRegister from './pages/registerUser/EnterpriseRegister.jsx';
import EditAddOrganizationAdminSidebar from './pages/AMChatAdmin/EditOrganizationAdmin/EditAddOrganizationAdminSidebar.jsx';
import PrivacyPolicy from './pages/Policy/PrivacyPolicy.jsx';
import Error405 from '../src/pages/errorHandler/error405/Error405.jsx';
import Error404 from './pages/errorHandler/error404/Error404.jsx';
import OrgUpdateDocumentSidebar from './pages/chatmain/orgadddocument/orgUpdateDocument/OrgUpdateDocumentSidebar.jsx';
import OrgEditDocumentSidebar from './pages/chatmain/orgadddocument/orgEditDocument/OrgEditDocumentSidebar.jsx';
import EditOrgUserSidebar from './pages/chatmain/organizationadmin/editorguser/EditOrgUserSidebar.jsx';
import TermAndCondition from './pages/Terms&Conditions/TermAndCondition.jsx';
import AMChatMainUserSidebar from './pages/chatmain/userChat/AMChatMainUserSidebar.jsx';
import SearchUIAIChatSidebar from './pages/AMChatAdmin/SearchUIAMChat/SearchUIAIChatSidebar.jsx';
import UserProfile from './pages/chatmain/UserProfile.jsx';
import ResetPassword from './pages/setPassword/ResetPassword.jsx';
import UserProfileSidebar from './pages/chatmain/userProfileSidebar.jsx';
import AMChatHeader from './pages/AMChatAdmin/AMChatHeader/AMChatHeader.jsx';
import OrganizationAdminProfileInfoSidebar from './pages/chatmain/organizationadmin/OrganizationAdminProfileInfo/OrganizationAdminProfileInfoSidebar.jsx';
import OrganizationAdminHeader from './pages/chatmain/organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader.jsx';
import SuperAdminPersonalInfoSideBar from './pages/AMChatAdmin/SuperAdminPersonalInfo/SuperAdminPersonalInfoSideBar.jsx';
import SuperAdminHeader from './pages/AMChatAdmin/SuperAdminHeader/SuperAdminHeader.jsx';
// import OrganizationAdminSearchUIAIChat from "./pages/chatmain/organizationadmin/OrganizationAdminSearchUIAIChat.jsx";
import OrganizationAdminSidebarSearchUIAIChat from './pages/chatmain/organizationadmin/OrganizationAdminSidebarSearchUIAIChat.jsx';
import ProtectedRoute from './ProtectedRoute';

import VerificationLink from './pages/linkverification/linkVerification.js';
import CustomerSupportPage from './pages/errorHandler/InternalServerError/CustomerSupportPage.jsx';

const Rout = () => {
  const userRole = localStorage.getItem('userRole');
  console.log('userRole--->', userRole);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/registerUser" element={<RegisterUser />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/user/verify/:id" element={<SignIn />} />
      <Route exact path="/recoverypassword" element={<RecoveryPasswor />} />
      <Route exact path="/api/v1/iam/user/verify" element={<ResetPassword />} />
      <Route exact path="/resetPassword/:id" element={<ResetPassword />} />
      <Route exact path="/pagenotfound" element={<PageNotFound />} />
      <Route exact path="/internal500" element={<Page505 />} />
      <Route exact path="/undermaintenence" element={<MaintainencePage />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute
            element={<AMChatMainUserSidebar />}
            allowedRoles={['USER']}
          />
        }
      ></Route>
      <Route
        path="/chat"
        element={
          <ProtectedRoute
            element={<SearchUIAIChatSidebar />}
            allowedRoles={['SUPER_ADMIN', 'USER']}
          />
        }
      ></Route>
      <Route
        path="/chatOrgAdmin"
        element={
          <ProtectedRoute
            element={<OrganizationAdminSidebarSearchUIAIChat />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>

      <Route exact path="/customerSupport" element={<CustomerSupportPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<AMChatAdminHome />}
            allowedRoles={['SUPER_ADMIN']}
          />
        }
      ></Route>

      <Route exact path="/AMChatHeader" element={<AMChatHeader />} />
      <Route
        path="/organisations"
        element={
          <ProtectedRoute
            element={<OrganizationSidebar />}
            allowedRoles={['SUPER_ADMIN']}
          />
        }
      ></Route>
      <Route
        exact
        path="/dashboardadmin/organizationadminlist"
        element={<OrganizationAdminListSidebar />}
      />

      <Route
        path="/organisation"
        element={
          <ProtectedRoute
            element={<AddOrganizationAdminSidebar />}
            allowedRoles={['SUPER_ADMIN']}
          />
        }
      ></Route>
      <Route
        exact
        path="/EditAddOrganizationAdmin"
        element={<EditAddOrganizationAdminSidebar />}
      />

      <Route
        exact
        path="/verificationLink/verify/:id"
        element={<VerificationLink />}
      />

      <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route
        path="/adduser"
        element={
          <ProtectedRoute
            element={<OrgAdminSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/orgdocumentList"
        element={
          <ProtectedRoute
            element={<OrgUserListSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/orguserlist"
        element={
          <ProtectedRoute
            element={<OrgDocumentListSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/orgadddocument"
        element={
          <ProtectedRoute
            element={<OrgAddDocumentSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/orgadminchat"
        element={
          <ProtectedRoute
            element={<OrgAdminChatSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>

      <Route
        exact
        path="/enterpriseregister"
        element={<EnterpriseRegister />}
      />
      <Route exact path="/error405" element={<Error405 />} />
      <Route exact path="/error404" element={<Error404 />} />
      <Route
        path="/updatedocument/:documentId"
        element={
          <ProtectedRoute
            element={<OrgUpdateDocumentSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/editdocument/:documentId"
        element={
          <ProtectedRoute
            element={<OrgEditDocumentSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/edituser/:userId"
        element={
          <ProtectedRoute
            element={<EditOrgUserSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/Info"
        element={
          <ProtectedRoute
            element={<UserProfileSidebar />}
            allowedRoles={['USER']}
          />
        }
      ></Route>
      <Route exact path="/termsandconditions" element={<TermAndCondition />} />
      {/* Fallback route for any other URL */}
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="/organizationPersonalInfo"
        element={
          <ProtectedRoute
            element={<OrganizationAdminProfileInfoSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        exact
        path="/OrganizationAdminHeader"
        element={<OrganizationAdminHeader />}
      />
      <Route path="/SuperAdminHeader" element={<SuperAdminHeader />} />
      <Route
        path="/info"
        element={
          <ProtectedRoute
            element={<SuperAdminPersonalInfoSideBar />}
            allowedRoles={['SUPER_ADMIN']}
          />
        }
      ></Route>
    </Routes>
  );
};

export default Rout;
