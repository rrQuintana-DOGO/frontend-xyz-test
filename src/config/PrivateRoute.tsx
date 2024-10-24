import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;