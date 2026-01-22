import { Outlet, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/userSlice';
import styles from './Layout.module.css';

type NavData = { isActive: boolean };

const Layout = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(
    (state) => state.user.name
  );
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length
  );

  const navClassName = ({ isActive }: NavData) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavLink to="/" className={navClassName}>
          Главная
        </NavLink>

        <NavLink to="/favorites" className={navClassName}>
          Избранное ({favoritesCount})
        </NavLink>

        {userName ? (
          <>
            <span>{userName}</span>
            <button onClick={() => dispatch(logout())}>
              Выйти
            </button>
          </>
        ) : (
          <NavLink to="/login">Войти</NavLink>
        )}
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
