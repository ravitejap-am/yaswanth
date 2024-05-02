import { Navigate } from 'react-router-dom';
import SignIn from './pages/signIn/SignIN';
import { useSelector } from 'react-redux';
import {  selectUser } from './store/authSlice.js';
import { tokenDecodeJWT } from './utils/authUtils.js';

const ProtectedRoute = ({ element, allowedRoles, path }) => {

  const userId = localStorage.getItem('userRole');
  const currentUserRole = userId || 'unknown';
  const isRoleAllowed = allowedRoles.includes(currentUserRole);

  const user = useSelector(selectUser);
  let decodedToken = {};
  let timeFromToken = null 
  if (!!user) {
    const jwtToken = user?.userToken;
    decodedToken = tokenDecodeJWT(jwtToken);
    timeFromToken = decodedToken?.exp
  }

  
  const isExpired = timeFromToken * 1000 < Date.now();

  if (isRoleAllowed && !isExpired) {
    return element;
  } else {
    if(path){
      return element ;
    }
    const redirectPath = '/signin';
    return <Navigate to={redirectPath} />;
  }
};

export default ProtectedRoute;
