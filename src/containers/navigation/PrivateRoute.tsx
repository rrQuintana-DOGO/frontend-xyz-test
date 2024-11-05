// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, isAdmin }: { isAuthenticated: boolean; isAdmin?: boolean;}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAdmin && !isAdmin) {
    return <Navigate to="/xyz" />;
  }
};

export default ProtectedRoute;
