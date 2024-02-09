import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigationType,
  Outlet,
} from "react-router-dom";
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
// import TermsAndConditions from "./pages/Terms&Conditions/Terms&Conditions.jsx";
import UserProfileSidebar from "./pages/chatmain/userProfileSidebar.jsx";

const Rout = () => {
  const ScrollToTop = () => {
    const location = useLocation();
    const navigationType = useNavigationType();
    useEffect(() => {
      if (navigationType === "PUSH") {
        window.scrollTo(0, 0);
      }
    }, [location, navigationType]);
    return <Outlet />;
  };
  return (
    <Routes>
      <Route element={<ScrollToTop />}>
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
          path="/user/verification/reset/:id"
          element={<ResetPassword />}
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
        <Route path="/userchat" element={<AMChatMainUserSidebar />} />
        <Route path="/chat" element={<SearchUIAIChatSidebar />} />
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
        <Route
          path="/EditAddOrganizationAdmin"
          element={<EditAddOrganizationAdminSidebar />}
        />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/adduser" element={<OrgAdminSidebar />} />
        <Route path="/orgdocumentList" element={<OrgUserListSidebar />} />
        <Route path="/orguserlist" element={<OrgDocumentListSidebar />} />
        <Route path="/orgadddocument" element={<OrgAddDocumentSidebar />} />
        <Route path="/orgadminchat" element={<OrgAdminChatSidebar />} />
        <Route path="/enterpriseregister" element={<EnterpriseRegister />} />
        <Route path="/error405" element={<Error405 />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/updatedocument" element={<OrgUpdateDocumentSidebar />} />
        <Route path="/editdocument" element={<OrgEditDocumentSidebar />} />
        <Route path="/edituser" element={<EditOrgUserSidebar />} />
        <Route path="termsandconditions" element={<TermAndCondition />} />

        <Route path="/adduser" element={<OrgAdminSidebar />} />
        <Route path="/orgdocumentList" element={<OrgUserListSidebar />} />
        <Route path="/orguserlist" element={<OrgDocumentListSidebar />} />
        <Route path="/orgadddocument" element={<OrgAddDocumentSidebar />} />
        <Route path="/orgadminchat" element={<OrgAdminChatSidebar />} />
        <Route path="/enterpriseregister" element={<EnterpriseRegister />} />
        <Route path="/error405" element={<Error405 />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/updatedocument" element={<OrgUpdateDocumentSidebar />} />
        <Route path="/editdocument" element={<OrgEditDocumentSidebar />} />
        <Route path="/edituser" element={<EditOrgUserSidebar />} />
        <Route path="/UserProfile" element={<UserProfileSidebar />} />
      </Route>
    </Routes>
  );
};

export default Rout;
