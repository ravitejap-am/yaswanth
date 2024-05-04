// Rout.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import RegisterUser from "./pages/registerUser/RegisterUser";
import SignIn from "./pages/signIn/SignIN";
import RecoveryPasswor from "./pages/recoveryPassword/RecoveryPasswor";
import PageNotFound from "./pages/errorHandler/PageNotFind/PageNotFound";
import Page505 from "./pages/errorHandler/InternalServerError/Page505";
import MaintainencePage from "./pages/errorHandler/UnderMaintainence/MaintainencePage";

import Error405 from "../src/pages/errorHandler/error405/Error405.jsx";
import Error404 from "./pages/errorHandler/error404/Error404.jsx";
import ResetPassword from "./pages/setPassword/ResetPassword.jsx";
import ProtectedRoute from "./ProtectedRoute";

import VerificationLink from "./pages/linkverification/linkVerification.js";
import CustomerSupportPage from "./pages/errorHandler/InternalServerError/CustomerSupportPage.jsx";
import { setUser, selectUser } from "./store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { tokenDecodeJWT } from "./utils/authUtils.js";

/*  
new flow import statements start

 */

import Dashboard from "./pages/org-admin/dashboard/Dashboard.jsx";
import Users from "./pages/org-admin/users/index.jsx";
import Documents from "./pages/org-admin/documents/index.jsx";
import Chats from "./pages/chats/index.jsx";
import SupeAdminDashboard from "./pages/super-admin/dasboard/index.jsx";
import Organisations from "./pages/super-admin/organisations/index.jsx";
import Organisation from "./pages/super-admin/organisations/organisation/index.jsx";
import ProfileInfo from "./pages/Profile/index.jsx";
import AddOrgDocuments from "./components/AddOrgadminDocs/index.jsx";
import UpdateOrgAdminDoc from "./components/UpdateOrgAdminDoc/index.jsx";
import EditUsers from "./pages/org-admin/users/edit-users/EditUsers.jsx";
import AddUsers from "./pages/org-admin/users/add-users/AddUsers.jsx";
import TermsAndConditions from "./components/TermsAndConditions/index.jsx";
import PrivacyPolicies from "./components/PrivacyPolicy/index.jsx";
import ViewOrganisationDropdown from "./pages/super-admin/organisations/organisationDropdown/ViewOrganisationDropdown.jsx";
// import PrivacyPolicies from "./components/PrivacyPolicy/index.jsx";
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

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute element={<Home />} allowedRoles={[""]} path="/" />
        }
      />
      <Route
        exact
        path="/registerUser"
        element={
          <ProtectedRoute
            element={<RegisterUser />}
            allowedRoles={[""]}
            path="/registerUser"
          />
        }
      />
      <Route
        exact
        path="/signin"
        element={
          <ProtectedRoute
            element={<SignIn />}
            allowedRoles={[""]}
            path="/signin"
          />
        }
      />
      <Route
        exact
        path="/user/verify/:id"
        element={
          <ProtectedRoute
            element={<SignIn />}
            allowedRoles={[""]}
            path="/signin"
          />
        }
      />
      <Route
        exact
        path="/recoverypassword"
        element={
          <ProtectedRoute
            element={<RecoveryPasswor />}
            allowedRoles={[""]}
            path="/recoverypassword"
          />
        }
      />
      <Route
        exact
        path="/api/v1/iam/user/verify"
        element={
          <ProtectedRoute
            element={<ResetPassword />}
            allowedRoles={[""]}
            path="/api/v1/iam/user/verify"
          />
        }
      />
      <Route
        exact
        path="/resetPassword/:id"
        element={
          <ProtectedRoute
            element={<ResetPassword />}
            allowedRoles={[""]}
            path="/resetPassword/:id"
          />
        }
      />
      <Route exact path="/pagenotfound" element={<PageNotFound />} />
      <Route exact path="/internal500" element={<Page505 />} />
      <Route exact path="/undermaintenence" element={<MaintainencePage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute
            element={
              decodedToken?.role == "SUPER_ADMIN" ||
              decodedToken?.role == "ORG_ADMIN" ? (
                <Chats />
              ) : (
                <PageNotFound />
              )
            }
            allowedRoles={["SUPER_ADMIN", "USER", "ORG_ADMIN"]}
          />
        }
      ></Route>

      <Route exact path="/customerSupport" element={<CustomerSupportPage />} />
      <Route
        path="/user"
        element={<ProtectedRoute element={<Chats />} allowedRoles={["USER"]} />}
      ></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<Dashboard />}
            allowedRoles={["SUPER_ADMIN", "ORG_ADMIN"]}
          />
        }
      ></Route>

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
            allowedRoles={["ORG_ADMIN"]}
          />
        }
      ></Route>
      <Route exact path="/error405" element={<Error405 />} />
      <Route exact path="/error404" element={<Error404 />} />
      <Route
        path="/document/:documentId"
        element={
          <ProtectedRoute
            element={<UpdateOrgAdminDoc />}
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
      <Route
        exact
        path="/termsandconditions"
        element={<TermsAndConditions />}
      />
      {/* Fallback route for any other URL */}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/orgSelection" element={<ViewOrganisationDropdown />} />
    </Routes>
  );
};

export default Rout;
