import { Navigate, Outlet } from "react-router";

const AdminRoutes = ({isAdmin}: {isAdmin: boolean}) => {
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoutes;