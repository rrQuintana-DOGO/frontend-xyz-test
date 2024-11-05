import { Navigate, Outlet } from "react-router";

const UserRoutes = ({isAuthenticated, isAdmin}: {isAuthenticated: boolean, isAdmin: boolean}) => {
  if (!isAuthenticated || isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default UserRoutes;