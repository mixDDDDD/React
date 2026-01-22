import { Navigate, useLocation } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import { useUser } from '../context/UserContext';

export default function Login() {
  const { user } = useUser();
  const location = useLocation();

  const from =
    (location.state as { from?: Location })?.from
      ?.pathname || '/';

  if (user?.name) {
    return <Navigate to={from} replace />;
  }

  return <LoginPage />;
}
