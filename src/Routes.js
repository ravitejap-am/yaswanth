// Rout.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import AMChatMainUserSidebar from "./pages/chatmain/userChat/AMChatMainUserSidebar.jsx";
import SearchUIAIChatSidebar from "./pages/AMChatAdmin/SearchUIAMChat/SearchUIAIChatSidebar.jsx";
import UserProfile from "./pages/chatmain/UserProfile.jsx";
import ResetPassword from "./pages/setPassword/ResetPassword.jsx";
import UserProfileSidebar from "./pages/chatmain/userProfileSidebar.jsx";
import AMChatHeader from "./pages/AMChatAdmin/AMChatHeader/AMChatHeader.jsx";
import OrganizationAdminProfileInfoSidebar from "./pages/chatmain/organizationadmin/OrganizationAdminProfileInfo/OrganizationAdminProfileInfoSidebar.jsx";
import OrganizationAdminHeader from "./pages/chatmain/organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader.jsx";
import SuperAdminPersonalInfoSideBar from "./pages/AMChatAdmin/SuperAdminPersonalInfo/SuperAdminPersonalInfoSideBar.jsx";
import SuperAdminHeader from "./pages/AMChatAdmin/SuperAdminHeader/SuperAdminHeader.jsx";
// import OrganizationAdminSearchUIAIChat from "./pages/chatmain/organizationadmin/OrganizationAdminSearchUIAIChat.jsx";
import OrganizationAdminSidebarSearchUIAIChat from "./pages/chatmain/organizationadmin/OrganizationAdminSidebarSearchUIAIChat.jsx";
import ProtectedRoute from "./ProtectedRoute";

import VerificationLink from "./pages/linkverification/linkVerification.js";
import CustomerSupportPage from "./pages/errorHandler/InternalServerError/CustomerSupportPage.jsx";
import { setUser, selectUser } from "./store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { tokenDecodeJWT } from "./utils/authUtils.js";

/*  
new flow import statements start

 */

import Dashboard from './pages/org-admin/dashboard/Dashboard.jsx';
import Users from './pages/org-admin/users/index.jsx';
import Documents from './pages/org-admin/documents/index.jsx';
import Chats from './pages/chats/index.jsx';
import SupeAdminDashboard from './pages/super-admin/dasboard/index.jsx';
import Organisations from './pages/super-admin/organisations/index.jsx';
import Organisation from "./pages/super-admin/organisations/organisation/index.jsx"
import ProfileInfo from './pages/Profile/index.jsx';
import AddOrgDocuments from './components/AddOrgadminDocs/index.jsx';
import UpdateOrgAdminDoc from './components/UpdateOrgAdminDoc/index.jsx';
import EditUsers from "./pages/org-admin/users/edit-users/EditUsers.jsx";
import AddUsers from "./pages/org-admin/users/add-users/AddUsers.jsx";
import TermsAndConditions from "./components/TermsAndConditions/index.jsx";
import PrivacyPolicies from "./components/PrivacyPolicy/index.jsx";
/*  
new flow import statements stop

 */

const Rout = () => {
  const userRole = localStorage.getItem("userRole");
  const user = useSelector(selectUser);
  let decodedToken = {};
  if (!!user) {
    const jwtToken = user?.userToken;
    decodedToken = tokenDecodeJWT(jwtToken);
  }

  console.log("userRole--->", userRole);

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
            element={
              decodedToken?.role == "USER" ? (
                <>
                  <Chats />
                </>
              ) : decodedToken?.role == "ORG_ADMIN" ? (
                <>
                  <OrgAdminSidebar />
                </>
              ) : (
                <PageNotFound />
              )
            }
            allowedRoles={["USER", "ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route
        path="/chat"
        element={
          <ProtectedRoute
            element={
              decodedToken?.role == "SUPER_ADMIN" ||
              decodedToken?.role == "USER" ? (
                <SearchUIAIChatSidebar />
              ) : decodedToken?.role == "ORG_ADMIN" ? (
                <Chats />
              ) : (
                <PageNotFound />
              )
            }
            allowedRoles={["SUPER_ADMIN", "USER", "ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route
        path="/chatOrgAdmin"
        element={
          <ProtectedRoute
            element={<OrganizationAdminSidebarSearchUIAIChat />}
            allowedRoles={["ORG_ADMIN"]}
          />
        }
      ></Route>

      <Route exact path="/customerSupport" element={<CustomerSupportPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<Dashboard />}
            allowedRoles={["SUPER_ADMIN", "ORG_ADMIN"]}
          />

          // <ProtectedRoute
          //   element={<AMChatAdminHome />}
          //   allowedRoles={['SUPER_ADMIN']}
          // />
        }
      ></Route>

      <Route exact path="/AMChatHeader" element={<AMChatHeader />} />
      <Route
        path="/organisations"
        element={
          <ProtectedRoute
            element={<Organisations />}
            allowedRoles={["SUPER_ADMIN"]}
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
            element={<Organisation />}
            allowedRoles={["SUPER_ADMIN"]}
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

      <Route exact path="/PrivacyPolicy" element={<PrivacyPolicies />} />
      <Route
        path="/adduser"
        element={
          <ProtectedRoute element={<AddUsers />} allowedRoles={["ORG_ADMIN"]} />
        }
      ></Route>
      <Route
        path="/documents"
        element={
          <ProtectedRoute
            element={<Documents />}
            allowedRoles={["ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route
        path="/users"
        element={
          <ProtectedRoute element={<Users />} allowedRoles={["ORG_ADMIN"]} />
        }
      ></Route>
      <Route
        path="/document"
        element={
          <ProtectedRoute
            element={<AddOrgDocuments />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/orgadminchat"
        element={
          <ProtectedRoute
            element={<OrgAdminChatSidebar />}
            allowedRoles={["ORG_ADMIN"]}
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
        path="/document/:documentId"
        element={
          <ProtectedRoute
            element={<UpdateOrgAdminDoc />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route>
      <Route
        path="/document/:documentId"
        element={
          <ProtectedRoute
            element={<OrgEditDocumentSidebar />}
            allowedRoles={["ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route
        path="/user/:userId"
        element={
          <ProtectedRoute
            element={<EditUsers />}
            allowedRoles={["ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route
        path="/Info"
        element={
          <ProtectedRoute
            element={<ProfileInfo />}
            allowedRoles={["USER", "SUPER_ADMIN", "ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route exact path="/termsandconditions" element={<TermsAndConditions />} />
      {/* Fallback route for any other URL */}
      <Route path="*" element={<PageNotFound />} />
      {/* <Route
        path="/Info"
        element={
          <ProtectedRoute
            element={<OrganizationAdminProfileInfoSidebar />}
            allowedRoles={['ORG_ADMIN']}
          />
        }
      ></Route> */}
      <Route
        exact
        path="/OrganizationAdminHeader"
        element={<OrganizationAdminHeader />}
      />
      <Route path="/SuperAdminHeader" element={<SuperAdminHeader />} />
      {/* <Route
        path="/info"
        element={
          <ProtectedRoute
            element={<SuperAdminPersonalInfoSideBar />}
            allowedRoles={['SUPER_ADMIN']}
          />
        }
      ></Route> */}
    </Routes>
  );
};

export default Rout;
