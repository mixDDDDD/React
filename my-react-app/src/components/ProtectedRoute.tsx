import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute() {
  const { user } = useUser();

  if (!user?.name) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}