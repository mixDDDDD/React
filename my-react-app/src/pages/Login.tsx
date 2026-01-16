import { Navigate } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import { useUser } from '../context/UserContext';

export default function Login() {
  const { user } = useUser();

  if (user?.name) {
    return <Navigate to="/" replace />;
  }

  return <LoginPage />;
}