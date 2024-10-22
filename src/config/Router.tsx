import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/login/LoginPage'
import TripsPage from '../pages/trips/TripsPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={
          <h1>404 Not Found</h1>
        } />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/viajes" element={<TripsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router