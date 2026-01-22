import { Navigate, useLocation } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import { useAppSelector } from '../store/hooks';

export default function Login() {
  const userName = useAppSelector(
    (state) => state.user.name
  );

  const location = useLocation();

  const from =
    (location.state as { from?: Location })?.from
      ?.pathname || '/';

  if (userName) {
    return <Navigate to={from} replace />;
  }

  return <LoginPage />;
}
