import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignIn from './pages/signIn/SignIN';

const ProtectedRoute = ({ element, allowedRoles, path }) => {
  // const allowedRoles = ['SUPER_ADMIN' , 'USER', 'ORG_ADMIN']
  // const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const userId = localStorage.getItem('userRole');
  console.log('userId--->', userId, 'allowedRole-->', allowedRoles);

  const currentUserRole = userId || 'unknown';
  const isRoleAllowed = allowedRoles.includes(currentUserRole);
  console.log('isRoleAllowed--->', isRoleAllowed);
  if (isRoleAllowed) {
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
