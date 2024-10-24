import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LoginPage from '../pages/login/LoginPage';
import AdminHomePage from '../pages/admin/home/AdminHomePage';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import TripsPage from '../pages/users/trips/TripsPage';

const Router = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isAdmin = user?.username === 'admin'; // TODO: Cambiar por el rol del usuario si es necesario
  const isAuthenticated = Boolean(user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isAdmin ? '/admin' : '/xyz'} />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/admin" element={<AdminRoutes isAdmin={isAdmin} />}>
          <Route path="" element={<AdminHomePage />} />
        </Route>

        <Route path="/xyz" element={<UserRoutes isAuthenticated={isAuthenticated} isAdmin={isAdmin} />}>
          <Route path="" element={<TripsPage />} />
        </Route>

        {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
