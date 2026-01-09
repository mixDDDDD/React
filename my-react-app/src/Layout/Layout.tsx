import { FunctionComponent } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';

type LayoutProps = {
  userName?: string;
  onLogout?: () => void;
  onLoginClick?: () => void;
};

type NavData = {
  isActive: boolean;
  isPending?: boolean;
};

const Layout: FunctionComponent<LayoutProps> = ({ 
  userName, 
  onLogout, 
  onLoginClick 
}) => {
  const isLoggedIn = Boolean(userName);

  const navClassName = ({ isActive }: NavData) =>
  `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <NavLink to="/" className={navClassName}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className={navClassName}>
                  Favorites
                </NavLink>
              </li>
              {!isLoggedIn ? (
                <li>
                  <NavLink to="/login" className={navClassName}>
                    Login
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>

        <div className={styles['header__right']}>
          {isLoggedIn ? (
            <>
              <span className={styles['header__user-name']}>{userName}</span>
              <button
                type="button"
                className={styles['header__profile-button']}
                onClick={onLogout}
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles['header__profile-button']}
              onClick={onLoginClick}
            >
              Войти
            </button>
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