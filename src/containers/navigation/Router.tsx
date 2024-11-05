import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../logic/redux/store';
import LoginPage from '../../pages/login/LoginPage';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import { adminRoutes, userRoutes } from '../../config/routes';

const Router = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isAdmin = user?.username === 'admin'; // TODO: Cambiar por el rol del usuario si es necesario
  const isAuthenticated = Boolean(user);

  const defaultRoute = isAdmin ? '/admin' : '/xyz';

  const DefaultComponent = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    return isAuthenticated ? <Navigate to={defaultRoute} /> : <LoginPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<DefaultComponent isAuthenticated={isAuthenticated} />} />

        {/* Rutas admon */}
        <Route path="/admin" element={<AdminRoutes isAdmin={isAdmin} />}>
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.route} element={<route.component />} />
          ))}
        </Route>

        {/* Rutas usuario */}
        <Route path="/xyz" element={<UserRoutes isAuthenticated={isAuthenticated} isAdmin={isAdmin} />}>
          {userRoutes.map((route, index) => (
            <Route key={index} path={route.route} element={<route.component />} />
          ))}
        </Route>

        {/* Rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
        {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
