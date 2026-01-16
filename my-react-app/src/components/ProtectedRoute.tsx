import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute() {
  const { user } = useUser();
  const isAuth = Boolean(user);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
