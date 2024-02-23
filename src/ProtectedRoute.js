import { Routes, Route, Navigate} from 'react-router-dom'; 
import SignIn from './pages/signIn/SignIN';

const ProtectedRoute = ({ element: Component, roles, userRole, ...rest }) => {
    if (!roles.includes(userRole)) {
      // If user role is not allowed, redirect to unauthorized page
      return <Navigate to="/signin" />;
    }
  
    return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;