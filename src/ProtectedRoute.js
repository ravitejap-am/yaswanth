import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/signIn/SignIN';

const ProtectedRoute = ({ element, allowedRoles }) => {
  // const allowedRoles = ['SUPER_ADMIN' , 'USER', 'ORG_ADMIN']
  // const userId = localStorage.getItem("userId");
  const userId = localStorage.getItem('userRole');
  console.log('userId--->', userId, 'allowedRole-->', allowedRoles);

  const currentUserRole = userId || 'unknown';
  const isRoleAllowed = allowedRoles.includes(currentUserRole);
  console.log('isRoleAllowed--->', isRoleAllowed);
  if (isRoleAllowed) {
    return element;
  } else {
    const redirectPath = '/signin';
    return <Navigate to={redirectPath} />;
  }
};

export default ProtectedRoute;
