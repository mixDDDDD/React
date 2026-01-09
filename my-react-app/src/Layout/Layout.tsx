import { Outlet, NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from './Layout.module.css';

type NavData = { isActive: boolean };

const Layout = () => {
  const { user, logout } = useUser();
  const isLoggedIn = Boolean(user?.name);

  const navClassName = ({ isActive }: NavData) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles['header__right']}>
          {isLoggedIn ? (
            <>
              <span className={styles['header__user-name']}>{user?.name}</span>
              <button onClick={logout} className={styles['header__profile-button']}>
                Выйти
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navClassName}>
              <button className={styles['header__profile-button']}>
                Войти
              </button>
            </NavLink>
          )}
        </div>
      </header>
      <main className={styles['layout__content']}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;